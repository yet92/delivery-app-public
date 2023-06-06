import { useContext } from "react"
import CartContext from "../../contexts/CartContext"
import { CartItem } from "./CartItem";

export const CartItemsList = () => {

  const { cart } = useContext(CartContext);

  return (
    <div className="w-[40%] rounded-lg border-2 m-2 p-2 h-[75vh] overflow-scroll overflow-x-hidden">
      {
        Object.keys(cart).map((productId) => {
          const productInCart = cart[productId];
          return <CartItem key={productId} {...{ productInCart }} />;
        })
      }
    </div>
  )

}