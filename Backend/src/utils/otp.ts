import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendMessage = async ({
  mobile,
  message,
}: {
  mobile: string;
  message: string;
}) => {
  try {
    const formBody = {
      apiKey: process.env.TEXT_LOCAL_API_KEY,
      numbers: "917814309133",
      message,
      test: true,
    };

    const response = await axios.post(
      `https://api.txtlocal.com/send/`,
      encodeURI(JSON.stringify(formBody))
    );
    console.log(response.data);
  } catch (error) {
    throw new Error("OTP send error occurred");
  }
};
