import { Badge, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { formatNumber, getBackgroundColorByStatus } from "utils/helpers";
import { useRouter } from "next/router";
import { IOrder } from "@interfaces/IOrder";

const OrderItem = ({ data }: { data: IOrder }) => {
  const router = useRouter();

  const goToDetails = () => {
    router.push(`/admin/orders/${data?._id}`);
  };

  return (
    <Flex
      bg="white"
      boxShadow="base"
      p="3"
      borderRadius="md"
      flexDirection="column"
    >
      <Flex w="full" justify="space-between">
        <Heading fontSize="sm">Order ID : {data?.orderId}</Heading>
        <Flex direction="column">
          <Heading fontSize="sm">
            {format(parseISO(data?.createdAt?.toString()), "h : m aaa")},{" "}
            <Heading as="span" fontSize="sm" color="grey">
              {format(parseISO(data?.createdAt?.toString()), "d MMMM yyyy")}
            </Heading>
          </Heading>
        </Flex>
      </Flex>
      <Flex w="full" justify="space-between" align="center" my="4">
        <Flex flexDirection="column">
          <Text fontSize="md" color="grey">
            {data?.orderDetails?.length} Item
          </Text>
          <Heading fontSize="md" color="primary.500" mt="1">
            {formatNumber(data?.grandTotal)}
          </Heading>
        </Flex>
        <Badge colorScheme="red">{data?.paymentMethod}</Badge>
      </Flex>
      <Flex
        w="full"
        justify="space-between"
        align="center"
        borderTopWidth="1px"
        borderTopColor="grey.500"
        pt="4"
      >
        <Badge colorScheme={getBackgroundColorByStatus(data?.status)}>
          {data?.status}
        </Badge>
        <Button
          colorScheme="primary"
          size="sm"
          variant="outline"
          onClick={goToDetails}
        >
          Details
        </Button>
      </Flex>
    </Flex>
  );
};

export default OrderItem;
