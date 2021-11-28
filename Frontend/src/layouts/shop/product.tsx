import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/layout";

//components imports
import Header from "@components/layout/header/index";
import ShopLayout from ".";
import HomeTab from "@components/layout/HomeTab";

type PropsType = {
  children: ReactNode;
};

const ProductDetailLayout = ({ children }: PropsType) => {
  return (
    <ShopLayout>
      <Header showSearch={false} />
      <Box bg="whitesmoke" pt="80px" pb={["60px", "60px", "0px"]}>
        {children}
      </Box>
      <HomeTab />
    </ShopLayout>
  );
};

ProductDetailLayout.layout = ShopLayout;

export default ProductDetailLayout;
