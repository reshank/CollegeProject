import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
//components imports
import Header from "@components/layout/header/headerAdmin";
import Sidebar from "@components/layout/sidebar";
import { isAdmin } from "@api/shop";
import Loading from "@components/Loading";
import Redirect from "@components/Redirect";
import BottomTab from "@components/layout/BottomTab";
import GoBack from "@components/GoBack";
import { useContext } from "react";
import ShopContext from "context/shop/ShopContext";

interface IShopData {
  daysToExpire: number;
  isAllowed: boolean;
  plan: string;
}

const AdminBackLayout = ({ children }) => {
  const [shopData, setShopData] = useState<IShopData>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addShopData } = useContext(ShopContext);

  useEffect(() => {
    const checkUser = async () => {
      let response = await isAdmin();
      setShopData(response);
      addShopData({
        name: response?.name || "My online shop",
        country: response?.country || "NP",
        opened: response?.opened || true,
      });
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading || shopData === null) {
    return <Loading isFullPage={true} />;
  }

  if (!shopData?.isAllowed) {
    return <Redirect to={`/auth/login`} />;
  }

  if (shopData?.daysToExpire < 0) {
    return <Redirect to={`/admin/pricing`} />;
  }

  return (
    <>
      <Header />
      <Flex flexDirection="row">
        <Sidebar />
        <Flex
          bg="whitesmoke"
          ml={["0px", "0px", "240px"]}
          w="full"
          minH="calc(100vh - 60px)"
          flexDirection="column"
          pb={["80px", "80px", "20px"]}
        >
          <GoBack />
          <Box p={[2, 2, 5]} pt={[2, 2, 0]}>
            {children}
          </Box>
        </Flex>
        <BottomTab />
      </Flex>
    </>
  );
};

export default AdminBackLayout;
