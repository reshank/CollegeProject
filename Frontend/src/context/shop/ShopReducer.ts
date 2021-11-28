import { ADD_SHOP_DETAIL } from "../types";

const ShopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SHOP_DETAIL:
      return {
        ...state,
        shop: payload,
      };

    default:
      return state;
  }
};

export default ShopReducer;
