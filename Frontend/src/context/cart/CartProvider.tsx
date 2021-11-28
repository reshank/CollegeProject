import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

import {
  ADD_TO_CART,
  INCREASE_CART_QTY,
  DECREASE_CART_QTY,
  REMOVE_CART_ITEM,
  CLEAR_CART,
} from "context/types";
import router from "next/router";
import toast from "react-hot-toast";

const CartState = ({ children }) => {
  const initialState = {
    items: localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, shop_name: router.query.shop_name },
    });

    toast.success(`${product?.name} added to cart!`);
  };

  const increaseCartQty = (productId) => {
    dispatch({
      type: INCREASE_CART_QTY,
      payload: productId,
    });
  };

  const decreaseCartQty = (productId) => {
    dispatch({
      type: DECREASE_CART_QTY,
      payload: productId,
    });
  };

  const removeItem = (productId) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: productId,
    });

    toast("Item has been removed from cart", {
      style: {
        color: "white",
        backgroundColor: "#1266F1",
      },
    });
  };

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        increaseCartQty,
        decreaseCartQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
