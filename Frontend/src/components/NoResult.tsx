import React, { ReactNode } from "react";
import { Flex, Image } from "@chakra-ui/react";

const NoResult = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex
      w="full"
      h="full"
      p="5"
      minH="60vh"
      bg="white"
      align="center"
      justify="center"
      my="3"
      flexDirection="column"
      borderRadius="lg"
      boxShadow="base"
    >
      <Image
        h="30vh"
        src="https://picksy.vercel.app/static/no-result-found-33f5132801fa12828023ab44992236d1.svg"
      />
      {children}
    </Flex>
  );
};

export default NoResult;
