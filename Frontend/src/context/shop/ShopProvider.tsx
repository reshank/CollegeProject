import { useReducer } from "react";
import ShopContext from "./ShopContext";
import ShopReducer from "./ShopReducer";
import { ADD_SHOP_DETAIL } from "context/types";

const ShopProvider = ({ children }) => {
  const initialState = {
    shop: null,
  };

  const [state, dispatch] = useReducer(ShopReducer, initialState);

  const addShopData = (data) => {
    dispatch({
      type: ADD_SHOP_DETAIL,
      payload: data,
    });

    localStorage.setItem("country", data?.country);
  };

  return (
    <ShopContext.Provider
      value={{
        shop: state.shop,
        addShopData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
