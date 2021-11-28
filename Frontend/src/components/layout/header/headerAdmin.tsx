import React from "react";
import { Flex, Avatar, Heading, Stack, Button } from "@chakra-ui/react";
import { logoutUser } from "@api/auth";
import router from "next/router";
import { useContext } from "react";
import ShopContext from "context/shop/ShopContext";

const header = () => {
  const { shop } = useContext(ShopContext);
  const openShopPage = () => {
    router.push("/admin/dashboard");
  };
  return (
    <Flex
      w="full"
      px="2"
      bg="white"
      boxShadow="base"
      justify="space-between"
      align="center"
      position="sticky"
      top="0px"
      h="60px"
      zIndex="10"
    >
      <Flex cursor="pointer" onClick={openShopPage} align="center">
        <Avatar
          name={shop.name}
          h="35px"
          w="35px"
          borderRadius="md"
          bg="primary.500"
          color="white"
        />
        <Heading fontSize="md" ml="3" noOfLines={1} textOverflow="ellipsis">
          {shop?.name}
        </Heading>
      </Flex>
      <Stack direction="row" className="store-open" spacing="1" mr={[1, 1, 3]}>
        <Button onClick={logoutUser} colorScheme="red">
          Log out
        </Button>
      </Stack>
    </Flex>
  );
};

export default header;
