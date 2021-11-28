import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

const item = ({ name, url, match }) => {
  const router = useRouter();
  const { pathname } = router;

  const onPressHandler = () => {
    router.replace(`/${url}`);
  };

  return (
    <Flex
      w="full"
      align="center"
      justify="flex-start"
      bg={pathname.includes(match) ? "primary.500" : "white"}
      borderRadius="lg"
      cursor="pointer"
      onClick={onPressHandler}
      p="3"
    >
      <Text
        fontSize="16px"
        fontWeight="bold"
        color={pathname.includes(match) ? "white" : "black"}
      >
        {name}
      </Text>
    </Flex>
  );
};

export default item;
