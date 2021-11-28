import React, { useMemo } from "react";
import { Flex, useDisclosure, Box } from "@chakra-ui/react";
import { BiHomeAlt, BiSearch } from "react-icons/bi";
import { getActiveShopTab } from "utils/helpers";
import router from "next/router";
import { FiShoppingBag } from "react-icons/fi";
import useFetchCartData from "@hooks/useFetchCartData";

const HomeTab = () => {
  const [quantity] = useFetchCartData();

  const activeTab = useMemo(
    () => getActiveShopTab(router.pathname),
    [router.pathname]
  );

  return (
    <Flex
      position="fixed"
      bottom="0px"
      bg="white"
      shadow="lg"
      w="full"
      px="3"
      zIndex={5}
      align="center"
      justify="space-between"
      display={["flex", "flex", "none"]}
      py="3"
    >
      <Flex
        align="center"
        textAlign="center"
        bg={activeTab === 0 ? "primary.500" : "white"}
        color={activeTab === 0 ? "white" : "black"}
        borderRadius="full"
        p="2"
        w="full"
        onClick={() => router.push(`/${router.query.shop_name}/`)}
        justify="center"
      >
        <BiHomeAlt size={20} style={{ marginRight: "5px" }} />
        Home
      </Flex>
      <Flex
        w="full"
        align="center"
        textAlign="center"
        p="2"
        bg={activeTab === 1 ? "primary.500" : "white"}
        color={activeTab === 1 ? "white" : "black"}
        onClick={() => router.push(`/${router.query.shop_name}/checkout`)}
        position="relative"
        justify="center"
        borderRadius="full"
      >
        <Flex position="relative">
          <FiShoppingBag size={20} style={{ marginRight: "5px" }} />
          {quantity > 0 && (
            <Box
              position="absolute"
              bg="red"
              borderRadius="full"
              top="-4px"
              left="-4px"
              align="center"
              justify="center"
              color="white"
              fontSize="xs"
              w="20px"
              h="20px"
            >
              {quantity}
            </Box>
          )}
          Bag
        </Flex>
      </Flex>
      <Flex
        w="full"
        align="center"
        textAlign="center"
        p="2"
        bg={activeTab === 2 ? "primary.500" : "white"}
        color={activeTab === 2 ? "white" : "black"}
        onClick={() => router.push(`/${router.query.shop_name}/search`)}
        position="relative"
        justify="center"
        borderRadius="full"
      >
        <BiSearch size={20} style={{ marginRight: "5px" }} />
        Search
      </Flex>
    </Flex>
  );
};

export default HomeTab;
