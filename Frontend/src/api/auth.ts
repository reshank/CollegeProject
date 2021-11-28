import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import { handleError } from "utils/errorHandler";
const API_URL = process.env.API_URL;

export const loginUser = async ({
  accessToken,
  type,
}: {
  accessToken: string;
  type: string;
}) => {
  const formData = {
    accessToken,
    type,
  };
  try {
    await axios.post(
      `${API_URL}/users/login`,
      JSON.stringify(formData),
      apiConfig()
    );

    Router.push("/get-started");
    return null;
  } catch (err: any) {
    handleError(err);
  }
};

export const registerSocial = async ({
  accessToken,
  type,
}: {
  accessToken: string;
  type: string;
}) => {
  const formData = {
    accessToken,
    type,
  };

  try {
    const result = await axios.post(
      `${API_URL}/users/register`,
      JSON.stringify(formData),
      apiConfig()
    );

    Router.push("/get-started");

    toast.success("User has been registered successfully");

    return result.data;
  } catch (err: any) {
    handleError(err);
    return null;
  }
};

export const isUserLoggedIn = async (isAuthPage = false) => {
  try {
    let response = await axios.get(`${API_URL}/users/isLoggedIn`, apiConfig());

    return response.data;
  } catch (err: any) {
    //show the error only if this is not auth pages (register, login, forgetpassword)
    if (!isAuthPage) {
      Router.push("/auth/login");
      toast.error("You need to Login to access this page.");
    }
  }
};

export const logoutUser = async () => {
  try {
    //remove cookies
    await axios.get(`${API_URL}/users/logout`, apiConfig());

    toast.success("User has been logout successfully.");

    Router.push("/auth/login");

    return null;
  } catch (err: any) {
    handleError(err);
  }
};
