import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import Loading from "@components/Loading";
import { isUserLoggedIn } from "@api/auth";
import Redirect from "@components/Redirect";

const AuthLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      let response = await isUserLoggedIn(true);
      setIsAuthenticated(response?.isLoggedIn === true);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <Loading isFullPage={true} />;
  }

  if (isAuthenticated) {
    return <Redirect to="/get-started" />;
  }

  return <Box>{children}</Box>;
};

export default AuthLayout;
