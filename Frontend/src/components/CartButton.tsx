import React, { useMemo, useState } from "react";
import {
  IconButton,
  Flex,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import useFetchProductQuantity from "hooks/useFetchProductQuantity";
import { IProduct } from "@interfaces/IProduct";
import { formatNumber } from "utils/helpers";
import { useContext } from "react";
import CartContext from "context/cart/CartContext";

type Props = {
  minW?: string;
  maxW?: string;
  data: IProduct;
  size?: string;
};

const CartButton = ({ minW, maxW, data, size = "sm" }: Props) => {
  const quantity = useFetchProductQuantity(data?.id);
  const {
    isOpen: isSizeModalOpen,
    onOpen: onSizeModalOpen,
    onClose: onSizeModalClose,
  } = useDisclosure();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const { addToCart, increaseCartQty, decreaseCartQty, removeItem } =
    useContext(CartContext);

  const increaseCartQtyHandler = () => {
    increaseCartQty(data?.id);
  };

  const decreaseCartQtyHandler = () => {
    if (quantity === 1) {
      removeItem(data?.id);
    } else {
      decreaseCartQty(data?.id);
    }
  };

  const isMultipleSizes = useMemo(() => {
    let isMultiple = false;

    if (data?.sizes?.length > 0) {
      isMultiple = true;
    }

    return isMultiple;
  }, [data]);

  const addToCartHandler = () => {
    if (isMultipleSizes) {
      onSizeModalOpen();
      return null;
    }

    let product = {
      id: data?.id,
      name: data?.name,
      price: data?.price,
      discountPrice:
        data?.discountPrice > 0 ? data?.discountPrice : data?.price,
      image: data?.images[0],
      quantity: 1,
    };

    addToCart(product);
  };

  const addToCartMultipleHandler = () => {
    let product = {
      id: data?.id,
      name: data?.name,
      price: data?.sizes[selectedSizeIndex].price,
      discountPrice:
        data?.sizes[selectedSizeIndex].discountPrice > 0
          ? data?.sizes[selectedSizeIndex].discountPrice
          : data?.sizes[selectedSizeIndex].price,
      image: data?.images[0],
      quantity: 1,
      size: data?.sizes[selectedSizeIndex].name,
      sizeId: data?.sizes[selectedSizeIndex].id,
    };

    addToCart(product);
    onSizeModalClose();
  };

  if (data?.status === "Out of stock") {
    return (
      <Flex mt="3" w="full">
        <Button
          disabled={true}
          colorScheme="red"
          variant="solid"
          borderRadius="md"
          p="10px"
          w="100%"
          maxW={maxW}
          minW={minW}
          size={size === "xs" ? "sm" : "md"}
        >
          Out of stock
        </Button>
      </Flex>
    );
  }

  if (quantity > 0) {
    return (
      <Flex
        mt="3"
        justify="space-between"
        align="center"
        borderRadius="md"
        bg="primary.500"
        color="white"
        p="4px"
        maxW={maxW}
        minW={minW}
        zIndex={0}
      >
        <IconButton
          aria-label="Search database"
          icon={<AiOutlineMinus />}
          borderRadius="md"
          bg="white"
          color="primary.500"
          size={size}
          onClick={decreaseCartQtyHandler}
          cursor="pointer"
        />
        <Heading fontSize="md">{quantity}</Heading>
        <IconButton
          aria-label="Search database"
          icon={<AiOutlinePlus />}
          borderRadius="md"
          bg="white"
          color="primary.500"
          size={size}
          cursor="pointer"
          onClick={increaseCartQtyHandler}
        />
      </Flex>
    );
  }

  return (
    <>
      <Flex mt="3" w="full">
        <Button
          colorScheme="primary"
          variant="solid"
          borderRadius="md"
          p="10px"
          w="100%"
          maxW={maxW}
          minW={minW}
          onClick={addToCartHandler}
          size={size === "xs" ? "sm" : "md"}
        >
          Add to bag
        </Button>
      </Flex>
      {isMultipleSizes && isSizeModalOpen && (
        <Modal isOpen={isSizeModalOpen} onClose={onSizeModalClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select options</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RadioGroup
                value={selectedSizeIndex}
                onChange={(value) => setSelectedSizeIndex(Number(value))}
              >
                <Stack spacing="3">
                  {data?.sizes?.map((size, index) => (
                    <Flex
                      key={index}
                      w="full"
                      justify="space-between"
                      align="center"
                    >
                      <Radio colorScheme="primary" value={index}>
                        {size.name}
                      </Radio>
                      {size?.discountPrice > 0 ? (
                        <Heading fontSize="sm" fontWeight="bold" mt="2">
                          {formatNumber(size?.discountPrice)}{" "}
                          <Text
                            as="span"
                            color="grey"
                            fontSize="sm"
                            textDecoration="line-through"
                          >
                            {formatNumber(size?.price)}
                          </Text>
                        </Heading>
                      ) : (
                        <Heading fontSize="sm" fontWeight="bold" mt="2">
                          {formatNumber(size?.price)}
                        </Heading>
                      )}
                    </Flex>
                  ))}
                </Stack>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="primary" onClick={addToCartMultipleHandler}>
                Add to bag
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CartButton;
