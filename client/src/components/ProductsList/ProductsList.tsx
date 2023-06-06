import { useEffect, useState } from "react"
import { Product, productsService } from "../../services"
import { ProductsItem } from "."
import { Spinner } from "../Spinner"


export type Props = {
  selectedShop?: string
}

export const ProductsList = ({ selectedShop }: Props) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedShop === undefined) return;

    setLoading(true);

    productsService.getProductsOf({ shopId: selectedShop }).then(({ products }) => {
      setProducts(products);
      setLoading(false);
    });

  }, [selectedShop]);


  return (
    <div>
      <div className="grid grid-cols-2 gap-10 rounded-lg border-2 m-2 p-4 h-[90vh] overflow-scroll overflow-x-hidden">
        {selectedShop === undefined && <div>Select a shop</div>}
        {loading && <Spinner></Spinner>}
        {
          products.map(product => {
            return (
              <ProductsItem key={product.id} {...{ product }} />
            )
          })
        }
      </div>

    </div>
  )


}