import { Route, Routes } from "react-router-dom";

import { ShoppingCartPage, ShopsPage } from './pages';

export const useRoutes = () => {

  return (

    <Routes>

      <Route path="/cart" element={<ShoppingCartPage />}></Route>
      <Route path="*" element={<ShopsPage />}></Route>
    </Routes>

  )

}