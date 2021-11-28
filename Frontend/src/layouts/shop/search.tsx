import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/layout";
//components imports
import Header from "@components/layout/header/index";
import Filters from "@components/Filters/index";
import ShopLayout from "./index";
import HomeTab from "@components/layout/HomeTab";

type PropsType = {
  children: ReactNode;
};

const SearchLayout = ({ children }: PropsType) => {
  return (
    <ShopLayout>
      <Header />
      <Flex
        flexDirection="row"
        w="100%"
        h="100%"
        pt={["120px", "120px", "80px"]}
        pb={["60px", "60px", "0px"]}
      >
        <Filters />
        <Box
          w="full"
          h="full"
          ml={["0px", "0px", "0%", "18%"]}
          bg="whitesmoke"
          p={[2, 2, 5]}
          pt="5"
        >
          {children}
        </Box>
      </Flex>
      <HomeTab />
    </ShopLayout>
  );
};

export default SearchLayout;
