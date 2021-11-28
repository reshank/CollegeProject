import React, { useMemo, useContext } from "react";
import {
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import CartButton from "@components/CartButton";
import { formatNumber } from "utils/helpers";
import CartContext from "context/cart/CartContext";

const CartProductItem = ({ data }) => {
  const { removeItem } = useContext(CartContext);

  const removeCartProduct = () => {
    removeItem(data?.id);
  };

  const percentage = useMemo(() => {
    let price = data?.price;
    let discountPrice = data?.discountPrice;

    if (!discountPrice || discountPrice <= 0) {
      return 0;
    }

    return (((price - discountPrice) / price) * 100).toFixed(0);
  }, [data]);

  return (
    <Flex
      w="full"
      borderColor="grey.500"
      borderWidth="1px"
      p={[2, 2, 5]}
      pb="3"
      flexDirection="column"
      position="relative"
    >
      <Flex>
        <Image
          w="100px"
          objectFit="contain"
          src={data?.image?.url}
          alt="Product Item"
          fallbackSrc={`https://via.placeholder.com/100/EDEDED/CAC8CC?text=${data?.name}`}
          borderRadius="md"
        />
        <Flex
          pl="3"
          w="full"
          justify="space-between"
          direction={["column", "column", "row"]}
        >
          <Flex flexDirection="column">
            <Heading
              fontSize="lg"
              fontWeight="semibold"
              noOfLines={1}
              textOverflow="ellipsis"
            >
              {data?.name}
            </Heading>
            {data?.discountPrice !== data?.price ? (
              <>
                <Heading fontSize="md" fontWeight="bold" mt="2">
                  {formatNumber(data?.discountPrice)}{" "}
                  <Text
                    as="span"
                    color="grey"
                    fontSize="sm"
                    textDecoration="line-through"
                  >
                    {formatNumber(data?.price)}
                  </Text>
                </Heading>
                <Badge
                  position="absolute"
                  fontSize="sm"
                  left="0px"
                  top="0px"
                  zIndex="2"
                  bg="orange"
                  p="2"
                  borderRadius="lg"
                  color="white"
                >
                  {percentage}% OFF
                </Badge>
              </>
            ) : (
              <Heading fontSize="md" fontWeight="bold" mt="2">
                {formatNumber(data?.price)}
              </Heading>
            )}
            {data?.size ? (
              <Text fontSize="md" color="grey.500" fontWeight="bold" mt="2">
                Size: {data?.size}
              </Text>
            ) : (
              <Text fontSize="md" color="grey.500" fontWeight="bold" mt="2">
                {data?.quantity} quantity
              </Text>
            )}
          </Flex>
          <Flex display={["none", "none", "block"]}>
            <Heading fontSize="lg" fontWeight="bold">
              {formatNumber(data?.discountPrice * data?.quantity)}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
      <Stack
        justify="space-between"
        direction={["column", "column", "row"]}
        mt="5"
        w="full"
      >
        <Stack direction="column" display={["flex", "flex", "none"]}>
          <Divider />
          <Heading fontSize="xl" mt="3" fontWeight="bold">
            {formatNumber(data?.price * data?.quantity)}
          </Heading>
        </Stack>
        <CartButton data={data} minW="160px" maxW="160px" size="xs" />
        <Button
          cursor="pointer"
          onClick={removeCartProduct}
          colorScheme="red"
          variant="outline"
          size="sm"
          w={["full", "full", "fit-content"]}
          maxW="160px"
        >
          Remove product
        </Button>
      </Stack>
    </Flex>
  );
};

export default CartProductItem;
