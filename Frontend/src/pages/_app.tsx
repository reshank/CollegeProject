import React from "react";
import "../styles/global.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import axios from "axios";
axios.defaults.withCredentials = true;

//css and fonts imports
import "@fontsource/nunito";
import "react-phone-input-2/lib/style.css";
import Theme from "../bootstrap/theme";

//N Progress bar
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//toaster imports
import { Toaster } from "react-hot-toast";
import ShopProvider from "context/shop/ShopProvider";

if (typeof window !== "undefined") {
  NProgress.configure({ showSpinner: true });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
}

const App = ({ Component, pageProps }) => {
  const Layout = Component.layout || (({ children }) => children);

  return (
    <ShopProvider>
      <ChakraProvider theme={Theme}>
        <CSSReset />
        <Layout>
          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </Layout>
      </ChakraProvider>
    </ShopProvider>
  );
};
export default App;
