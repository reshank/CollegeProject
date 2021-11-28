import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";

function Redirect({ to }) {
  const Router = useRouter();

  useEffect(() => {
    Router.push(to).then();
  }, [to]);

  return <Loading isFullPage={true} />;
}

export default Redirect;
