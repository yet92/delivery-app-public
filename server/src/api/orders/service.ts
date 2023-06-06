import { Product, Shop, Status } from "@prisma/client";
import { Database } from "../../database";

const prisma = Database.get();

export type ProductInCart = {
    product: Product;
    quantity: number;
};

export type Cart = {
    [id: string]: ProductInCart;
};

export type CustomerInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

export type CreateOrderParams = {
    customer: CustomerInfo;
    cart: Cart;
};

export const create = async (params: CreateOrderParams) => {
    const { customer: customerInfo, cart } = params;

    try {
        const customer = await prisma.customer.create({
            data: {
                email: customerInfo.email,
                name: customerInfo.name,
                phoneNumber: customerInfo.phone,
                address: customerInfo.address
            },
        });

        const order = await prisma.order.create({
            data: {
                customerId: customer.id,
                status: Status.Creation,
            },
        });

        const productsInOrder = await prisma.productInOrder.createMany({
            data: Object.keys(cart).map((productId) => {
                return {
                    productId,
                    quantity: cart[productId].quantity,
                    orderId: order.id,
                };
            }),
        });

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: Status.InTransit,
            },
        });

        return { customer, order, productsInOrder };
    } catch (error) {
        console.log(error);
        return { error };
    }
};
