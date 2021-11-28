import React, { useContext } from "react";
import {
  Flex,
  Box,
  useDisclosure,
  Heading,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import Search from "@components/common/search";
import { useRouter } from "next/router";
import SearchMobile from "@components/common/search/SearchMobile";
import CartModal from "@components/common/cart/modal";
import { FiShoppingBag } from "react-icons/fi";
import useFetchCartData from "@hooks/useFetchCartData";
import ShopContext from "context/shop/ShopContext";

const Header = ({ showSearch = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [quantity] = useFetchCartData();
  const { shop } = useContext(ShopContext);

  const openShopPage = () => {
    router.push(`/${router.query.shop_name}`);
  };

  const openTrackOrderPage = () => {
    router.push(`/${router.query.shop_name}/track-order`);
  };

  return (
    <>
      <Flex
        w="full"
        px={7}
        bg="white"
        boxShadow="base"
        position="fixed"
        top="0"
        zIndex="10"
        p="5"
        flexDirection="column"
      >
        <Stack
          w="full"
          direction="row"
          justify="space-between"
          align="center"
          spacing="5"
        >
          <Flex cursor="pointer" onClick={openShopPage} align="center">
            <Avatar
              name={shop.name}
              h="40px"
              w="40px"
              borderRadius="md"
              bg="primary.500"
              color="white"
            />
            <Heading fontSize="lg" ml="3" noOfLines={1} textOverflow="ellipsis">
              Coffee Shop
            </Heading>
          </Flex>
          <Search />
          <Flex align="center">
            <Flex
              mx={3}
              fontSize="16px"
              fontWeight="semibold"
              cursor="pointer"
              color="gray.600"
              _hover={{ color: "primary.500" }}
              onClick={onOpen}
              align="center"
              position="relative"
              display={["none", "none", "flex"]}
            >
              <FiShoppingBag size={25} style={{ marginRight: "10px" }} />
              {quantity > 0 && (
                <Box
                  position="absolute"
                  bg="red"
                  borderRadius="full"
                  top="-4px"
                  left="-4px"
                  align="center"
                  justify="center"
                  color="white"
                  fontSize="xs"
                  w="20px"
                  h="20px"
                >
                  {quantity}
                </Box>
              )}
              Bag
            </Flex>
          </Flex>
        </Stack>
        {showSearch && <SearchMobile />}
      </Flex>
      <CartModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
