import React, { useContext, useMemo } from "react";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import useFetchCartData from "@hooks/useFetchCartData";
import { formatNumber } from "utils/helpers";
import ShopContext from "context/shop/ShopContext";

interface ICharge {
  id: string;
  type: string;
  amount?: number;
  percent?: number;
  show: boolean;
}

interface DeliveryCharge {
  amount: number;
  freeAbove: number;
  show: boolean;
}

interface ICheckoutData {
  extraCharges?: ICharge[];
  deliveryCharge?: DeliveryCharge;
}

const OrderDetails = () => {
  const data = useFetchCartData();
  const { shop } = useContext(ShopContext);


  const grandTotal = useMemo(() => {
    let total: number = data[1];
    return Number(total);
  }, [data]);

  //price =data[1];
  return (
    <Flex p="5" flexDirection="column" w="full" borderRadius="md">
      <Heading fontSize="lg">Order summary</Heading>
      <Flex flexDirection="column" mt={5}>
        <Flex justify="space-between" align="center" mb="3">
          <Heading fontSize="md" fontWeight="normal" color="grey">
            Item Total
          </Heading>
          <Heading fontSize="md">{formatNumber(data[1])}</Heading>
        </Flex>
        <Divider
          variant="dashed"
          borderTopWidth="1px"
          borderTopColor="grey"
          my="2"
        />
        <Flex justify="space-between" align="center" my="3">
          <Flex flexDirection="column">
            <Heading fontSize="md">Grand Total</Heading>
            <Text color="grey" fontSize="sm">
              Inclusive of all taxes
            </Text>
          </Flex>
          <Heading fontSize="md">{formatNumber(grandTotal)}</Heading>
        </Flex>
        <Divider
          variant="dashed"
          borderTopWidth="1px"
          borderTopColor="grey"
          my="2"
        />
        <Flex justify="space-between" align="center" my="3">
          <Flex flexDirection="column">
            <Heading fontSize="md" fontWeight="normal">
              Average delivery time
            </Heading>
            <Text color="grey" fontSize="sm">
              This might be depending on situations.
            </Text>
          </Flex>
          <Heading fontSize="md">{shop?.otherData?.delivery || "-"}</Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrderDetails;
