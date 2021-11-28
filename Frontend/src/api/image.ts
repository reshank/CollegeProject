import toast from "react-hot-toast";
import { apiConfig } from "@constants/apiConfig";
import axios from "axios";
import { handleError } from "utils/errorHandler";

const API_URL = process.env.API_URL;

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const result = await axios.post(
      `${API_URL}/image/upload`,
      formData,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const removeImage = async (imageId: string) => {
  try {
    const result = await axios.delete(
      `${API_URL}/image/delete/${imageId}`,
      apiConfig()
    );

    return result.data;
  } catch (err: any) {
    handleError(err);
  }
};
