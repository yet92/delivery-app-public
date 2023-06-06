import { useContext } from "react"
import { ShopsList } from "../components/ShopsList"
import ShopsContext from "../contexts/ShopsContext"
import { ProductsList } from "../components/ProductsList";

export const ShopsPage = () => {

  const shopsContext = useContext(ShopsContext);



  return (
    <div className="flex justify-center">
      <div className="w-[20%]">
        <ShopsList></ShopsList>
      </div>
      <div className="w-[60%]">
        <ProductsList selectedShop={shopsContext.selectedShop}></ProductsList>
      </div>
    </div>
  )

}