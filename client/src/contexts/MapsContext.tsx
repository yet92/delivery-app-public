import { FC, PropsWithChildren, createContext, useState } from "react";

export type Location = {
  lat: number,
  lng: number
}

export type MapsContextData = {
  address: string;
  setAddress?: React.Dispatch<React.SetStateAction<string>>;
  data: google.maps.places.AutocompletePrediction[];
  setData?: React.Dispatch<React.SetStateAction<google.maps.places.AutocompletePrediction[]>>;
  location: Location;
  setLocation?: React.Dispatch<React.SetStateAction<Location>>;
}



const MapsContext = createContext<MapsContextData>({ address: "", data: [], location: { lat: 0, lng: 0 } });

export const MapsContextWrapper: FC<PropsWithChildren> = ({ children }) => {

  const [address, setAddress] = useState("");
  const [data, setData] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

  return (
    <MapsContext.Provider value={{ address, setAddress, data, setData, location, setLocation }}>
      {children}
    </MapsContext.Provider>
  )

}


export default MapsContext;