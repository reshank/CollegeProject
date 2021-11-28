import React, { useEffect, useRef, useState } from "react";
import { Flex, Input, Button, Spinner, SimpleGrid } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { removeImage, uploadImage } from "@api/image";
import toast from "react-hot-toast";

const MultipleImageUpload = ({ images, setImages }) => {
  const inputRef = useRef(null);
  const [imageURLs, setImageURLs] = useState<any[]>([]);
  const [loading, setLoading] = useState<string>("");

  const pickImage = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (images?.length > 0) {
      setImageURLs(images?.map((image) => image.url));
    }
  }, [images]);

  const handleImageChange = async (e) => {
    if (e.target?.files?.length === 0) {
      return null;
    }
    //if file is greater than 5 mb error
    if (e.target?.files[0]?.size > 5242880) {
      toast.error("Image size should be less than 5mb.");

      return;
    }
    //upload images
    setLoading("upload-image");
    console.log(images);
    let response = await uploadImage(e.target.files[0]);
    console.log(response);
    setImages([...images, response]);
    setImageURLs([...imageURLs, response.url]);
    setLoading("");
  };

  const remove = async (publicId, index) => {
    setLoading("remove-image");
    await removeImage(publicId);
    let data = [...images];
    data.splice(index, 1);
    setImages(data);
    let dataUrl = [...imageURLs];
    dataUrl.splice(index, 1);
    setImageURLs(dataUrl);
    setLoading("");
  };

  return (
    <SimpleGrid columns={[1, 1, 2, 5]} spacing="5">
      {images?.length >= 5 ? null : (
        <Flex direction="column">
          <Flex
            h="150px"
            w="150px"
            cursor={loading === "upload-image" ? "not-allowed" : "pointer"}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            align="center"
            justify="center"
            onClick={loading === "upload-image" ? null : pickImage}
          >
            {loading === "upload-image" ? (
              <Spinner />
            ) : (
              <AddIcon h="30px" w="30px" />
            )}
          </Flex>
          <Input
            type="file"
            name="image"
            display="none"
            ref={inputRef}
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </Flex>
      )}

      {images?.map((image, index) => (
        <Flex direction="column" key={index}>
          <Flex
            h="150px"
            w="150px"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            bgImage={`url('${imageURLs[index]}')`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="contain"
          ></Flex>
          {image && (
            <Flex mt="2">
              {image.url && (
                <Button
                  isLoading={loading === "remove-image"}
                  colorScheme="red"
                  size="xs"
                  onClick={() => remove(image.public_id, index)}
                >
                  Remove
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default MultipleImageUpload;
