import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Loading from "@components/Loading";
import { IProduct } from "@interfaces/IProduct";
import { searchProducts } from "@api/product";
import router from "next/router";

interface Props {
  query: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function Suggestions({ query, show, setShow }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getData = async () => {
    setLoading(true);
    let data = await searchProducts({
      shop_name: router.query.shop_name,
      query,
    });
    setProducts(data?.products || []);
    setLoading(false);
  };

  useEffect(() => {
    if (query?.length >= 1) {
      setLoading(true);
      getData();
    }
  }, [query]);

  const openDetailPage = (slug) => {
    router.push(`/${router.query.shop_name}/product/${slug}`);
    setShow(false);
  };

  if (show === false) {
    return null;
  }

  if (loading) {
    return (
      <Flex
        boxShadow="2xl"
        w={["90%", "90%", "39%"]}
        position="fixed"
        top={["130px", "130px", "60px"]}
        bg="white"
        borderRadius="lg"
        direction="column"
        h="150px"
        py="5"
      >
        <Loading size="sm" />
      </Flex>
    );
  }

  if (products?.length === 0) {
    return (
      <Flex
        boxShadow="2xl"
        w={["90%", "90%", "39%"]}
        position="fixed"
        top={["130px", "130px", "60px"]}
        bg="white"
        borderRadius="lg"
        direction="column"
        maxH="50vh"
        h="100px"
        align="center"
        justify="center"
      >
        <Heading fontSize="md">No products found for this query</Heading>
      </Flex>
    );
  }

  return (
    <Flex
      boxShadow="2xl"
      w={["90%", "90%", "39%"]}
      position="fixed"
      top={["130px", "130px", "60px"]}
      bg="white"
      borderRadius="lg"
      direction="column"
      maxH="50vh"
      pt="3"
      overflowX="hidden"
      overflowY="scroll"
    >
      {products?.map((product) => (
        <Stack
          key={product._id}
          spacing="5"
          direction="row"
          p="3"
          borderTopColor="lightgrey"
          borderTopWidth="1px"
          cursor="pointer"
          borderRadius="lg"
          _hover={{ bg: "whitesmoke" }}
          onClick={() => openDetailPage(product.slug)}
        >
          <Image
            h="50px"
            w="50px"
            objectFit="contain"
            src={product?.images[0]?.url}
            fallbackSrc={`https://via.placeholder.com/50/EDEDED/CAC8CC?text=${product?.name}`}
          />
          <Stack spacing="1">
            <Heading fontSize="md" noOfLines={1} textOverflow="ellipsis">
              {product?.name}
            </Heading>
            <Text
              color="grey.500"
              fontSize="sm"
              noOfLines={1}
              textOverflow="ellipsis"
            >
              {product?.category?.name}
            </Text>
          </Stack>
        </Stack>
      ))}
    </Flex>
  );
}

export default Suggestions;
