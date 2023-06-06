
import { Shop } from "../../services"

export type Props = {
  shop: Shop,
  setSelectedShop: React.Dispatch<React.SetStateAction<string | undefined>>,
  isSelected: boolean
}

export const ShopsItem = ({ shop, setSelectedShop, isSelected }: Props) => {

  const selectedClass = isSelected ? "bg-gray-400" : "";

  return (
    <div className={"w-[70%] rounded-lg border-2 text-center my-2 p-4 cursor-pointer " + selectedClass} onClick={() => {
      setSelectedShop(shop.id)
    }}>
      <div>{shop.name}</div>
    </div>
  )

}