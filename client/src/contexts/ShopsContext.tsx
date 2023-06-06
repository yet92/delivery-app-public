import { FC, PropsWithChildren, createContext, useEffect, useState } from "react";
import { loadSelectedShopFromLocalStorage, saveSelectedShopToLocalStorage } from "../services/ShopsService";

export type ShopsContextData = {
  selectedShop?: string,
  setSelectedShop?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ShopsContext = createContext<ShopsContextData>({});

export const ShopsContextWrapper: FC<PropsWithChildren> = ({ children }) => {

  const [selectedShop, setSelectedShop] = useState<string | undefined>(loadSelectedShopFromLocalStorage());

  useEffect(() => {
    saveSelectedShopToLocalStorage(selectedShop);
  }, [selectedShop]);

  return (
    <ShopsContext.Provider value={{ selectedShop, setSelectedShop }}>

      {children}

    </ShopsContext.Provider>
  )

}

export default ShopsContext;