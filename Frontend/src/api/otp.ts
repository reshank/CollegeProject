import toast from "react-hot-toast";
import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import Router from "next/router";
import { handleError } from "utils/errorHandler";

const API_URL = process.env.API_URL;

export const sendOtp = async ({ mobile }: { mobile: string }) => {
  try {
    const formData = {
      mobile,
    };

    const result = await axios.post(
      `${API_URL}/otp/sendOtp`,
      JSON.stringify(formData),
      apiConfig()
    );

    return result.data?.isOtpSent;
  } catch (err: any) {
    handleError(err);
  }
};

export const registerOtp = async ({ mobile }: { mobile: string }) => {
  try {
    const formData = {
      mobile,
    };

    const result = await axios.post(
      `${API_URL}/otp/register`,
      JSON.stringify(formData),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const verifyRegister = async ({
  mobile,
  otp,
}: {
  mobile: string;
  otp: string;
}) => {
  try {
    const formData = {
      mobile,
      otp,
    };

    const result = await axios.post(
      `${API_URL}/otp/verifyRegister`,
      JSON.stringify(formData),
      apiConfig()
    );

    Router.push("/get-started");

    toast.success("User logged in successfully");

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const verifyOtp = async ({
  mobile,
  otp,
}: {
  mobile: string;
  otp: string;
}) => {
  try {
    let formData = {
      mobile,
      otp,
    };
    const result = await axios.post(
      `${API_URL}/otp/verifyOtp`,
      JSON.stringify(formData),
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
    return {
      isVerified: false,
    };
  }
};
