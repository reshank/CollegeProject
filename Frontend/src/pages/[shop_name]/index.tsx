import React from "react";
import HomeLayout from "@layouts/shop/home";
import CategoryList from "@components/storeHome/CategoryList";
import BestSellingProducts from "@components/storeHome/BestSellingProducts";
import ShopDetail from "@components/storeHome/ShopDetail";

const index = () => {
  return (
    <>
      <CategoryList />
      <BestSellingProducts />
      <ShopDetail />
    </>
  );
};

index.layout = HomeLayout;

export default index;
