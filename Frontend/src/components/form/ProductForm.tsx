import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Switch,
  NumberInput,
  NumberInputField,
  Stack,
  Badge,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Heading,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { createProduct, productUpdate } from "@api/product";
import { createCategory, listAdminCategories } from "@api/category";
import CreatableSelect from "react-select/creatable";
//react quills import
import MultipleImageUpload from "@components/form/MultipleImageUpload";
import { ICategory } from "@interfaces/ICategory";
import Editor from "@components/form/Editor";
import { ImInfo } from "react-icons/im";
import { IProduct } from "@interfaces/IProduct";
import router from "next/router";

const ProductForm = ({ defaultValue = null }: { defaultValue?: IProduct }) => {
  const [loading, setLoading] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [refetchCategory, setRefetchCategory] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading("category");
      let data = await listAdminCategories({});
      setCategories(data?.categories || []);
      setLoading("");
    };
    getData();
  }, [refetchCategory]);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    control,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (defaultValue !== null) {
      reset({
        ...defaultValue,
        category: {
          label: defaultValue?.category?.name,
          value: defaultValue?.category?._id,
        },
      });
    }
  }, [defaultValue]);

  const onSubmit = async (data) => {
    setLoading("create");

    if (defaultValue !== null) {
      if (data.sizes?.length > 0) {
        await productUpdate({
          ...data,
          category: data.category?.value,
          price: data?.sizes[0].price,
          discountPrice: data?.sizes[0].discountPrice,
          productId: router.query.product_id,
        });
        setLoading("");
        return null;
      }

      await productUpdate({
        ...data,
        category: data.category?.value,
        productId: router.query.product_id,
      });
      setLoading("");
      return null;
    }

    if (data.sizes?.length > 0) {
      await createProduct({
        ...data,
        price: sizes[0].price,
        discountPrice: sizes[0].discountPrice,
        category: data.category?.value,
      });
      setLoading("");

      return null;
    }

    await createProduct({
      ...data,
      category: data.category?.value,
    });
    setLoading("");
  };

  const percentage = useMemo(() => {
    let price = watch("price");
    let discountPrice = watch("discountPrice");

    if (!discountPrice || discountPrice <= 0) {
      return 0;
    }

    return (((price - discountPrice) / price) * 100).toFixed(0);
  }, [watch("price"), watch("discountPrice")]);

  const options = useMemo(() => {
    let data = [];

    categories?.map((category) => {
      data.push({
        label: category.name,
        value: category._id,
      });
    });

    return data;
  }, [categories]);

  let sizes = watch("sizes") || [];

  const handleCreate = async (inputValue: any) => {
    setLoading("category");
    await createCategory({
      name: inputValue,
      image: null,
    });
    setRefetchCategory(!refetchCategory);
    setLoading("");
  };

  return (
    <>
      <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
        <Flex align="center" justify="center">
          <Stack maxW="5xl" w="full" spacing="5">
            <Stack
              bg="white"
              w="full"
              p={[2, 2, 5]}
              borderRadius="lg"
              spacing="7"
              boxShadow="base"
            >
              <Heading flex="1" fontSize="md" textAlign="left">
                Product information
              </Heading>
              <FormControl
                id="name"
                isInvalid={formErrors?.name && true}
                isRequired
              >
                <FormLabel>Product name </FormLabel>
                <Input
                  type="text"
                  {...register("name", {
                    required: "Product name is a required field",
                  })}
                  placeholder="Product name"
                />
                <FormErrorMessage>{formErrors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="category"
                isInvalid={formErrors?.category && true}
                isRequired
                zIndex="5"
              >
                <FormLabel>Category name </FormLabel>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <CreatableSelect
                      isClearable
                      placeholder="Select category"
                      isLoading={loading === "category"}
                      options={options}
                      value={value}
                      onChange={onChange}
                      onCreateOption={handleCreate}
                    />
                  )}
                  name="category"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Product category is a required field",
                    },
                  }}
                />

                <FormErrorMessage>
                  {formErrors?.category?.message}
                </FormErrorMessage>
              </FormControl>
              {sizes.length === 0 && (
                <Stack direction={["column", "column", "row"]} spacing="5">
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
                      <NumberInput w="full" min={0}>
                        <NumberInputField
                          pl="50px"
                          {...register("price", {
                            required: "Price is a required field",
                            max: {
                              value: 100000,
                              message: "Maximum value for the price is 100000",
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
                      <NumberInput w="full" min={0}>
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
              )}

              <FormControl
                id="description"
                isInvalid={formErrors?.description && true}
                isRequired
              >
                <FormLabel>Product description </FormLabel>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Editor value={value} onChange={onChange} />
                  )}
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: "Price description is a required field",
                    },
                    minLength: {
                      value: 20,
                      message:
                        "Product description should be at least 20 characters",
                    },
                  }}
                />
                <FormErrorMessage>
                  {formErrors?.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="bestSeller-product">
                  Make this best selling product ?{" "}
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        cursor="pointer"
                        as="span"
                        aria-label="If this is true, This will show on best selling section of
                      categories."
                        icon={<ImInfo />}
                        size="sm"
                        colorScheme="blue"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Tips!</PopoverHeader>
                      <PopoverBody>
                        If this is true, This will show on best selling section
                        of product.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      colorScheme="primary"
                      isChecked={value}
                      onChange={onChange}
                    />
                  )}
                  name="bestSelling"
                  control={control}
                />
              </FormControl>
              <FormControl id="status">
                <FormLabel htmlFor="available-stock">
                  Is the product available on stock ?{" "}
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        cursor="pointer"
                        as="span"
                        aria-label="Is the product available on stock ?"
                        icon={<ImInfo />}
                        size="sm"
                        colorScheme="blue"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Tips!</PopoverHeader>
                      <PopoverBody>
                        If this is false, Out of stock is shown on product
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      colorScheme="primary"
                      isChecked={value === "In stock"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange("In stock");
                          return null;
                        }
                        onChange("Out of stock");
                      }}
                    />
                  )}
                  name="status"
                  control={control}
                />
              </FormControl>
            </Stack>
            <Stack
              w="full"
              borderRadius="lg"
              bg="white"
              boxShadow="base"
              p={[2, 2, 5]}
              spacing="5"
            >
              <Heading flex="1" fontSize="md" textAlign="left">
                Product images (upto 5 images)
              </Heading>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <MultipleImageUpload images={value || []} setImages={onChange} />
                )}
                name="images"
                control={control}
              />
            </Stack>
            <Flex justify="flex-end">
              <Button
                colorScheme="primary"
                ml="2"
                my="2"
                type="submit"
                isLoading={loading === "create"}
                disabled={!isDirty}
              >
                {defaultValue !== null ? "Update" : "Add product"}
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

export default ProductForm;
