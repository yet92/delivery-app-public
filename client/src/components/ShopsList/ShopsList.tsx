import { useContext, useEffect, useState } from "react"
import { Shop, shopsService } from "../../services";
import ShopsContext from "../../contexts/ShopsContext";
import { ShopsItem } from "./ShopsItem";
import { Spinner } from "../Spinner";

export const ShopsList = () => {

  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  const { setSelectedShop, selectedShop } = useContext(ShopsContext);


  useEffect(() => {

    shopsService.getAll().then(({ res, shops }) => {
      if (!res.ok || shops === undefined) {
        console.log("something went wrong");
        return;
      }

      setShops(shops);
      setLoading(false);
    })

  }, []);

  if (!setSelectedShop) {
    return <div>Something went wrong</div>
  }


  return (
    <div className="flex flex-col items-center rounded-lg border-2 m-2 p-1 h-[90vh]">
      {loading && <Spinner></Spinner>}
      <div>Shops:</div>
      {shops.map(shop => {
        return (
          <ShopsItem key={shop.id} isSelected={shop.id === selectedShop } {...{ setSelectedShop, shop }} />
        )
      })}
    </div>
  )

}