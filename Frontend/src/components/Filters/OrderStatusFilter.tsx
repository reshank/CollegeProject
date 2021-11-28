import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const allStatus = [
  "Just placed",
  "Accepted",
  "Shipped",
  "Delivered",
  "Rejected",
  "Cancelled",
  "All",
];

const OrderStatusFilter = ({ activeStatus, setActiveStatus }) => {
  const router = useRouter();

  useEffect(() => {
    setActiveStatus(router.query.status);
  }, [router.query.status]);

  const onChangeFilter = (status) => {
    router.push(`/admin/orders?status=${status}`);
  };

  return (
    <Flex w="full" py="5" flexWrap="wrap" ml="-3">
      {allStatus.map((status) => (
        <Flex
          p="2"
          px="3"
          bg={activeStatus === status ? "primary.500" : "white"}
          key={status}
          m="3"
          color={activeStatus === status ? "white" : "grey"}
          borderRadius="3xl"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => onChangeFilter(status)}
          minW="80px"
          align="center"
          justify="center"
          boxShadow="base"
          fontSize={["sm", "sm", "md"]}
        >
          {status}
        </Flex>
      ))}
    </Flex>
  );
};

export default OrderStatusFilter;
