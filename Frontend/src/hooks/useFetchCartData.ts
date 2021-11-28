import CartContext from "context/cart/CartContext";
import router from "next/router";
import { useContext } from "react";

const useFetchCartData = () => {
  const { items = [] } = useContext(CartContext);

  const shopItems = items.filter(
    (item) => item?.shop_name == router.query.shop_name
  );

  const quantity: number = shopItems?.length;

  const price: number = shopItems.reduce(
    (acc, current) => acc + current.discountPrice * current.quantity,
    0
  );

  return [quantity, price];
};

export default useFetchCartData;
