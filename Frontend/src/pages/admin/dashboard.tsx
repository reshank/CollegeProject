import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import AdminLayout from "@layouts/admin/index";
import Card from "@components/common/card";
import { getDashboardData } from "@api/shop";
import Loading from "@components/Loading";
import DashboardStepper from "@components/DashboardStepper";
import { getShowStepper, intToString } from "utils/helpers";

interface dataTypes {
  products: number;
  categories: number;
  shopView: number;
  orders: number;
  totalRevenue: number;
  slug: string;
  graphData: number[];
  location?: string;
}

const index = () => {
  const [data, setData] = useState<dataTypes>(null);
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      let result: any = await getDashboardData();
      setData(result);
    };
    setLoading("fetch");
    getData();
  }, []);

  const showStepper: boolean = useMemo(() => getShowStepper(data), [data]);

  if (loading === "" || data === null) {
    return <Loading />;
  }

  if (showStepper) {
    return <DashboardStepper data={data} />;
  }

  return (
    <>
      <Box>
        <Heading fontSize="xl">Overview</Heading>
        <SimpleGrid columns={[1, 2]} spacing={5} pt={5}>
          <div className="store-orders">
            <Card
              subTitle="This year"
              title="Total orders"
              data={data?.orders}
              link={`/admin/orders`}
            />
          </div>
          <div className="store-sale">
            <Card
              title="Total sale"
              subTitle="This year"
              data={data?.totalRevenue}
              link={`/admin/orders`}
              isRevenue={true}
            />
          </div>
          <div className="store-products">
            <Card
              title="Total products"
              subTitle="All products"
              data={data?.products}
              link={`/admin/products`}
            />
          </div>
        </SimpleGrid>
      </Box>
    </>
  );
};

index.layout = AdminLayout;

export default index;
