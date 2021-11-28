import React from "react";
import { Box } from "@chakra-ui/layout";
import SidebarItem from "./item";
import { sideMenuItems } from "bootstrap/config";

const index = () => {
  return (
    <Box
      bg="white"
      shadow="lg"
      w="240px"
      h="100vh"
      position="fixed"
      top="0px"
      left="0px"
      p={3}
      pt="50px"
      display={["none", "none", "block"]}
    >
      <Box my={5}>
        {sideMenuItems.map((menu) => (
          <SidebarItem
            match={menu.match}
            key={menu.key}
            name={menu.name}
            url={menu.url}
          />
        ))}
      </Box>
    </Box>
  );
};

export default index;
