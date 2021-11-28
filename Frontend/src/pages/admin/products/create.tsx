import ProductForm from "@components/form/ProductForm";
import AdminBackLayout from "@layouts/admin/adminWithBack";
import React from "react";

const create = () => {
  return <ProductForm />;
};

create.layout = AdminBackLayout;

export default create;
