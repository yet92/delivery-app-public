import { Shop } from "@prisma/client";
import { Database } from "../../database";

const prisma = Database.get();

export type GetAllParams = {
    shop?: Shop;
    shopId?: string;
};

export const getAll = async (params?: GetAllParams) => {
    const where: { shop?: Shop | { id: string } } = {};

    if (params) {
        const { shop, shopId } = params;
        if (shop) where.shop = shop;
        if (shopId !== undefined) {
            where.shop = { id: shopId };
        }
    }

    // TODO: add paginator
    const products = await prisma.product.findMany({
        where,
    });

    return { products };
};
