import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { formatNumber } from "utils/helpers";

interface InputProps {
  title: string;
  subTitle?: string;
  data: string | number;
  link?: string;
  isRevenue?: boolean;
}

const index = ({
  title,
  subTitle,
  data,
  link,
  isRevenue = false,
}: InputProps) => {
  const router = useRouter();
  return (
    <Flex
      bg="white"
      shadow="base"
      p={5}
      flexDirection="column"
      cursor="pointer"
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
      _hover={{ boxShadow: "outline" }}
      borderRadius="lg"
    >
      <Heading fontSize="lg" fontWeight="semibold">
        {title}
      </Heading>
      <Text fontSize="14px" color="primary.500" fontWeight="semibold">
        {subTitle}
      </Text>
      <Text fontSize="20px" color="primary.500" fontWeight="extrabold" mt={5}>
        {isRevenue ? formatNumber(data) : data}
      </Text>
    </Flex>
  );
};

export default index;
