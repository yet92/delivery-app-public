import { ChangeEventHandler, useContext } from "react"
import { ProductInCart } from "../../services"
import CartContext from "../../contexts/CartContext"
import { Cross } from "../Icons"


export type Props = {
  productInCart: ProductInCart
}

export const CartItem = ({ productInCart }: Props) => {

  const { changeQuantity, removeFromCart } = useContext(CartContext);

  const onQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newQuantity = Number(e.target.value);
    if (changeQuantity && newQuantity >= 0) {
      changeQuantity(productInCart.product, newQuantity);
    }
  }

  const onDelete = () => {
    if (removeFromCart)
      removeFromCart(productInCart.product);
  }

  // TODO: prettify price 
  return (
    <div className="rounded-lg border-2 flex m-4 p-2 gap-4 relative">
      <div className="absolute" onClick={onDelete}>
        <Cross></Cross>
      </div>
      <div className="w-[60%] p-4">
        <img src={productInCart.product.picture} style={{ width: "100%", height: "150px", objectFit: "cover", }} />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className=" flex flex-col items-center justify-center gap-2 ">
          <div>
            {productInCart.product.name}
          </div>
          <div>
            Price: {productInCart.product.price}
          </div>
        </div>
        <div>
          <input type="number" className="rounded-lg border-2 text-center p-2" onKeyDown={() => { return false; }} onChange={onQuantityChange} value={productInCart.quantity}></input>
        </div>
      </div>
    </div >
  )

}