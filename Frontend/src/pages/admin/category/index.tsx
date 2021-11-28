import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "@layouts/admin/index";
import {
  Flex,
  Heading,
  Button,
  SimpleGrid,
  FormControl,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { listAdminCategories } from "@api/category";
import Loading from "@components/Loading";
import CategoryItem from "@components/common/category/adminCategory";
import { ICategory } from "@interfaces/ICategory";
import debounce from "lodash.debounce";
import Pagination from "@components/Pagination";

interface IData {
  categories: ICategory[];
  totalDocuments: number;
}

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState<IData>(null);
  const [page, setPage] = useState<number>(0);
  const [queryText, setQueryText] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      let data = await listAdminCategories({
        query,
        skip: page * 9,
      });
      setData(data);
      setLoading(false);
    };
    getData();
  }, [refresh, page, query]);

  const openCreatePage = () => {
    router.push(`/admin/category/create`);
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

  if (loading === true || data === null) {
    return (
      <>
        <Flex justify="space-between">
          <Flex justify="center" align="center">
            <FormControl id="name">
              <Input
                type="name"
                bg="white"
                w={["full", "full", "400px"]}
                placeholder="Search for category..."
                value={queryText}
                onChange={onChange}
              />
            </FormControl>
          </Flex>
          <Button colorScheme="primary" onClick={openCreatePage}>
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
              placeholder="Search for category..."
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
        <Button colorScheme="primary" onClick={openCreatePage}>
          Add new category
        </Button>
      </Stack>
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={5} pt={5}>
        {data?.categories?.map((category) => (
          <CategoryItem data={category} key={category._id} Refresh={Refresh} />
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
