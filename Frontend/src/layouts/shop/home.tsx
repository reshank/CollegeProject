import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/layout";
//components imports
import Header from "@components/layout/header/index";
import ShopLayout from "./index";
import HomeTab from "@components/layout/HomeTab";

type PropsType = {
  children: ReactNode;
};

const HomeLayout = ({ children }: PropsType) => {
  return (
    <ShopLayout>
      <Flex flexDirection="column" w="100%" h="100%">
        <Header />
        <Box
          w="full"
          minH={[
            "calc(100vh - 120px)",
            "calc(100vh - 120px)",
            "calc(100vh - 80px)",
          ]}
          bg="whitesmoke"
          px={[1, 1, 3, 5]}
          pt={["120px", "120px", "80px"]}
          pb={["60px", "60px", "0px"]}
        >
          {children}
        </Box>
      </Flex>
      <HomeTab />
    </ShopLayout>
  );
};

export default HomeLayout;
