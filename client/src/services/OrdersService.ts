import { Cart } from "./CartService";

export type CustomerInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

const CUSTOMER_INFO_KEY = import.meta.env.VITE_CUSTOMER_INFO_KEY;
const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === "PRODUCTION" ? "" : import.meta.env.VITE_SERVER_URL;

export const saveCustomerInfoToLocalStorage = (customerInfo: CustomerInfo) => {
    localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify(customerInfo));
};

export const loadCustomerInfoFromLocalStorage = () => {
    const customerInfoString = localStorage.getItem(CUSTOMER_INFO_KEY);
    if (!customerInfoString) {
        return { name: "", email: "", phone: "", address: "" };
    }
    return JSON.parse(customerInfoString);
};

export const createOrder = async (customer: CustomerInfo, cart: Cart) => {
    const res = await fetch(`${SERVER_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer, cart }),
    });

    const json = await res.json();

    return {res, json};
};
