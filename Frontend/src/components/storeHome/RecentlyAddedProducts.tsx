import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import ProductItem from "@components/common/product/item";
import { useRouter } from "next/router";
import { listRecentProducts } from "@api/product";
import Loading from "../Loading";
import { IProduct } from "@interfaces/IProduct";

const RecentlyAddedProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMount = true;
    const getData = async () => {
      let data = await listRecentProducts({
        shop_name: router.query.shop_name,
      });
      if (isMount) {
        setProducts(data);
        setLoading(false);
      }
    };
    getData();
    return function cleanup() {
      isMount = false;
    };
  }, [router.query.shop_name]);

  if (loading) {
    return (
      <Box bg="white" my={5} p="5" borderRadius="lg">
        <Flex w="full" textAlign="center" flexDirection="column" py="50px">
          <Heading fontSize="xl">Recently added products</Heading>
          <Text color="grey" mt="2">
            All the list of recently added products
          </Text>
        </Flex>
        <Flex align="center" justify="center" minH="250px">
          <Loading />
        </Flex>
      </Box>
    );
  }

  return (
    <div id="featuredProducts">
      <Box bg="white" my={5} p={["2", "2", "5"]} borderRadius="lg">
        <Flex w="full" textAlign="center" flexDirection="column" py="5">
          <Heading fontSize="xl">Recently added products</Heading>
          <Text color="grey" mt="2">
            All the list of recently added products
          </Text>
        </Flex>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={5}>
          {products?.map((product) => (
            <ProductItem key={product._id} data={product} />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default RecentlyAddedProducts;
