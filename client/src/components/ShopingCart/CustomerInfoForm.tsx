import { ChangeEventHandler, useContext, useEffect } from "react";
import { CustomerInfo as CustomerInfo } from "../../services";
import { Map } from "./Map";
import MapsContext from "../../contexts/MapsContext";

export type Props = {
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  badFields: string[];
  setBadFields: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
  return (
    <p className="text-red-500">Bad {fieldName}</p>
  )
}




export const CustomerInfoForm = ({ customerInfo, setCustomerInfo, badFields, setBadFields }: Props) => {

  const { setAddress, data, address } = useContext(MapsContext);


  const onCustomerInfoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.id]: e.target.value });

    const newBadFields = badFields.filter(field => field !== e.target.id);
    setBadFields(newBadFields);
  }

  const onAddressKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && setAddress) {
      setAddress(customerInfo.address);
    }
  }

  useEffect(() => {
    setCustomerInfo({ ...customerInfo, address });
  }, [address]);

  const onAddressClick: React.ReactEventHandler<HTMLDivElement> = async (e: React.SyntheticEvent<HTMLDivElement, Event> & { target: { dataset: { value: string } } }) => {
    if (e.target.dataset) {
      setAddress && setAddress(e.target.dataset.value);
    }
  }

  return (

    <div className="w-[40%] rounded-lg border-2 m-2 p-2 h-[75vh] overflow-scroll overflow-x-hidden">
      <div className="m-2 flex justify-center">
        <Map />
      </div>
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input id="name" value={customerInfo.name} onChange={onCustomerInfoChange} type="text" placeholder="Name" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {badFields.includes("name") && <ErrorMessage fieldName="name" />}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input id="email" value={customerInfo.email} onChange={onCustomerInfoChange} type="email" placeholder="Email" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {badFields.includes("email") && <ErrorMessage fieldName="email" />}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input id="phone" value={customerInfo.phone} onChange={onCustomerInfoChange} type="tel" placeholder="Phone" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {badFields.includes("phone") && <ErrorMessage fieldName="phone" />}

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <input id="address" value={customerInfo.address} onChange={onCustomerInfoChange} onKeyDown={onAddressKeyDown} type="text" placeholder="Address" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {badFields.includes("address") && <ErrorMessage fieldName="address" />}
        </div>
        <div className="mb-4">
          <label htmlFor="places" className="block mb-2 text-sm font-medium text-gray-900 ">Select an address</label>
          <div>
            {data.map(({ description, place_id }) => {
              return (<div className="cursor-pointer mb-2 border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" key={place_id} data-value={description} onClick={onAddressClick} >{description}</div>)
            })}
          </div>
        </div>
      </form>

    </div>

  )

}