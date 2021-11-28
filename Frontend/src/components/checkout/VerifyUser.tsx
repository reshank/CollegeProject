import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { sendOtp, verifyOtp } from "@api/otp";
import PhoneInput from "react-phone-input-2";

const VerifyUser = ({ setOpenIndex, openIndex, setUserData }) => {
  const [otpSent, setSentOtp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    getValues,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    if (otpSent) {
      let response = await verifyOtp(data);
      if (response.data.verified) {
        //verification success
        setUserData({
          mobile: getValues("mobile"),
          otp: getValues("otp"),
        });
        setOpenIndex(openIndex + 1);
      }
      setLoading(false);
      return null;
    }
    let response = await sendOtp(data);
    setSentOtp(response);
    setLoading(false);
  };

  const changeMobile = () => {
    setSentOtp(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    let response = await sendOtp({
      mobile: getValues("mobile"),
    });
    setSentOtp(response);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="5" w="full" p={[2, 2, 5]}>
        <Flex
          bg="white"
          w="full"
          borderRadius="lg"
          flexDirection="column"
          mt="5"
        >
          <FormControl id="mobile" isInvalid={formErrors?.mobile && true}>
            <FormLabel>Mobile Number *</FormLabel>

            <Controller
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country="np"
                  onlyCountries={["in", "np"]}
                  countryCodeEditable={false}
                  inputStyle={{
                    height: "50px",
                    paddingLeft: "60px",
                    width: "100%",
                    borderColor: formErrors?.mobile ? "red" : "#E2E8F0",
                    fontSize: "20px",
                    fontFamily: "Nunito",
                  }}
                  buttonStyle={{
                    borderColor: formErrors?.mobile ? "red" : "#E2E8F0",
                    backgroundColor: "white",
                    width: "50px",
                  }}
                  dropdownStyle={{
                    backgroundColor: "white",
                  }}
                  inputProps={{
                    disabled: otpSent,
                  }}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="mobile"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Mobile is a required field",
                },
                minLength: {
                  value: 11,
                  message: "Please enter a valid mobile number",
                },
                maxLength: {
                  value: 13,
                  message: "Please enter a valid mobile number",
                },
              }}
            />

            {otpSent && (
              <FormHelperText
                color="primary.500"
                cursor="pointer"
                fontSize="lg"
                onClick={changeMobile}
              >
                Change?
              </FormHelperText>
            )}

            <FormErrorMessage>{formErrors?.mobile?.message}</FormErrorMessage>
          </FormControl>
          {otpSent && (
            <>
              <FormControl
                id="otp"
                my="2"
                mr="3"
                isInvalid={formErrors?.otp && true}
              >
                <FormLabel>Enter OTP *</FormLabel>
                <InputGroup size="md">
                  <Input
                    type="number"
                    {...register("otp", {
                      required: "OTP is a required field",
                      minLength: {
                        value: 6,
                        message: "OTP must be 6 digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "OTP must be 6 digits",
                      },
                    })}
                    maxLength={6}
                    placeholder="Enter OTP"
                  />
                  <InputRightElement width="4.5rem" mr="1">
                    <Button
                      h="1.75rem"
                      size="sm"
                      colorScheme="primary"
                      isLoading={loading}
                      onClick={resendOtp}
                    >
                      Resend
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>{formErrors?.otp?.message}</FormErrorMessage>
              </FormControl>
              <Text fontSize="sm" color="gray.500">
                By continuing, you accept our terms and conditions.
              </Text>
            </>
          )}
        </Flex>
        <Button mt="5" colorScheme="primary" type="submit" isLoading={loading}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default VerifyUser;
