import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Switch,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  IconButton,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { createCategory } from "@api/category";
import ImageUpload from "@components/form/ImageUpload";
import { IImage } from "@interfaces/IProduct";
import AdminBackLayout from "@layouts/admin/adminWithBack";
import { ImInfo } from "react-icons/im";

const CreateCategory = () => {
  const [image, setImage] = useState<IImage>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (image?.url) {
      setValue("image", image, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [image]);

  const onSubmit = async (data) => {
    setLoading(true);
    await createCategory({
      ...data,
      image,
    });
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="center" justify="center">
          <Flex
            bg="white"
            w="800px"
            p="5"
            borderRadius="10px"
            flexDirection="column"
          >
            <FormControl id="image" my="2">
              <FormLabel>Category image </FormLabel>
              <ImageUpload image={image} setImage={setImage} />
            </FormControl>
            <FormControl
              id="name"
              my="2"
              isInvalid={formErrors?.name && true}
              isRequired
            >
              <FormLabel>Category name </FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: "Category name is a required field",
                })}
                placeholder="Category name"
              />
              <FormErrorMessage>{formErrors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt="5">
              <FormLabel htmlFor="bestSeller-product">
                Make this best selling category ?{" "}
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
                      If this is true, This will show on best selling section of
                      categories.
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
                name="bestSeller"
                control={control}
              />
            </FormControl>

            <Button
              isLoading={loading}
              colorScheme="primary"
              ml="auto"
              my="2"
              type="submit"
            >
              Add category
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

CreateCategory.layout = AdminBackLayout;

export default CreateCategory;
