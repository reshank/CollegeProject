import React from "react";
import { Stack, Radio, Flex, RadioGroup, Heading } from "@chakra-ui/react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <Flex p={[2, 2, 5]} flexDirection="column">
      <Heading fontSize="xl" my={[3, 3, 5]}>
        Payment method
      </Heading>
      <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
        <Stack direction="column">
          <Radio size="lg" value="cod">
            Cash on Delivery ( COD )
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default PaymentMethod;
