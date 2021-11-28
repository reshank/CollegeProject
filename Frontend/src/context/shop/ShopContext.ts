import { createContext } from "react";

const initialState = {
  shop: null,
  addShopData: (data: any) => {},
};

const ShopContext = createContext(initialState);

export default ShopContext;
