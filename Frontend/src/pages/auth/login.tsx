import React, { useState, } from "react";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import GoogleLogin from "react-google-login";
import { registerSocial } from "@api/auth";
import AuthLayout from "@layouts/auth";
import router from "next/router";

const Login = () => {
  const [loading, setLoading] = useState<string>("");

  const responseGoogle = async (response) => {
    setLoading("submit");
    await registerSocial({
      accessToken: response.accessToken,
      type: "google",
    });
    setLoading("");
  };

  const errorHandler = (response) => {
    alert(response.error);
  };

  return (
    <Flex
      minH="100vh"
      bg="whitesmoke"
      align="center"
      justify="center"
      flexDirection="column"
    >
      <Flex
        flexDirection="column"
        bg="white"
        maxW="lg"
        boxShadow="base"
        p="5"
        borderRadius="md"
        w="full"
      >
        <Stack spacing="10" w="full" p={["0", "0", "5"]} align="flex-start">
          <Heading fontSize="2xl">Log in to continue</Heading>
          <Stack direction="row" spacing="5" w="full">
            <GoogleLogin
              clientId="1023671018271-1dgn2aah1efbqir3t9ol9hsatd8qcpb6.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  w="full"
                  colorScheme="red"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled || loading === "submit"}
                  leftIcon={<FaGoogle />}
                  size="sm"
                >
                  Get started with google
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={errorHandler}
            />
          </Stack>
        </Stack>
      </Flex>
      <Flex mt="5">
        Don't have account?{" "}
        <Text
          color="primary.500"
          ml="5px"
          fontWeight="semibold"
          cursor="pointer"
          onClick={() => router.push("/auth/register")}
        >
          Register
        </Text>
      </Flex>
    </Flex>
  );
};

Login.layout = AuthLayout;

export default Login;
