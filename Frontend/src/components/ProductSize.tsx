import {
  Badge,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ISize } from "@interfaces/IProduct";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const ProductSize = ({ sizes = [], setSizes }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedSize, setSelectedSize] = useState<ISize>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const removeSize = (index) => {
    let updated = [...sizes];
    updated.splice(index, 1);
    setSizes(updated);
  };

  const editSize = (index) => {
    setSelectedIndex(index);
    setSelectedSize(sizes[index]);
    onOpen();
  };

  const percentage = useMemo(() => {
    let price = watch("price");
    let discountPrice = watch("discountPrice");
    if (discountPrice <= 0) {
      return 0;
    }
    return (((price - discountPrice) / price) * 100).toFixed(0);
  }, [watch("price"), watch("discountPrice")]);

  const onSubmit = async (data) => {
    if (selectedIndex >= 0) {
      let updated = [...sizes];

      updated[selectedIndex] = {
        name: data.name,
        price: data.price,
        discountPrice: data.discountPrice,
      };

      setSizes(updated);
      onClose();
      setSelectedIndex(-1);
      setSelectedSize(null);
      reset();

      return null;
    }

    let newData = [...sizes];

    newData = [
      ...newData,
      {
        id: uuidv4(),
        name: data?.name,
        price: data?.price,
        discountPrice: data?.discountPrice,
      },
    ];

    setSizes(newData);
    onClose();
    reset();
  };

  const SizeForm = ({ data, index }) => {
    return (
      <>
        <Stack spacing="5" w="full" direction={["column", "column", "row"]}>
          <FormControl>
            <FormLabel>Size name</FormLabel>
            <Input type="text" defaultValue={data?.name} isDisabled />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input type="text" defaultValue={data?.price} isDisabled />
          </FormControl>
          <FormControl>
            <FormLabel>Discount price</FormLabel>
            <Input type="text" defaultValue={data?.discountPrice} isDisabled />
          </FormControl>
        </Stack>
        <Stack alignSelf="flex-end" spacing="3" direction="row">
          <Button
            size="sm"
            colorScheme="blue"
            w="fit-content"
            onClick={() => editSize(index)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            w="fit-content"
            onClick={() => removeSize(index)}
          >
            Remove
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Stack spacing="5" align="center" justify="center" w="full" h="full">
        {sizes?.map((size, index) => (
          <SizeForm key={index} index={index} data={size} />
        ))}
        <Button
          variant="outline"
          size="sm"
          colorScheme="primary"
          onClick={onOpen}
          w="fit-content"
        >
          Add another
        </Button>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Size detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="5" w="full">
              <FormControl isRequired>
                <FormLabel>Size name</FormLabel>
                <Input
                  type="text"
                  placeholder="size name (xl, large, medium)"
                  {...register("name", {
                    required: "Price is a required field",
                  })}
                  defaultValue={selectedSize?.name || ""}
                />
              </FormControl>
              <FormControl
                id="price"
                isInvalid={formErrors?.price && true}
                isRequired
              >
                <FormLabel>Product price </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="grey"
                    fontSize="md"
                    children="Rs"
                  />
                  <NumberInput
                    w="full"
                    min={0}
                    defaultValue={selectedSize?.price || 0}
                  >
                    <NumberInputField
                      pl="50px"
                      {...register("price", {
                        required: "Price is a required field",
                        max: {
                          value: 100000,
                          message: "Maximum value for the price is 100000",
                        },
                        min: {
                          value: 1,
                          message:
                            "Price should be atleast more than 1 ruppee.",
                        },
                      })}
                      placeholder="Product price"
                    />
                  </NumberInput>
                </InputGroup>
                <FormErrorMessage>
                  {formErrors?.price?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="discountPrice"
                isInvalid={formErrors?.discountPrice && true}
              >
                <FormLabel>
                  Discount price
                  {percentage > 0 && (
                    <Badge ml="5" colorScheme="green">
                      {percentage} % off
                    </Badge>
                  )}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="grey"
                    fontSize="md"
                    children="Rs"
                  />
                  <NumberInput
                    w="full"
                    min={0}
                    defaultValue={selectedSize?.discountPrice || 0}
                  >
                    <NumberInputField
                      pl="50px"
                      {...register("discountPrice", {
                        max: {
                          value: watch("price"),
                          message: "Discount price must be less than price",
                        },
                      })}
                      placeholder="Discount price (optional)"
                    />
                  </NumberInput>
                </InputGroup>
                <FormErrorMessage>
                  {formErrors?.discountPrice?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="primary"
              onClick={() => handleSubmit(onSubmit)()}
              form="size-form"
            >
              {selectedIndex >= 0 ? "Update" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductSize;
