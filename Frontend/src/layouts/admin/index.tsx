import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

//components imports
import Plan from "@components/Plan";
import Header from "@components/layout/header/headerAdmin";
import Sidebar from "@components/layout/sidebar";
import { isAdmin } from "@api/shop";
import Loading from "@components/Loading";
import Redirect from "@components/Redirect";
import BottomTab from "@components/layout/BottomTab";
import dynamic from "next/dynamic";
import { useContext } from "react";
import ShopContext from "context/shop/ShopContext";

const Tour = dynamic(() => import("reactour"), { ssr: false });

interface IShopData {
  daysToExpire: number;
  isAllowed: boolean;
  plan: string;
}

const steps = [
  {
    selector: ".store-open",
    title: "You can make your shop open and close",
    content:
      "This is button can be used to close and open your shop, If your shop is closed, user cannot place the order from your shop.",
  },
  {
    selector: ".store-data",
    content: "This section gives you all the basic details of your shop",
  },
  {
    selector: ".store-view",
    content:
      "This section provide you the data for total number of vistors on your shop",
  },
  {
    selector: ".store-orders",
    content:
      "This section provide you the data for total number of vistors on your shop",
  },
  {
    selector: ".store-sale",
    content:
      "This section provide you the data for total number of vistors on your shop",
  },
  {
    selector: ".store-products",
    content:
      "This section provide you the data for total number of vistors on your shop",
  },
  {
    selector: ".order-graph",
    content:
      "This section provide you the data for total number of vistors on your shop",
  },
];

const AdminLayout = ({ children }) => {
  const [shopData, setShopData] = useState<IShopData>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tourOpen, setTourOpen] = useState<boolean>(true);
  const { addShopData } = useContext(ShopContext);

  useEffect(() => {
    const checkUser = async () => {
      let response = await isAdmin();
      setShopData(response);
      addShopData({
        name: response?.name || "My online shop",
        country: response?.country || "NP",
        opened: response?.opened,
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

  // if (shopData?.daysToExpire < 0) {
  //   return <Redirect to={`/admin/pricing`} />;
  // }

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
          p={[2, 2, 5]}
          pt={[2, 2, 5]}
          flexDirection="column"
          pb={["160px", "160px", "100px"]}
        >
          {children}
        </Flex>
        {/* <Plan shopData={shopData} /> */}
        <BottomTab />
      </Flex>
    </>
  );
};

export default AdminLayout;
