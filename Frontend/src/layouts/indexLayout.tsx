import React, { ReactNode } from "react";
import IndexPageHeader from "@components/layout/header/headerIndex";
import { Box } from "@chakra-ui/layout";
import Footer from "@components/layout/footer/index";

type PropsType = {
  children: ReactNode;
};

const IndexPageLayout = ({ children }: PropsType) => {
  return (
    <>
      <IndexPageHeader />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default IndexPageLayout;
