import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Divider,
  ModalHeader,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import CartProductItem from "./productItem";
import useFetchCartProducts from "hooks/useFetchCartProducts";
import CheckoutButton from "@components/CheckoutButton";

const CartModal = ({ isOpen, onClose }) => {
  const products = useFetchCartProducts();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        h="100vh"
        mt="0px"
        position="absolute"
        top="0px"
        w="full"
        right="0px"
      >
        <ModalCloseButton />
        <ModalHeader>Shopping Bag</ModalHeader>
        <Divider colorScheme="gray" />
        <ModalBody p="0px" w="full">
          <Flex
            w="100%"
            h="calc(full - 130px)"
            flexDirection="column"
            align="center"
            bg="white"
            mb="82px"
          >
            {products?.length > 0 ? (
              products?.map((product) => (
                <CartProductItem data={product} key={product.id} />
              ))
            ) : (
              <Flex
                w="full"
                h="full"
                justify="center"
                flexDirection="column"
                align="center"
                pt="30vh"
              >
                <Icon as={FiShoppingBag} boxSize="8rem" />
                <Box size="md" fontWeight="medium" color="gray.900" mt={3}>
                  No products found
                </Box>
              </Flex>
            )}
          </Flex>
          {products?.length > 0 && <CheckoutButton />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
