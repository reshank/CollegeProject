import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import { handleError } from "utils/errorHandler";
import { IShop } from "@interfaces/IShop";
import { handleSucess } from "utils/responseHandler";

const API_URL = process.env.API_URL;

export const registerShop = async (data: IShop) => {
  try {
    const { name, description, slug } = data;

    const sendData = {
      name,
      description,
      slug,
    };

    const response = await axios.post(
      `${API_URL}/shop/register`,
      JSON.stringify(sendData),
      apiConfig()
    );

    handleSucess(response.data);
    Router.push(`/admin/dashboard`);

    return null;
  } catch (err: any) {
    handleError(err);
  }
};

export const isAdmin = async () => {
  try {
    const result = await axios.get(`${API_URL}/shop/isAdmin`, apiConfig());

    if (result.data?.message) {
      toast.error(result.data.message);
    }

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const available = async (shop_name: string | string[]) => {
  try {
    const result = await axios.get(
      `${API_URL}/shop/available/${shop_name}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    Router.push("/");

    toast("Shop is not available or deleted.", {
      style: {
        color: "white",
        backgroundColor: "#FFA900",
      },
    });

    return false;
  }
};

export const getDashboardData = async () => {
  try {
    const result = await axios.get(
      `${API_URL}/shop/dashboardData`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const renewPlan = async ({ plan }: { plan: string }) => {
  const formData = {
    plan,
  };
  try {
    const result = await axios.patch(
      `${API_URL}/shop/renewPlan`,
      JSON.stringify(formData),
      apiConfig()
    );

    toast.success("Your subscription has been renewed successfully.");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const shopDetail = async () => {
  try {
    const result = await axios.get(`${API_URL}/shop/detail`, apiConfig());

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const update = async ({
  name,
  slug,
  location,
  image,
  description,
  facebook,
  instagram,
  supportEmail,
  delivery,
  mobile,
  whatsapp,
  opened,
}: {
  name?: string;
  slug?: string;
  location?: string;
  image?: any;
  description?: string;
  facebook?: string;
  instagram?: string;
  supportEmail?: string;
  delivery?: string;
  mobile?: string;
  whatsapp?: string;
  opened?: boolean;
}) => {
  const formData = {
    name,
    slug,
    location,
    image,
    description,
    facebook,
    instagram,
    supportEmail,
    delivery,
    mobile,
    whatsapp,
    opened,
  };
  try {
    const result = await axios.patch(
      `${API_URL}/shop/update`,
      JSON.stringify(formData),
      apiConfig()
    );

    toast.success("Your shop details have been updated successfully.");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};
