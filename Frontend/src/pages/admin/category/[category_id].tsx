import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  useDisclosure,
  Switch,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import {
  categoryDelete,
  categoryUpdate,
  categoryAdminDetail,
} from "@api/category";
import router from "next/router";
import Loading from "@components/Loading";
import ConfirmAlert from "@components/ConfirmAlert";
import ImageUpload from "@components/form/ImageUpload";
import AdminBackLayout from "@layouts/admin/adminWithBack";
import { ICategory } from "@interfaces/ICategory";
import { ImInfo } from "react-icons/im";

const DetailPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<ICategory>(null);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<string>("fetch");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isDirty },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    reset(category);
    setImage(category?.image);
  }, [category]);

  useEffect(() => {
    if (image?.url || image?.url === "") {
      setValue("image", image, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [image]);

  useEffect(() => {
    const getData = async () => {
      let data = await categoryAdminDetail({
        categoryId: router.query.category_id,
      });

      setCategory(data);
      setLoading("");
    };
    getData();
  }, [router.query.category_id]);

  const onSubmit = async (data: any) => {
    setLoading("update");
    let updatedData = await categoryUpdate({
      ...data,
      image,
      categoryId: router.query.category_id,
    });
    reset(updatedData);
    setLoading("");
  };

  const deleteConfirm = async () => {
    setLoading("delete");
    await categoryDelete(router.query.category_id);
    onClose();
    setLoading("");
    router.back();
  };

  if (loading === "fetch" || category === null) {
    return <Loading isFullPage={true} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="center" justify="center">
          <Flex
            bg="white"
            w="800px"
            p={[2, 2, 5]}
            borderRadius="lg"
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
                name="bestSelling"
                control={control}
              />
            </FormControl>
            <Flex ml="auto">
              <Button
                colorScheme="red"
                my="2"
                variant="outline"
                onClick={onOpen}
              >
                Delete
              </Button>
              <Button
                colorScheme="primary"
                ml="2"
                my="2"
                type="submit"
                isLoading={loading === "update"}
                disabled={!isDirty}
              >
                Update
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
      <ConfirmAlert
        title="Delete Product"
        description="Do you really want to delete this product from your store?"
        onConfirm={deleteConfirm}
        isOpen={isOpen}
        onClose={onClose}
        onCancel={onClose}
        isLoading={loading === "delete"}
      />
    </>
  );
};

DetailPage.layout = AdminBackLayout;

export default DetailPage;
