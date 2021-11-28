import CartContext from "context/cart/CartContext";
import router from "next/router";
import { useContext } from "react";

const useFetchCartProducts = () => {
  const { items = [] } = useContext(CartContext);

  const shopItems = items.filter(
    (item) => item?.shop_name == router.query.shop_name
  );

  return shopItems;
};

export default useFetchCartProducts;
