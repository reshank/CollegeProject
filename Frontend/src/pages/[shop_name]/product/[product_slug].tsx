import React, { useEffect, useMemo, useState } from "react";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import ProductLayout from "@layouts/shop/product";
import { productDetail } from "@api/product";
import router from "next/router";
import Loading from "@components/Loading";
import CartButton from "@components/CartButton";
import { formatNumber } from "utils/helpers";
import { IProduct } from "@interfaces/IProduct";

const Detail = () => {
  const [product, setProduct] = useState<IProduct>(null);
  const [loading, setLoading] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  useEffect(() => {
    if (router.query.product_slug !== "") {
      const getData = async () => {
        setLoading("fetch-product");
        let data = await productDetail({
          shop_name: router.query.shop_name,
          product_id: router.query.product_slug,
        });
        setProduct(data);
        setLoading("");
      };

      getData();
    }
  }, [router.query.shop_name, router.query?.product_slug]);

  const price = useMemo(() => {
    if (product?.sizes?.length > 0) {
      return product.sizes[selectedSize].price;
    }

    return product?.price || 0;
  }, [product, selectedSize]);

  const discountPrice = useMemo(() => {
    if (product?.sizes?.length > 0) {
      return product.sizes[selectedSize].discountPrice;
    }

    return product?.discountPrice || 0;
  }, [product, selectedSize]);

  const percentage = useMemo(() => {
    if (!discountPrice || discountPrice <= 0) {
      return 0;
    }

    return (((price - discountPrice) / price) * 100).toFixed(0);
  }, [product, price, discountPrice]);

  if (loading || product === null) {
    return <Loading isFullPage={true} />;
  }

  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing={5} bg="white">
        <Flex p={[2, 5]} align="center" justify="center" direction="column">
          <Image
            h="50vh"
            src={product?.images[selectedIndex]?.url}
            fallbackSrc={`https://via.placeholder.com/500/EDEDED/CAC8CC?text=${product?.name}`}
            objectFit="contain"
          />
          <Stack spacing="5" direction="row" align="center" mt="5">
            {product?.images?.map((image, index) => (
              <Image
                key={index}
                h={index === selectedIndex ? "6vh" : "5vh"}
                cursor="pointer"
                src={image?.url}
                fallbackSrc={`https://via.placeholder.com/500/EDEDED/CAC8CC?text=${product?.name}`}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </Stack>
        </Flex>
        <Stack
          p="5"
          borderLeftWidth={[0, 1]}
          borderLeftColor="gray.200"
          borderTopColor="gray.200"
          borderTopWidth={[1, 0]}
          spacing="5"
        >
          <Heading fontSize="xl" noOfLines={2} textOverflow="ellipsis">
            {product?.name}
          </Heading>

          {discountPrice > 0 ? (
            <Heading fontSize="lg" fontWeight="bold" mt="2">
              {formatNumber(discountPrice)}{" "}
              <Text
                as="span"
                color="grey"
                fontSize="sm"
                textDecoration="line-through"
              >
                {formatNumber(price)}
              </Text>
              <Badge
                fontSize="10px"
                w="fit-content"
                zIndex="2"
                bg="red"
                p="2"
                px="3"
                borderRadius="lg"
                color="white"
                ml="5"
              >
                {percentage} % OFF
              </Badge>
            </Heading>
          ) : (
            <Heading fontSize="lg" fontWeight="bold" mt="2">
              {formatNumber(price)}
            </Heading>
          )}
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
          <Divider />
          <CartButton
            maxW="200px"
            data={{ ...product, price, discountPrice }}
          />
          <Stack spacing="1">
            <Text> Category </Text>
            <Heading fontSize="lg" fontWeight="semibold">
              {product?.category?.name}
            </Heading>
          </Stack>
        </Stack>
      </SimpleGrid>
    </>
  );
};

Detail.layout = ProductLayout;

export default Detail;
