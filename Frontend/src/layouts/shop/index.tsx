import React, { useEffect, useState, ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import Loading from "@components/Loading";
import { available } from "@api/shop";
import Redirect from "@components/Redirect";
import { NextSeo } from "next-seo";
import { Flex } from "@chakra-ui/react";
import CartProvider from "context/cart/CartProvider";
import ShopContext from "context/shop/ShopContext";

type PropsType = {
  children: ReactNode;
};

type DataTypes = {
  available: true;
  shop: {
    name: string;
    description: string;
    slug: string;
    image: any;
    location: string;
    socialData: any;
    otherData: any;
    country: string;
    opened: boolean;
  };
};

const ShopLayout = ({ children }: PropsType) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [shopData, setShopData] = useState<DataTypes>(null);
  const { shop, addShopData } = useContext(ShopContext);

  useEffect(() => {
    if (router.query.shop_name) {
      const getData = async () => {
        const response = await available(router.query?.shop_name);
        setShopData(response);
        addShopData(response?.shop);
        setLoading(false);
      };
      getData();
    }
  }, [router.query.shop_name]);

  if (loading || shopData === null) {
    return <Loading isFullPage={true} showShopLoader={true} />;
  }

  if (!shop && !shopData?.available) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NextSeo
        title={shop?.name + "-" + shop?.description}
        description={shop?.description}
        openGraph={{
          type: "website",
          url: process.env.FRONTEND_URL + shop?.slug,
          title: shop?.name,
          description: shop?.description,
          site_name: shop?.name,
          images: [
            {
              url: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/11/09/623463-shops.jpg",
              width: 800,
              height: 600,
              alt: shop?.name,
            },
          ],
        }}
      />
      <Flex direction="column" pb={shop?.opened === false ? "60px" : "0px"}>
        <CartProvider>{children}</CartProvider>
      </Flex>
      {shop?.opened === false && (
        <Flex
          position="fixed"
          bottom={["60px", "60px", "0px"]}
          w="full"
          bg="red"
          align="center"
          justify="center"
          color="white"
          zIndex="1000"
          h="60px"
        >
          Store is not accepting order at this time.
        </Flex>
      )}
    </>
  );
};

export default ShopLayout;
