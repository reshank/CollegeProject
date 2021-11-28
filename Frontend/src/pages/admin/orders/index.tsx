import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "@layouts/admin/index";
import { Button, Flex, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import Loading from "@components/Loading";
import OrderStatusFilter from "@components/Filters/OrderStatusFilter";
import { listOrders } from "@api/order";
import OrderItem from "@components/OrderItem";
import Pagination from "@components/Pagination";
import { debounce } from "lodash";
import { IOrder } from "@interfaces/IOrder";
import router from "next/router";

interface IData {
  orders: IOrder[];
  totalDocuments: number;
}

const index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData>(null);
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [page, setPage] = useState<number>(0);
  const [queryText, setQueryText] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let data = await listOrders({
        query,
        status: router.query?.status,
        skip: page * 6,
      });
      setData(data);
      setLoading(false);
    };
    getData();
  }, [router.query.status, page, query]);

  const delayedQuery = useCallback(
    debounce((q) => setQuery(q), 1000),
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
        <Flex align="center" justify="space-between">
          <Flex justify="center" align="center">
            <FormControl id="name">
              <Input
                type="name"
                bg="white"
                w={["full", "full", "400px"]}
                placeholder="Search by order Id or name of user..."
                value={queryText}
                onChange={onChange}
              />
            </FormControl>
          </Flex>
        </Flex>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Flex w="full" align="center" justify="space-between">
        <Flex w={["full", "full", "fit-content"]} align="center">
          <FormControl id="name">
            <Input
              type="name"
              bg="white"
              w={["full", "full", "400px"]}
              placeholder="Search by order Id or name of user..."
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
      </Flex>
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={5} mt={8}>
        {data?.orders?.map((order) => (
          <OrderItem key={order._id} data={order} />
        ))}
      </SimpleGrid>
      <Pagination
        noOfPages={data?.totalDocuments / 6}
        activePage={page}
        setActivePage={setPage}
      />
    </>
  );
};

index.layout = AdminLayout;

export default index;
