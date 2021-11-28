import React from "react";
import { Badge, Box, Flex } from "@chakra-ui/react";
import useFetchCartData from "@hooks/useFetchCartData";
import { useRouter } from "next/router";
import { formatNumber } from "utils/helpers";

const CheckoutButton = () => {
  const [quantity, price] = useFetchCartData();
  const router = useRouter();

  const goToCheckoutPage = () => {
    router.push(`/${router.query.shop_name}/checkout`);
  };

  return (
    <Box
      w="full"
      maxW="580px"
      p={4}
      bg="white"
      position="fixed"
      bottom="0px"
      cursor="pointer"
      onClick={goToCheckoutPage}
    >
      <Flex
        w="full"
        h="50px"
        borderRadius="3xl"
        bg="primary.500"
        align="center"
        justify="space-between"
      >
        <Flex size="md" fontWeight="medium" color="white" ml={5} align="center">
          Checkout{" "}
          <Badge bg="white" color="primary.500" ml="3">
            {quantity}
          </Badge>
        </Flex>
        <Flex
          h="44px"
          bg="white"
          borderRadius="3xl"
          mr="3px"
          px={7}
          align="center"
        >
          <Box size="md" fontWeight="medium" color="primary.500">
            {formatNumber(price)}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckoutButton;
