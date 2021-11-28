import React, { useState, useEffect, useMemo } from "react";
import { Heading, Radio, RadioGroup, Stack, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { listCategories } from "@api/category";
import Loading from "@components/Loading";
import { ICategory } from "interfaces/ICategory";

const CategoryFilter = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const value = useMemo(() => router.query.category, [router.query.category]);

  useEffect(() => {
    const getData = async () => {
      let data = await listCategories({
        shop_name: router.query?.shop_name,
      });
      setCategories(data);
      setLoading(false);
    };
    getData();
  }, [router.query.shop_name]);

  const onValueChange = (data) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        category: data,
      },
    });
  };

  if (loading) {
    return (
      <Flex w="full" flexDirection="column">
        <Heading fontSize="md" mb="1">
          CATEGORIES
        </Heading>
        <Loading size="sm" />
      </Flex>
    );
  }

  return (
    <Stack spacing={2} direction="column">
      <Heading fontSize="md" mb="1">
        Categories
      </Heading>
      <RadioGroup onChange={onValueChange} value={value?.toString() || "all"}>
        <Stack direction="column">
          <Radio value="all" colorScheme="primary">
            All categories
          </Radio>
          {categories?.map((category) => (
            <Radio
              value={category.slug}
              key={category._id}
              colorScheme="primary"
            >
              {category.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Stack>
  );
};

export default CategoryFilter;
