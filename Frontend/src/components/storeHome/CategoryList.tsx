import React, { useEffect, useState } from "react";
import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { listCategories } from "@api/category";
import { useRouter } from "next/router";
import Loading from "../Loading";
import { ICategory } from "interfaces/ICategory";

const CategoryList = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (router.query.shop_name !== "") {
      const getData = async () => {
        let data = await listCategories({
          shop_name: router.query?.shop_name,
        });

        setCategories(data);
        setLoading(false);
      };
      getData();
    }
  }, [router.query.shop_name]);

  if (loading) {
    return (
      <Flex
        w="full"
        align="center"
        flexDirection="column"
        bg="white"
        mt="3"
        borderRadius="lg"
        p={["2", "2", "5"]}
      >
        <Flex w="full" textAlign="center" flexDirection="column" py="5">
          <Heading fontSize="xl">Shop by category</Heading>
          <Text color="grey" mt="2">
            All the list of categories available on our shop
          </Text>
        </Flex>
        <Flex pb="5">
          <Loading />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      w="full"
      align="center"
      flexDirection="column"
      bg="white"
      mt="3"
      borderRadius="lg"
      p={["2", "2", "5"]}
    >
      <Flex w="full" textAlign="center" flexDirection="column" pt="5">
        <Heading fontSize="xl">Shop by category</Heading>
        <Text color="grey" mt="2">
          All the list of categories available on our shop
        </Text>
      </Flex>
      <SimpleGrid columns={[2, 2, 3, 4, 6]} w="full" py="5" spacing="5">
        {categories?.map((category) => (
          <Flex
            key={category._id}
            flexDirection="column"
            textAlign="center"
            w="full"
            p="3"
          >
            <Image
              h="150px"
              w="full"
              borderRadius="md"
              fallbackSrc={`https://via.placeholder.com/500/EDEDED/CAC8CC?text=${category?.name}`}
              src={category?.image?.url}
              alt={category?.name}
              objectFit="contain"
            />
            <Heading mt="2" fontSize="md" noOfLines={2} textOverflow="ellipsis">
              {category?.name}
            </Heading>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default CategoryList;
