
const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === "PRODUCTION" ? "" : import.meta.env.VITE_SERVER_URL;
const SELECTED_SHOP_KEY = import.meta.env.VITE_SELECTED_SHOP_KEY;

export type Shop = {
  id: string,
  name: string,
  logo: string,
  location: { address: string }
}

export type GetAllReturnData = {
  error?: number,
  res: Response,
  json?: { shops: Shop[] },
  shops?: Shop[]
}

export const getAll = async (): Promise<GetAllReturnData> => {

  const res = await fetch(`${SERVER_URL}/api/shops`);

  if (!res.ok) {
    return { error: res.status, res };
  }

  const json = await res.json();

  return { res, json, shops: json.shops };

}

export type GetOneReturnData = {
  res: Response,
  json?: { shop: Shop },
  shop?: Shop
}

export const getOne = async (id: string) => {

  const res = await fetch(`${SERVER_URL}/api/shops/${id}`);

  if (!res.ok) {
    return {res};
  }

  const json = await res.json();

  return {res, json, shop: json.shop};

}

export const saveSelectedShopToLocalStorage = (selectedShopId: string | undefined) => {
  if (selectedShopId === undefined || selectedShopId === "undefined") localStorage.removeItem(SELECTED_SHOP_KEY);
  localStorage.setItem(SELECTED_SHOP_KEY, String(selectedShopId));
}

export const loadSelectedShopFromLocalStorage = () => {
  const selectedShop = localStorage.getItem(SELECTED_SHOP_KEY);
  if (!selectedShop || selectedShop === "undefined") return undefined;
  return selectedShop;
}