import React, { useMemo, useState } from "react";
import {
  Flex,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  Switch,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { IProduct } from "@interfaces/IProduct";
import router from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatNumber, getColorByStatus } from "utils/helpers";
import ConfirmAlert from "@components/ConfirmAlert";
import { productDelete, productUpdate } from "@api/product";

const ProductItem = ({ data, Refresh }: { data: IProduct; Refresh: any }) => {
  const [loading, setLoading] = useState<string>("");
  const {
    _id,
    name,
    price,
    status,
    category,
    images,
    bestSelling,
    discountPrice,
  } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openDetailPage = () => {
    router.push(`/admin/products/${_id}`);
  };

  const isChecked = useMemo(() => {
    if (status === "In stock") {
      return true;
    }

    return false;
  }, [status]);

  const deleteConfirm = async () => {
    setLoading("delete");
    await productDelete(_id);
    onClose();
    setLoading("");
    Refresh();
  };

  const changeStatus = async (e) => {
    setLoading("status");
    let updatedStatus = "Out of stock";
    if (e.target.checked) {
      updatedStatus = "In stock";
    }
    await productUpdate({
      ...data,
      status: updatedStatus,
      productId: _id,
      category: data?.category?._id,
    });
    setLoading("");
    Refresh();
  };

  const changeBestSelling = async (e) => {
    setLoading("bestSeller");
    await productUpdate({
      ...data,
      bestSelling: e.target.checked,
      productId: _id,
      category: data?.category?._id,
    });
    setLoading("");
    Refresh();
  };

  return (
    <>
      <Flex
        bg="white"
        shadow="base"
        p={4}
        borderRadius="md"
        _hover={{ boxShadow: "lg" }}
        direction="column"
      >
        <Flex mb="2">
          <Image
            h="100px"
            w="100px"
            objectFit="contain"
            src={images[0]?.url}
            alt="Product image"
            fallbackSrc={`https://via.placeholder.com/100/EDEDED/CAC8CC?text=${name}`}
          />
          <Flex pl="2" flexDirection="column">
            <Heading
              fontSize="md"
              fontWeight="semibold"
              noOfLines={1}
              textOverflow="ellipsis"
            >
              {name}
            </Heading>
            <Text fontSize="sm">{category?.name}</Text>
            {discountPrice > 0 ? (
              <Heading fontSize="md" fontWeight="bold" mt="2">
                {formatNumber(discountPrice)}{" "}
                <Text
                  as="span"
                  color="grey"
                  fontSize="xs"
                  textDecoration="line-through"
                >
                  {formatNumber(price)}
                </Text>
              </Heading>
            ) : (
              <Heading fontSize="md" fontWeight="bold" mt="2">
                {formatNumber(price)}
              </Heading>
            )}

            <Stack spacing="3" direction="row" mt="3">
              <Badge colorScheme={getColorByStatus(status)} w="fit-content">
                {status}
              </Badge>
              {bestSelling === true && (
                <Badge colorScheme="blue" w="fit-content">
                  Best selling
                </Badge>
              )}
            </Stack>
          </Flex>
        </Flex>
        <Flex
          w="full"
          justify="space-between"
          align="center"
          borderTopWidth="1px"
          borderTopColor="grey.500"
          pt="4"
        >
          <Stack spacing="3" direction="row">
            <Flex direction="column">
              <Text fontSize="xs">Stock</Text>
              <Switch
                defaultChecked={isChecked}
                colorScheme="primary"
                onChange={changeStatus}
                isDisabled={loading === "status"}
              />
            </Flex>
            <Flex direction="column">
              <Text fontSize="xs">Best seller</Text>
              <Switch
                defaultChecked={bestSelling}
                onChange={changeBestSelling}
                isDisabled={loading === "bestSeller"}
              />
            </Flex>
          </Stack>

          <Stack direction="row" spacing="3">
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
      </Flex>
      {isOpen && (
        <ConfirmAlert
          title={`Delete ${name}`}
          description="Do you really want to delete this product from your store?"
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

export default ProductItem;
