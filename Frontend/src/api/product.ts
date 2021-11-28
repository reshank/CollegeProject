import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";
import { handleError } from "utils/errorHandler";

const API_URL = process.env.API_URL;

export const createProduct = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/product/create`,
      JSON.stringify(data),
      apiConfig()
    );

    toast.success("Product has been created successfully");

    Router.back();

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const productDetail = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/product/detail/${data.product_id}`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);

    Router.replace("/404");
    return null;
  }
};

export const productAdminDetail = async ({
  productId,
}: {
  productId: string | string[];
}) => {
  try {
    const result = await axios.get(
      `${API_URL}/product/detail/${productId}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const productUpdate = async (data) => {
  try {
    const result = await axios.patch(
      `${API_URL}/product/update/${data.productId}`,
      JSON.stringify(data),
      apiConfig()
    );

    toast.success("Product has been updated successfully");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const productDelete = async (product_id) => {
  try {
    const result = await axios.delete(
      `${API_URL}/product/delete/${product_id}`,
      apiConfig()
    );
    toast.success("Product has been deleted successfully");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const listBestSellerProducts = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/product/bestSeller`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data?.products;
  } catch (err: any) {
    handleError(err);
  }
};

export const listRecentProducts = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/product/recent`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data?.products;
  } catch (err: any) {
    handleError(err);
  }
};

export const listAdminProducts = async ({
  skip,
  query,
}: {
  skip: number;
  query: string;
}) => {
  try {
    const result = await axios.get(
      `${API_URL}/product/list?skip=${skip}&query=${query}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const searchProducts = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/product/search`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};
