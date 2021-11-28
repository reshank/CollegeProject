import React from "react";
import { Flex, Text, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { formatNumber } from "utils/helpers";

interface IShopData {
  daysToExpire: number;
  isAllowed: boolean;
  plan: string;
}

const Plan = ({ shopData }: { shopData: IShopData }) => {
  const router = useRouter();

  const goToPricingPage = async () => {
    router.push("/admin/pricing");
  };

  if (shopData.daysToExpire >= 5 && shopData.plan !== "trail") {
    return null;
  }

  if (shopData.plan === "trail") {
    return (
      <Flex
        position="fixed"
        bottom="0px"
        bg="white"
        shadow="lg"
        w={["full", "full", "calc(100% - 240px)"]}
        ml={["0px", "0px", "240px"]}
        display={["none", "none", "flex"]}
        zIndex={5}
        p="3"
        justify="space-between"
        bordercolor="primary.500"
        borderWidth="3px"
      >
        <Flex flexDirection="column">
          <Heading fontSize="xl">
            You have {shopData?.daysToExpire} days left in your free trial
          </Heading>
          <Text color="grey">
            Get our premium plans according to need to continue after trail.
          </Text>
        </Flex>
        <Flex
          bg="primary.500"
          w="200px"
          borderRadius="md"
          cursor="pointer"
          flexDirection="column"
          p="2"
          color="white"
          maxH="70px"
          px="3"
          onClick={goToPricingPage}
        >
          <Text fontSize="xs">Starting at</Text>
          <Heading fontSize="lg">{formatNumber(499)} /-</Heading>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      position="fixed"
      bottom="0px"
      bg="white"
      shadow="lg"
      w={["full", "full", "calc(100% - 240px)"]}
      ml={["0px", "0px", "240px"]}
      zIndex={5}
      p="3"
      justify="space-between"
      bordercolor="primary.500"
      borderWidth="3px"
    >
      <Flex flexDirection="column">
        <Heading fontSize="xl">
          You have {shopData?.daysToExpire} days left in your {shopData?.plan}{" "}
          plan
        </Heading>
        <Text color="grey">
          Recharge your plan inorder to continue to use our service.
        </Text>
      </Flex>
      <Flex
        bg="primary.500"
        w="200px"
        borderRadius="md"
        cursor="pointer"
        flexDirection="column"
        p="2"
        color="white"
        maxH="70px"
        px="3"
        onClick={goToPricingPage}
      >
        <Text fontSize="xs">Starting at</Text>
        <Heading fontSize="lg">{formatNumber(499)} /-</Heading>
      </Flex>
    </Flex>
  );
};

export default Plan;
