import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import { handleError } from "utils/errorHandler";

const API_URL = process.env.API_URL;

export const createCategory = async ({
  name,
  image,
  bestSeller = false,
}: {
  name: string;
  image?: string;
  bestSeller?: boolean;
}) => {
  try {
    const formData = {
      name,
      image,
      bestSeller,
    };

    const result = await axios.post(
      `${API_URL}/category/create`,
      JSON.stringify(formData),
      apiConfig()
    );

    toast.success("Category has been created successfully");
    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const listCategories = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/category/list`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data?.categories;
  } catch (err: any) {
    handleError(err);
  }
};

export const listAdminCategories = async ({
  skip = 0,
  query = "",
}: {
  skip?: number;
  query?: string;
}) => {
  try {
    const result = await axios.get(
      `${API_URL}/category/list?skip=${skip}&query=${query}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const categoryDetail = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/category/detail/${data.category_id}`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const categoryAdminDetail = async ({
  categoryId,
}: {
  categoryId: string | string[];
}) => {
  try {
    const result = await axios.get(
      `${API_URL}/category/detail/${categoryId}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const categoryDelete = async (categoryId) => {
  try {
    const result = await axios.delete(
      `${API_URL}/category/delete/${categoryId}`,
      apiConfig()
    );

    toast.success("Category has been deleted successfully");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const categoryUpdate = async (data) => {
  try {
    const result = await axios.put(
      `${API_URL}/category/update/${data.categoryId}`,
      JSON.stringify(data),
      apiConfig()
    );

    toast.success("Category has been updated successfully");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const listBestSellerCategory = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/category/bestSeller`,
      JSON.stringify(data),
      apiConfig()
    );

    return result.data?.categories;
  } catch (err: any) {
    handleError(err);
  }
};
