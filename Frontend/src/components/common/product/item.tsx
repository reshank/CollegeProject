import React, { useMemo } from "react";
import { Badge, Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import CartButton from "@components/CartButton";
import { IProduct } from "interfaces/IProduct";
import { formatNumber } from "utils/helpers";

const ProductItem = ({ data }: { data: IProduct }) => {
  const router = useRouter();

  const goToProductDetail = () => {
    router.push(`/${router.query.shop_name}/product/${data.slug}`);
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
    <Box
      h="fit-content"
      bg="white"
      _hover={{
        boxShadow: "2xl",
      }}
      boxShadow="lg"
      p="2"
      borderRadius="lg"
      position="relative"
    >
      <Box cursor="pointer" onClick={goToProductDetail}>
        <Image
          src={data?.images[0]?.url}
          w="full"
          h="120px"
          objectFit="contain"
          borderRadius="lg"
          fallbackSrc={`https://via.placeholder.com/200/EDEDED/CAC8CC?text=${data?.name}`}
        />
        <Stack p={3} spacing="1">
          <Heading fontSize="lg" noOfLines={1}>
            {data?.name}
          </Heading>
          <Box fontSize="sm" color="grey.200">
            {data?.category?.name}
          </Box>
          {data?.discountPrice > 0 ? (
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
                right="0px"
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
        </Stack>
      </Box>

      <CartButton data={{ ...data, id: data?._id }} />
    </Box>
  );
};

export default ProductItem;
