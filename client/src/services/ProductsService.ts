const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === "PRODUCTION" ? "" : import.meta.env.VITE_SERVER_URL;

export type Product = {
    id: string;
    price: number;
    name: string;
    shopId: string;
    picture: string;
};

export type GetProductsOfReturnData = {
    res: Response;
    json: { products: Product[] };
    products: Product[];
};

export const getProductsOf = async ({
    shopId,
}: {
    shopId: string;
}): Promise<GetProductsOfReturnData> => {
    const res = await fetch(`${SERVER_URL}/api/products/?shopId=${shopId}`);

    const json = await res.json();

    return { res, json, products: json.products };
};
