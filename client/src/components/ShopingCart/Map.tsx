import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext, useEffect, useMemo, useState } from "react";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import CartContext from "../../contexts/CartContext";
import MapsContext from "../../contexts/MapsContext";
import { Shop, shopsService } from "../../services";


const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const containerStyle = {
  width: "90%",
  height: "300px"
};

const center = {
  lat: 49.944226,
  lng: 35.916915
}


const PlacesAutocomplete = () => {

  const { address, setData, setLocation } = useContext(MapsContext);

  const { setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  useEffect(() => {
    clearSuggestions();
    setValue(address);

    if (setLocation) {
      getGeocode({ address }).then(async (results) => {
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ lat, lng });
      })
    }

  }, [address]);

  useEffect(() => {
    if (status === "OK" && setData) {
      setData(data);
    }
  }, [status]);


  return <></>
}

type ShopMarkerProps = {
  shop: Shop
}

const ShopMarker = ({ shop }: ShopMarkerProps) => {

  const [shopPosition, setShopPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    getGeocode({ address: shop.location.address }).then(async (results) => {
      const { lat, lng } = await getLatLng(results[0]);
      setShopPosition({ lat, lng });
    })
  }, []);

  return (
    <Marker position={shopPosition} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />
  )

}

export const Map = () => {

  const { location, setAddress, address } = useContext(MapsContext);
  const { cart } = useContext(CartContext);
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {

    const productIds = Object.keys(cart);

    if (productIds.length) {
      shopsService.getOne(cart[productIds[0]].product.shopId).then(({ shop }) => {
        if (shop) {
          setShop(shop);
        } else {
          setShop(null);
        }
      });
    } else {
      setShop(null);
    }

  }, [cart]);


  const libraries = useMemo((): ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] => ["places"], []);

  const [currentCenter, setCurrentCenter] = useState(center);

  useEffect(() => {
    if (location.lat && location.lat)
      setCurrentCenter(location);
  }, [location]);

  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat !== undefined && lng !== undefined) {
      const results = await getGeocode({ location: { lat, lng } });
      const address = results[0].formatted_address;

      setAddress && setAddress(address);
    }

  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_KEY} libraries={libraries}>
      <div>
        <PlacesAutocomplete ></PlacesAutocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={10}
        onClick={onMapClick}
      >
        {
          address.length !== 0 && <Marker position={location} />
        }
        {
          shop && <ShopMarker shop={shop}></ShopMarker>
        }

      </GoogleMap>

    </LoadScript>
  )
}