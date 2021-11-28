import { categoryDelete, categoryUpdate } from "@api/category";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Image,
  Heading,
  Stack,
  Flex,
  Button,
  IconButton,
  Badge,
  Switch,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import ConfirmAlert from "@components/ConfirmAlert";
import { ICategory } from "@interfaces/ICategory";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CategoryItem = ({ data, Refresh }: { data: ICategory; Refresh: any }) => {
  const [loading, setLoading] = useState<string>("");
  const { _id, name, image, bestSelling } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const deleteConfirm = async () => {
    setLoading("delete");
    await categoryDelete(_id);
    onClose();
    setLoading("");
    Refresh();
  };

  const openDetailPage = () => {
    router.push(`/admin/category/${_id}`);
  };

  const changeBestSelling = async (e) => {
    setLoading("bestSeller");
    let bestSelling = false;
    if (e.target.checked) {
      bestSelling = true;
    }
    await categoryUpdate({
      ...data,
      bestSelling: bestSelling,
      categoryId: _id,
    });
    setLoading("");
    Refresh();
  };

  return (
    <>
      <Stack
        bg="white"
        shadow="base"
        p="3"
        borderRadius="md"
        _hover={{ boxShadow: "lg" }}
        spacing="5"
        w="full"
      >
        <Stack spacing="3" direction="row">
          <Image
            objectFit="contain"
            w="80px"
            h="80px"
            src={image?.url}
            alt="Category Image"
            fallbackSrc={`https://via.placeholder.com/150/EDEDED/CAC8CC?text=${name}`}
          />
          <Stack spacing="3">
            <Heading
              noOfLines={1}
              textOverflow="ellipsis"
              fontSize="md"
              fontWeight="semibold"
            >
              {name}
            </Heading>
            {bestSelling === true && (
              <Badge colorScheme="blue" w="fit-content">
                Best seller
              </Badge>
            )}
          </Stack>
        </Stack>
        <Flex
          w="full"
          justify="space-between"
          align="center"
          borderTopWidth="1px"
          borderTopColor="grey.500"
          pt="2"
        >
          <Flex direction="column">
            <Text fontSize="xs">Best seller</Text>
            <Switch
              defaultChecked={bestSelling}
              onChange={changeBestSelling}
              isDisabled={loading === "bestSeller"}
            />
          </Flex>
          <Stack ml="auto" direction="row" spacing="3">
            <IconButton
              variant="outline"
              size="sm"
              colorScheme="red"
              aria-label="Delete product"
              icon={<DeleteIcon />}
              onClick={onOpen}
            />
            <Button
              colorScheme="primary"
              size="sm"
              variant="outline"
              onClick={openDetailPage}
            >
              Details
            </Button>
          </Stack>
        </Flex>
      </Stack>
      {isOpen && (
        <ConfirmAlert
          title={`Delete ${name}`}
          description="Do you really want to delete this category from your store?"
          isOpen={isOpen}
          onClose={onClose}
          onCancel={onClose}
          onConfirm={deleteConfirm}
          isLoading={loading === "delete"}
        />
      )}
    </>
  );
};

export default CategoryItem;
