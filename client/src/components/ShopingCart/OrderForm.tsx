import { MouseEventHandler, useContext, useEffect, useState } from "react"
import CartContext from "../../contexts/CartContext"
import { ordersService } from "../../services"
import { CustomerInfo, loadCustomerInfoFromLocalStorage, saveCustomerInfoToLocalStorage } from "../../services/OrdersService"
import { Check } from "../Icons/Check"
import { Spinner } from "../Spinner"
import { CartItemsList } from "./CartItemsList"
import { CustomerInfoForm } from "./CustomerInfoForm"



export const OrderForm = () => {

  const { totalPrice, cart } = useContext(CartContext);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(loadCustomerInfoFromLocalStorage());

  const [badFields, setBadFields] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    saveCustomerInfoToLocalStorage(customerInfo);
  }, [customerInfo]);

  const onSubmit: MouseEventHandler = async () => {
    // validate
    setLoading(true);

    const { json, res } = await ordersService.createOrder(customerInfo, cart);

    if (res.status === 400) {
      if (json.badField === "different shops") {
        alert("Only products from one shops can be added");
      } else if (json.badField === "empty cart") {
        alert("Add products to your cart");
      } else {
        const badFieldsSet = new Set(badFields);
        badFieldsSet.add(json.badField);
        setBadFields(Array.from(badFieldsSet));
      }
    }

    if (res.ok) {
      setSuccess(true);
    }

    setLoading(false);

  }

  return (
    <div className="flex justify-center w-[100%] flex-wrap">
      

      <CustomerInfoForm {...{ customerInfo: customerInfo, setCustomerInfo, badFields, setBadFields }} />
      <CartItemsList />
      <div className="flex w-[80%] flex-row-reverse gap-4 items-baseline">
        <div>
          {loading && <button className="top-[-6px] p-2 px-10 rounded-lg border-2 text-center w-[170px] h-[50px] relative">
            <div className="absolute top-[20%] left-[40%]">
              <Spinner />
            </div>
          </button>}
          {success && <button className="top-[-6px] p-2 px-10 rounded-lg border-2 text-center w-[170px] h-[50px] relative">
            <div className="absolute top-[20%] left-[43%]">
              <Check />
            </div>
          </button>}
          {!loading && !success && <button onClick={onSubmit} className="rounded-lg border-2 p-2 px-10 w-[170px] h-[50px]">Submit</button>}
        </div>
        <div className="p-4">
          Total price: {totalPrice}
        </div>
      </div>
    </div>
  )

}