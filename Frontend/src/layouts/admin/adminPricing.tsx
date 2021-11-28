import React, { useState, useEffect, useContext } from "react";
import { isAdmin } from "@api/shop";
import Loading from "@components/Loading";
import Redirect from "@components/Redirect";
import ShopContext from "context/shop/ShopContext";

interface IShopData {
  daysToExpire: number;
  isAllowed: boolean;
  plan: string;
}

const AdminPricingLayout = ({ children }) => {
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

  return <>{children}</>;
};

export default AdminPricingLayout;
