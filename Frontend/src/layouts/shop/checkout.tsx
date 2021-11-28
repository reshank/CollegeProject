import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/layout";
//components imports
import Header from "@components/layout/header/index";
import { Container } from "@chakra-ui/react";
import ShopLayout from ".";
import HomeTab from "@components/layout/HomeTab";

type PropsType = {
  children: ReactNode;
};

const CheckoutLayout = ({ children }: PropsType) => {
  return (
    <ShopLayout>
      <Header />
      <Flex
        flexDirection="row"
        w="full"
        minH="95vh"
        pt={["120px", "120px", "80px"]}
        pb={["60px", "60px", "0px"]}
        bg="whitesmoke"
        justify="center"
      >
        <Flex w="full" maxW={["full", "full", "7xl"]}>
          {children}
        </Flex>
      </Flex>
      <HomeTab />
    </ShopLayout>
  );
};

export default CheckoutLayout;
