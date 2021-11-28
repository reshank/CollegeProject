import React from "react";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const GoBack = () => {
  const router = useRouter();
  return (
    <Flex
      align="center"
      w="full"
      bg="white"
      position="sticky"
      top="60px"
      boxShadow="base"
      mb="5"
      p="3"
      zIndex="10"
    >
      <IconButton
        variant="ghost"
        aria-label="Go Back"
        fontSize="20px"
        mr="3"
        onClick={() => router.back()}
        icon={<ArrowBackIcon boxSize="30px" cursor="pointer" />}
      />
      <Heading fontSize="lg">Back</Heading>
    </Flex>
  );
};

export default GoBack;
