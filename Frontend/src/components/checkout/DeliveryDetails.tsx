import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const DeliveryDetails = ({ openIndex, setOpenIndex, setDeliveryDetails }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = (data) => {
    setDeliveryDetails(data);
    setOpenIndex(openIndex + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center" w="full" direction="column">
        <Stack
          bg="white"
          w="full"
          p={[2, 2, 5]}
          borderRadius="10px"
          flexDirection="column"
          mt="5"
          spacing="5"
        >
          <FormControl
            id="name"
            isInvalid={formErrors?.name && true}
            isRequired
          >
            <FormLabel>Full name </FormLabel>
            <Input
              type="text"
              {...register("name", {
                required: "Full Name is a required field",
              })}
              placeholder="Full name"
            />
            <FormErrorMessage>{formErrors?.name?.message}</FormErrorMessage>
          </FormControl>
          <Stack direction={["column", "column", "row"]} spacing="5">
            <FormControl
              id="city"
              isInvalid={formErrors?.city && true}
              isRequired
            >
              <FormLabel>City </FormLabel>
              <Input
                type="text"
                {...register("city", {
                  required: "City is a required field",
                })}
                placeholder="City"
              />
              <FormErrorMessage>{formErrors?.city?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="state"
              isInvalid={formErrors?.state && true}
              isRequired
            >
              <FormLabel>State/Province </FormLabel>
              <Input
                type="text"
                {...register("state", {
                  required: "State is a required field",
                })}
                placeholder="State/Province"
              />
              <FormErrorMessage>{formErrors?.state?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <FormControl
            id="fullAddress"
            isInvalid={formErrors?.fullAddress && true}
            isRequired
          >
            <FormLabel>Full address </FormLabel>
            <Textarea
              placeholder="Full Address"
              {...register("fullAddress", {
                required: "Full Address is a required field",
                minLength: {
                  value: 10,
                  message: "Please enter full  address",
                },
              })}
            />
            <FormErrorMessage>
              {formErrors?.fullAddress?.message}
            </FormErrorMessage>
          </FormControl>
          <Button colorScheme="primary" my="5" type="submit" w="full">
            Proceed
          </Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default DeliveryDetails;
