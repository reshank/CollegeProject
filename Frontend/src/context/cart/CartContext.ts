import { createContext } from "react";

const initialState = {
  items: [],
  addToCart: (item: any) => {},
  increaseCartQty: (item: any) => {},
  decreaseCartQty: (item: any) => {},
  removeItem: (item: any) => {},
  clearCart: () => {},
};

const CartContext = createContext(initialState);

export default CartContext;
