import React, { useEffect, useRef, useState } from "react";
import { Flex, Input, Button, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { removeImage, uploadImage } from "@api/image";
import toast from "react-hot-toast";

const ImageUpload = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  const pickImage = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (image?.url) {
      setImageURL(image?.url);
    }
  }, [image?.url]);

  const handleImageChange = async (e) => {
    if (e.target?.files?.length === 0) {
      return null;
    }
    //if file is greater than 5 mb error
    if (e.target?.files[0]?.size > 5242880) {
      toast.error("Image size should be less than 5mb.");
      return;
    }

    setImage(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
    //upload image
    setLoading("upload-image");
    let response = await uploadImage(e.target.files[0]);
    setImage(response);
    setImageURL(response?.url);
    setLoading("");
  };

  const remove = async () => {
    setLoading("remove-image");
    await removeImage(image.public_id);
    setImage({
      url: "",
    });
    setImageURL("");
    setLoading("");
  };

  if (loading === "upload-image") {
    return (
      <Flex
        h="200px"
        w="200px"
        cursor="pointer"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        align="center"
        justify="center"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Flex
        h="200px"
        w="200px"
        cursor="pointer"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        align="center"
        justify="center"
        onClick={pickImage}
        bgImage={`url('${imageURL}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="contain"
      >
        {imageURL === "" && <AddIcon h="30px" w="30px" />}
      </Flex>

      <Input
        type="file"
        name="image"
        display="none"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/png, image/jpeg, image/jpg"
      />
      {image && (
        <Flex mt="2">
          {image.url && (
            <Button
              isLoading={loading === "remove-image"}
              colorScheme="red"
              size="xs"
              onClick={remove}
            >
              Remove
            </Button>
          )}
        </Flex>
      )}
    </>
  );
};

export default ImageUpload;
