import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { registerShop } from "@api/shop";
import GetStartedLayout from "@layouts/auth/getStarted";
import Loading from "@components/Loading";

const GetStarted = () => {
  const [loading, setLoading] = useState<string>("");
  const {
    handleSubmit,
    formState: { errors: formErrors },
    register,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading("submit");
    await registerShop(data);
  };

  if (loading === "submit") {
    return <Loading shopCreate={true} />;
  }

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
          <Heading fontSize="2xl">Get started by registering shop.</Heading>
          <Stack w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="5">
                <FormControl
                  id="name"
                  isRequired
                  isInvalid={formErrors?.name && true}
                >
                  <FormLabel>Shop Name</FormLabel>
                  <Input
                    type="text"
                    {...register("name", {
                      required: "Shop Name is a required field",
                    })}
                    placeholder="Enter Shop name"
                  />
                  <FormHelperText>
                    Name of your business that customers will visit.
                  </FormHelperText>
                  <FormErrorMessage>
                    {formErrors?.name?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="description"
                  isInvalid={formErrors?.description && true}
                >
                  <FormLabel>Shop Description</FormLabel>
                  <Textarea
                    type="text"
                    minH="100px"
                    {...register("description")}
                    placeholder="description of your shop (Optional)"
                  />
                  <FormHelperText>
                    Short description of your business. What you do?
                  </FormHelperText>
                </FormControl>
                <FormControl
                  id="slug"
                  isRequired
                  isInvalid={formErrors?.slug && true}
                >
                  <FormLabel>Shop URL</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      px="2"
                      bg="white"
                      children="https://qselly.vercel.app/"
                    />
                    <Input
                      type="text"
                      {...register("slug", {
                        required: "Shop slug is a required field",
                      })}
                      placeholder="Unique url for shop"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {formErrors?.slug?.message}
                  </FormErrorMessage>
                  <FormHelperText>
                    This should be unique for your shop
                  </FormHelperText>
                </FormControl>
                <Button w="full" colorScheme="primary" size="lg" type="submit">
                  Register your shop
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

GetStarted.layout = GetStartedLayout;

export default GetStarted;
