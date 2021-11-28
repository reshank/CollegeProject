import axios from "axios";

const accessConfig = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getDataFromAuthProviders = async ({
  token,
  type,
}: {
  token: string;
  type: string;
}) => {
  if (type === "google") {
    return await getDataFromGoogle(token);
  }
};

export const getDataFromGoogle = async (accessToken: string) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/userinfo/v2/me",
      accessConfig(accessToken)
    );

    const { name, email } = response.data;

    return {
      name,
      email,
    };
  } catch (error) {
    return null;
  }
};
