import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Badge,
  Divider,
  SimpleGrid,
  Image,
  Stack,
} from "@chakra-ui/react";
import { orderDetails } from "@api/order";
import Loading from "@components/Loading";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { formatNumber, getBackgroundColorByStatus } from "utils/helpers";
import StatusDetails from "@components/StatusDetails";
import { IOrder } from "@interfaces/IOrder";
import AdminBackLayout from "@layouts/admin/adminWithBack";
import router from "next/router";

const OrderDetails = () => {
  const [loading, setLoading] = useState<string>("fetch");
  const [order, setOrder] = useState<IOrder>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      let data = await orderDetails({
        orderId: router.query.order_id,
      });
      setOrder(data);
      setLoading("");
    };
    getData();
  }, [router.query.order_id, refresh]);

  if (loading === "fetch" || order === null) {
    return <Loading isFullPage={true} />;
  }

  const Refresh = () => {
    setRefresh(!refresh);
  };

  const OrderItem = ({ data }) => {
    return (
      <Flex
        borderWidth="1px"
        borderColor="gray.300"
        borderRadius="md"
        w="full"
        p={[1, 1, 3]}
      >
        <Image
          src={data?.image?.url}
          w="100px"
          h="100px"
          borderRadius="md"
          fallbackSrc={`https://via.placeholder.com/100/EDEDED/CAC8CC?text=${data?.product?.name}`}
        />
        <Stack spacing="3" ml="3">
          <Heading fontSize="md" noOfLines={1} textOverflow="ellipsis">
            {data?.product?.name}
          </Heading>
          {data?.size && (
            <Text fontSize="sm" fontWeight="bold">
              Size : {data?.size}
            </Text>
          )}
          <Text fontSize="md">
            <Badge
              as="span"
              colorScheme="primary"
              variant="outline"
              fontSize="md"
            >
              {data?.quantity}
            </Badge>{" "}
            X {formatNumber(data?.price)}
          </Text>
          <Text fontSize="lg" fontWeight="bold" justify="center">
            {formatNumber(data?.quantity * data?.price)}
          </Text>
        </Stack>
      </Flex>
    );
  };

  const ExtraPriceItem = ({ charge }) => {
    if (charge.type === "percent") {
      return (
        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="grey">
            {charge.name} ({charge.percent} %)
          </Text>
          <Heading fontSize="sm" fontWeight="normal">
            {formatNumber((charge.percent / 100) * order?.itemTotal)}
          </Heading>
        </Flex>
      );
    }

    return (
      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="grey">
          {charge.name}
        </Text>
        <Heading fontSize="sm" fontWeight="normal">
          {formatNumber(charge.amount)}
        </Heading>
      </Flex>
    );
  };

  return (
    <>
      <Flex
        direction="column"
        bg="white"
        boxShadow="base"
        p="5"
        borderRadius="md"
      >
        <Flex w="full" justifyContent="space-between" align="center">
          <Heading fontSize="lg" fontWeight="normal">
            Order ID{" "}
            <Heading ml="3" as="span" fontWeight="bold" fontSize="lg">
              {order?.orderId}
            </Heading>
          </Heading>
          <Badge
            size="lg"
            colorScheme={getBackgroundColorByStatus(order?.status)}
          >
            {order?.status}
          </Badge>
        </Flex>
        <Divider my="5" />
        <Stack direction={["column", "column", "row"]} spacing="50px">
          <Flex direction="column">
            <Heading fontSize="sm">Payment Method</Heading>
            <Text>Cash on Delivery</Text>
          </Flex>
          <Flex direction="column">
            <Heading fontSize="sm">Payment Date</Heading>
            <Text>
              {order?.createdAt &&
                format(parseISO(order?.createdAt.toString()), "d MMM yyyy")}
            </Text>
          </Flex>
          <Flex direction="column">
            <Heading fontSize="sm">Payment Status</Heading>
            <Text>{order?.status}</Text>
          </Flex>
        </Stack>
        <Divider my="5" />
        <Flex direction="column">
          <Text fontWeight="bold" color="grey">
            {order?.orderDetails?.length} ITEM
          </Text>
          <SimpleGrid my="3" columns={[1, 2, 2, 3]} spacing="5">
            {order?.orderDetails?.map((data) => (
              <OrderItem key={data?._id} data={data} />
            ))}
          </SimpleGrid>
        </Flex>
        <Divider my="5" />
        <Stack spacing="3">
          <Text fontWeight="bold" color="grey">
            ORDER DETAILS
          </Text>
          <Flex justify="space-between" align="center">
            <Text color="grey">Item Total</Text>
            <Heading fontSize="md" fontWeight="normal">
              {formatNumber(order?.itemTotal)}
            </Heading>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="grey">
              Delivery charge
            </Text>
            <Heading fontSize="sm" fontWeight="normal">
              {formatNumber(order?.deliveryCharge)}
            </Heading>
          </Flex>
          {order?.extraCharges?.map((charge, index) => (
            <ExtraPriceItem charge={charge} key={index} />
          ))}
          <Flex mt="5" justify="space-between" align="center">
            <Heading fontSize="lg">Grand Total</Heading>
            <Heading fontSize="xl">{formatNumber(order?.grandTotal)}</Heading>
          </Flex>
        </Stack>
        <Divider my="5" />
        <Stack spacing="3">
          <Text fontWeight="bold" color="grey">
            CUSTOMER DETAILS
          </Text>
          <Stack spacing="3" direction="row" w="full">
            <Stack spacing="3" w="50%">
              <Flex direction="column">
                <Text color="grey">Full name</Text>
                <Heading fontSize="md" fontWeight="normal">
                  {order?.name}
                </Heading>
              </Flex>
              <Flex direction="column">
                <Text color="grey">Phone number</Text>
                <Heading fontSize="md" fontWeight="normal">
                  {order?.mobile}
                </Heading>
              </Flex>
              <Flex direction="column">
                <Text color="grey">Full address</Text>
                <Heading fontSize="md" fontWeight="normal">
                  {order?.fullAddress}
                </Heading>
              </Flex>
            </Stack>
            <Stack spacing="3" w="50%">
              <Flex direction="column">
                <Text color="grey">City</Text>
                <Heading fontSize="md" fontWeight="normal">
                  {order?.city}
                </Heading>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

OrderDetails.layout = AdminBackLayout;

export default OrderDetails;
