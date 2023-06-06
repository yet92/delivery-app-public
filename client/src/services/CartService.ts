import { Product } from "./ProductsService";

export type ProductInCart = {
    product: Product;
    quantity: number;
};

export type Cart = {
    [id: string]: ProductInCart;
};

const CART_KEY = import.meta.env.VITE_CART_KEY as string;

export const saveCartToLocalStorage = (cart: Cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
    const cartJSON = localStorage.getItem(CART_KEY);
    if (!cartJSON) {
        return {};
    }
    return JSON.parse(cartJSON);
};
