import {
  ADD_TO_CART,
  INCREASE_CART_QTY,
  DECREASE_CART_QTY,
  REMOVE_CART_ITEM,
  CLEAR_CART,
} from "../types";

const CartReducer = (state = { items: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART: {
      localStorage.setItem("items", JSON.stringify([...state.items, payload]));

      return {
        ...state,
        items: [...state.items, payload],
      };
    }

    case INCREASE_CART_QTY: {
      let updatedItems = state.items.map((item) =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
      );

      localStorage.setItem("items", JSON.stringify(updatedItems));

      return {
        ...state,
        items: updatedItems,
      };
    }

    case DECREASE_CART_QTY: {
      let updatedItems = state.items.map((item) =>
        item.id === payload ? { ...item, quantity: item.quantity - 1 } : item
      );

      localStorage.setItem("items", JSON.stringify(updatedItems));

      return {
        ...state,
        items: updatedItems,
      };
    }

    case REMOVE_CART_ITEM:
      let updatedItems = state.items.filter((item) => item.id !== payload);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return {
        ...state,
        items: updatedItems,
      };

    case CLEAR_CART:
      localStorage.setItem("items", JSON.stringify([]));
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
