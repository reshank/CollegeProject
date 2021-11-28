import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import Loading from "@components/Loading";
import { isUserLoggedIn } from "@api/auth";
import Redirect from "@components/Redirect";

const GetStartedLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shopSlug, setShopSlug] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      let response = await isUserLoggedIn();
      setIsAuthenticated(response?.isLoggedIn === true);
      setLoading(false);
      setShopSlug(response?.slug);
    };

    checkUser();
  }, []);

  if (loading) {
    return <Loading isFullPage={true} />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/auth/register" />;
  }

  if (shopSlug) {
    return <Redirect to={`/admin/dashboard`} />;
  }

  return <Box>{children}</Box>;
};

export default GetStartedLayout;
