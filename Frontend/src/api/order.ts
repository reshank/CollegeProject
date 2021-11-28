import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import { IOrder } from "interfaces/IOrder";
import toast from "react-hot-toast";
import { handleError } from "utils/errorHandler";
import router from "next/router";

const API_URL = process.env.API_URL;

export const createOrder = async (formData: IOrder) => {
  try {
    await axios.post(
      `${API_URL}/order/create`,
      JSON.stringify(formData),
      apiConfig()
    );
    router.push(`/${router.query.shop_name}/success`);
    toast.success("Order has been created successfully");

    return null;
  } catch (err: any) {
    handleError(err);
  }
};

export const listOrders = async ({
  query,
  status,
  skip,
}: {
  query: string;
  status?: string | string[];
  skip: number;
}) => {
  try {
    const result = await axios.get(
      `${API_URL}/order/list?skip=${skip}&status=${status}&query=${query}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const orderDetails = async ({
  orderId,
}: {
  orderId: string | string[];
}) => {
  try {
    const result = await axios.get(
      `${API_URL}/order/detail/${orderId}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const trackOrder = async ({
  shop_name,
  orderId,
}: {
  shop_name: string | string[];
  orderId: string;
}) => {
  try {
    const formData = {
      shop_name,
      orderId,
    };

    const result = await axios.post(
      `${API_URL}/order/track/${orderId}`,
      JSON.stringify(formData),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const updateOrder = async ({
  orderId,
  status,
  message = "",
}: {
  orderId?: string;
  status?: string;
  message?: string;
}) => {
  try {
    let formData = {
      status,
      message,
    };

    const result = await axios.patch(
      `${API_URL}/order/update/${orderId}`,
      JSON.stringify(formData),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};
