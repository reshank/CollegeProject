import CartContext from "context/cart/CartContext";
import router from "next/router";
import { useContext } from "react";

const useFetchProductQuantity = (productId) => {
  const { items = [] } = useContext(CartContext);

  const shopItems = items.filter(
    (item) => item?.shop_name == router.query.shop_name
  );

  const quantity = shopItems?.find((item) => item.id === productId)
    ? items.find((item) => item.id === productId).quantity
    : 0;

  return quantity;
};

export default useFetchProductQuantity;
