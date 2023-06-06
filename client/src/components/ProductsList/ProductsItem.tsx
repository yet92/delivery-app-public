import { useContext } from "react"
import { Product } from "../../services"
import CartContext from "../../contexts/CartContext"

export type Props = {
  product: Product
}

export const ProductsItem = ({ product }: Props) => {

  const { addToCart, productInCart, removeFromCart } = useContext(CartContext);
  if (!productInCart) {
    return null;
  }
  return (
    <div className="m-2 p-1 rounded-lg border-2">
      <div className="p-4">
        <img className="h-[200px]" src={product.picture} style={{ width: "100%", height: "150px", objectFit: "cover", }}></img>
      </div>
      <div className="p-4">{product.name}</div>
      <div className="flex gap-4 items-baseline justify-between p-4">
        <div>Price: {product.price}</div>
        <div className="">
          {productInCart(product)
            ? <button className="rounded-lg border-2 p-2" onClick={() => {
              if (removeFromCart) {
                removeFromCart(product);
              }
            }}>Remove from cart</button>
            : <button className="rounded-lg border-2 p-2" onClick={() => {
              if (addToCart) {
                const result = addToCart(product);
                if (result && result.error) {
                  alert(result.error);
                }
              }
            }}>Add to Cart</button>}

        </div>
      </div>
    </div>
  )

}