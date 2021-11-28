import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "@layouts/admin/index";
import {
  Flex,
  Button,
  SimpleGrid,
  Input,
  FormControl,
  Stack,
} from "@chakra-ui/react";
import ProductItem from "@components/common/product/adminProduct";
import router from "next/router";
import { listAdminProducts } from "@api/product";
import Loading from "@components/Loading";
import { IProduct } from "@interfaces/IProduct";
import Pagination from "@components/Pagination";
import debounce from "lodash.debounce";

interface IData {
  products: IProduct[];
  totalDocuments: number;
}

const index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [queryText, setQueryText] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      let data = await listAdminProducts({
        skip: page * 9,
        query: query,
      });
      setData(data);
      setLoading(false);
    };
    getData();
  }, [refresh, page, query]);

  const openNewProductPage = () => {
    router.push(`/admin/products/create`);
  };

  const Refresh = () => {
    setRefresh(!refresh);
  };

  const delayedQuery = useCallback(
    debounce((q) => {
      setLoading(true);
      setQuery(q);
    }, 1000),
    []
  );

  const onChange = (e) => {
    setQueryText(e.target.value);
    delayedQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    setQueryText("");
  };

  if (loading || data === null) {
    return (
      <>
        <Flex justify="space-between">
          <Flex justify="center" align="center">
            <FormControl id="name">
              <Input
                type="name"
                bg="white"
                w={["full", "full", "400px"]}
                placeholder="Search for products..."
                value={queryText}
                onChange={onChange}
              />
            </FormControl>
          </Flex>
          <Button colorScheme="primary" onClick={openNewProductPage}>
            Add new Product
          </Button>
        </Flex>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Stack
        direction={["column", "column", "row"]}
        justify="space-between"
        spacing="3"
      >
        <Flex direction="row" justify="center" align="center">
          <FormControl id="name">
            <Input
              type="name"
              bg="white"
              w={["full", "full", "400px"]}
              placeholder="Search for products..."
              value={queryText}
              onChange={onChange}
            />
          </FormControl>
          {query?.length > 0 && (
            <Button ml="3" colorScheme="red" size="xs" onClick={clearQuery}>
              clear
            </Button>
          )}
        </Flex>
        <Button colorScheme="primary" onClick={openNewProductPage}>
          Add new Product
        </Button>
      </Stack>
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={5} pt={5}>
        {data?.products?.map((product) => (
          <ProductItem data={product} key={product._id} Refresh={Refresh} />
        ))}
      </SimpleGrid>
      <Pagination
        noOfPages={data?.totalDocuments / 9}
        activePage={page}
        setActivePage={setPage}
      />
    </>
  );
};

index.layout = AdminLayout;

export default index;
