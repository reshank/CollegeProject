import React, { useMemo } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { BiHomeAlt, BiCopyAlt, BiGridAlt, BiMoney } from "react-icons/bi";
import { getActiveTab } from "utils/helpers";
import router from "next/router";
import { FiSettings } from "react-icons/fi";

const BottomTab = () => {
  const activeTab = useMemo(
    () => getActiveTab(router.pathname),
    [router.pathname]
  );

  return (
    <Flex
      position="fixed"
      bottom="0px"
      bg="white"
      shadow="lg"
      w="full"
      zIndex={5}
      align="center"
      justify="space-between"
      display={["flex", "flex", "none"]}
    >
      <Flex
        align="center"
        flexDirection="column"
        textAlign="center"
        bg={activeTab === 0 ? "primary.500" : "white"}
        color={activeTab === 0 ? "white" : "black"}
        py="2"
        w="20%"
        onClick={() => router.push("/admin/dashboard")}
      >
        <BiHomeAlt size={20} />
        <Text fontSize="xs" w="full" noOfLines={1} textOverflow="ellipsis">
          Dashboard
        </Text>
      </Flex>
      <Flex
        w="20%"
        align="center"
        flexDirection="column"
        textAlign="center"
        py="2"
        bg={activeTab === 1 ? "primary.500" : "white"}
        color={activeTab === 1 ? "white" : "black"}
        onClick={() => router.push("/admin/products")}
      >
        <BiCopyAlt size={20} />
        <Text fontSize="xs" w="full" noOfLines={1} textOverflow="ellipsis">
          Products
        </Text>
      </Flex>
      <Flex
        w="20%"
        align="center"
        flexDirection="column"
        textAlign="center"
        py="2"
        bg={activeTab === 2 ? "primary.500" : "white"}
        color={activeTab === 2 ? "white" : "black"}
        onClick={() => router.push("/admin/category")}
      >
        <BiGridAlt size={20} />
        <Text fontSize="xs" w="full" noOfLines={1} textOverflow="ellipsis">
          Categories
        </Text>
      </Flex>
      <Flex
        w="20%"
        align="center"
        flexDirection="column"
        textAlign="center"
        py="2"
        bg={activeTab === 3 ? "primary.500" : "white"}
        color={activeTab === 3 ? "white" : "black"}
        onClick={() => router.push("/admin/orders")}
      >
        <BiMoney size={20} />
        <Text fontSize="xs" w="full" noOfLines={1} textOverflow="ellipsis">
          Orders
        </Text>
      </Flex>
      <Flex
        w="20%"
        align="center"
        flexDirection="column"
        textAlign="center"
        py="2"
        bg={activeTab === 4 ? "primary.500" : "white"}
        color={activeTab === 4 ? "white" : "black"}
        onClick={() => router.push("/admin/manage")}
      >
        <FiSettings size={20} />
        <Text fontSize="xs" w="full" noOfLines={1} textOverflow="ellipsis">
          Manage
        </Text>
      </Flex>
    </Flex>
  );
};

export default BottomTab;
