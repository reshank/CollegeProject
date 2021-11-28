import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Flex,
  FormControl,
  Stack,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  NumberInputField,
  NumberInput,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import {
  createConfig,
  deleteConfigById,
  getAdminConfigById,
  updateConfigById,
} from "@api/config";
import Loading from "./Loading";

const ChargeFormModal = ({ isOpen, onClose, detailId, refresh }) => {
  const [loading, setLoading] = useState<string>("");
  const [chargeDetail, setChargeDetail] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    reset,
    control,
    watch,
  } = useForm();

  useEffect(() => {
    reset({ ...chargeDetail });
  }, [chargeDetail]);

  useEffect(() => {
    if (detailId && detailId !== "") {
      const getData = async () => {
        setLoading("fetch");
        let response = await getAdminConfigById({
          configId: detailId,
        });
        setChargeDetail(response);
        setLoading("");
      };
      getData();
    } else {
      setChargeDetail(null);
    }
  }, [detailId]);

  const onSubmit = async (data) => {
    setLoading("submit");
    if (detailId && detailId !== "") {
      await updateConfigById({
        configId: detailId,
        updatedValue: {
          ...chargeDetail,
          ...data,
        },
      });
      setLoading("");
      refresh();
      onClose();
      return null;
    }
    await createConfig({
      key: "extraCharge",
      value: {
        type: data.type,
        name: data.name,
        percent: data.percent || "",
        amount: data.amount || "",
        show: true,
      },
    });
    setLoading("");
    refresh();
    onClose();
  };

  const onDelete = async () => {
    setLoading("delete");
    await deleteConfigById({ configId: detailId });
    setLoading("");
    refresh();
    onClose();
  };

  if (loading === "fetch") {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
        <ModalOverlay />
        <ModalContent>
          <Flex minH="200px" align="center">
            <Loading />
          </Flex>
        </ModalContent>
      </Modal>
    );
  }

  let type = watch("type");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Extra Charges</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <FormLabel>Charge type</FormLabel>

              <Controller
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    value={value}
                    onChange={onChange}
                    spacing="3"
                    colorScheme="primary"
                  >
                    <Stack direction="row" mb="5">
                      <Radio value="percent">Percent</Radio>
                      <Radio value="fixed">Fixed</Radio>
                    </Stack>
                  </RadioGroup>
                )}
                name="type"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Charge type is a required field",
                  },
                }}
              />

              <Flex flexDirection={["column", "column", "row"]}>
                <FormControl
                  id="name"
                  isInvalid={formErrors?.name && true}
                  isRequired
                >
                  <FormLabel>Charge name</FormLabel>
                  <Input
                    {...register("name", {
                      required: "Charge name is a required field",
                    })}
                    type="text"
                    placeholder="Enter the charge name"
                  />
                  <FormErrorMessage>
                    {formErrors?.name?.message}
                  </FormErrorMessage>
                </FormControl>

                {type === "percent" ? (
                  <FormControl
                    id="percent"
                    ml={[0, 0, 3]}
                    isInvalid={formErrors?.percent && true}
                    isRequired
                  >
                    <FormLabel>Charge percent</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="black"
                        fontSize="sm"
                        children="%"
                      />
                      <NumberInput defaultValue={10} min={0} max={100}>
                        <NumberInputField
                          pl="50px"
                          {...register("percent", {
                            required: "Charge percent is a required field",
                          })}
                        />
                      </NumberInput>
                    </InputGroup>
                    <FormErrorMessage>
                      {formErrors?.percent?.message}
                    </FormErrorMessage>
                  </FormControl>
                ) : (
                  <FormControl
                    id="amount"
                    ml={[0, 0, 3]}
                    isInvalid={formErrors?.value && true}
                    isRequired
                  >
                    <FormLabel>Charge amount</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="black"
                        fontSize="sm"
                        children="Rs"
                      />
                      <NumberInput defaultValue={15} min={0}>
                        <NumberInputField
                          pl="50px"
                          {...register("amount", {
                            required: "Charge amount is a required field",
                          })}
                        />
                      </NumberInput>
                    </InputGroup>
                    <FormErrorMessage>
                      {formErrors?.amount?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {detailId && detailId !== "" && (
              <Button
                colorScheme="red"
                variant="outline"
                mr="2"
                isLoading={loading === "delete"}
                onClick={onDelete}
              >
                Delete
              </Button>
            )}

            <Button
              colorScheme="primary"
              type="submit"
              isLoading={loading === "submit"}
              disabled={!isDirty}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ChargeFormModal;
