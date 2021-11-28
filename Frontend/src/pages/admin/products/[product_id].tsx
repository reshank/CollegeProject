import React, { useEffect, useState } from "react";
import { productAdminDetail } from "@api/product";
import { useRouter } from "next/router";
import Loading from "@components/Loading";
import AdminBackLayout from "@layouts/admin/adminWithBack";
import { IProduct } from "@interfaces/IProduct";
import ProductForm from "@components/form/ProductForm";

const DetailPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct>(null);
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      setLoading("fetch-product");
      let data = await productAdminDetail({
        productId: router.query.product_id,
      });
      setProduct(data);
      setLoading("");
    };
    getData();
  }, [router.query.product_id]);

  if (loading === "fetch-product" || product === null) {
    return <Loading isFullPage={true} />;
  }

  return (
    <>
      <ProductForm defaultValue={product} />
    </>
  );
};

DetailPage.layout = AdminBackLayout;

export default DetailPage;
