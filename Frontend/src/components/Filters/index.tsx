import React from "react";
import { Box } from "@chakra-ui/react";
import CategoryFilter from "./CategoryFilter";
// import PriceFilter from "./PriceFilter";

const Category = () => {
  return (
    <Box
      pt={5}
      w={["0%", "0%", "18%"]}
      h="calc(100% - 88px)"
      bg="white"
      position="fixed"
      left="0px"
      top="92px"
      overflow="auto"
      pl={4}
      display={["none", "none", "none", "block"]}
    >
      <CategoryFilter />
      {/* <PriceFilter /> */}
    </Box>
  );
};

export default Category;
