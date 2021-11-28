import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import HomeLayout from "@layouts/shop/home";
import CartContext from "context/cart/CartContext";
import router from "next/router";
import React, { useContext, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const success = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  const goToHomePage = () => {
    router.push(`/${router.query.shop_name}/`);
  };

  return (
    <Flex w="full" minH="90vh" align="center" justify="center">
      <Stack spacing="7" align="center" maxW="md">
        <IoIosCheckmarkCircle size="15vh" color="green" />
        <Heading fontSize="xl">Your order is successful</Heading>
        <Text color="grey.300" textAlign="center">
          You will receive a confirmation message shortly. You can track your
          order by the order ID received on your confirmation message.
        </Text>
        <Stack direction="row" spacing="5">
          <Button colorScheme="primary" onClick={goToHomePage}>
            Continue shopping
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

success.layout = HomeLayout;

export default success;
