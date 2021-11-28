import React from "react";
import { Flex, CircularProgress, Heading } from "@chakra-ui/react";
import { FcShop } from "react-icons/fc";

type PropsType = {
  isFullPage?: boolean;
  w?: string | string[];
  size?: string;
  showShopLoader?: boolean;
  shopCreate?: boolean;
};

const Loading = ({
  isFullPage = false,
  w = "100%",
  size,
  showShopLoader = false,
  shopCreate = false,
}: PropsType) => {
  const getSize = () => {
    let data = "40px";

    switch (size) {
      case "xs":
        data = "30px";
        break;

      case "sm":
        data = "35px";
        break;

      case "md":
        data = "40px";
        break;

      case "lg":
        data = "60px";
        break;
    }

    if (isFullPage) {
      return "60px";
    }

    return data;
  };

  if (shopCreate) {
    return (
      <Flex
        height={"100vh"}
        width={"100%"}
        bg="white"
        align="center"
        justify="center"
        direction="column"
      >
        <CircularProgress
          isIndeterminate
          color="primary.500"
          size="60px"
          thickness="3px"
          mt="5"
        />
        <Heading fontSize="md" mt="5">
          Creating your shop...Please wait...Getting things ready!
        </Heading>
      </Flex>
    );
  }

  if (showShopLoader) {
    return (
      <Flex
        height={"100vh"}
        width={"100%"}
        bg="white"
        align="center"
        justify="center"
        direction="column"
      >
        <FcShop size="80px" />
        <CircularProgress
          isIndeterminate
          color="primary.500"
          size="60px"
          thickness="3px"
        />
      </Flex>
    );
  }

  return (
    <Flex
      w={w ? w : "100%"}
      h={isFullPage ? "100vh" : "100%"}
      align="center"
      justify="center"
    >
      <CircularProgress
        isIndeterminate
        thickness="3px"
        color="primary.500"
        size={getSize()}
      />
    </Flex>
  );
};

export default Loading;
