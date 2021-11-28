import React, { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { formatNumber } from "utils/helpers";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  return (
    <Box py={{ base: 20, md: 10 }}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>
      </VStack>
      <Stack
        direction={["column", "column", "row"]}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="xl">
              Small Business
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="900">
                {formatNumber(49)}
              </Text>
              <Text fontSize="2xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                upto 10 products
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                upto 5 categories
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                upto 20 orders per month
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                notification system for orders
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                custom domain
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                order tracking system
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                24/7 live support from team
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                advance modification
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                whatsapp chat support
              </ListItem>
              <ListItem textDecoration="line-through">
                <ListIcon as={FaTimesCircle} color="red.500" />
                product query from client
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="primary" variant="outline">
                Get started
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue("teal.300", "teal.700")}
                px={3}
                py={1}
                color="white"
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="xl">
                Medium size business
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="900">
                  {formatNumber(499)}
                </Text>
                <Text fontSize="2xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  upto 50 products
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  upto 30 categories
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  upto 100 orders per month
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  notification system for orders
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  custom domain
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  order tracking system
                </ListItem>
                <ListItem textDecoration="line-through">
                  <ListIcon as={FaTimesCircle} color="red.500" />
                  24/7 live support from team
                </ListItem>
                <ListItem textDecoration="line-through">
                  <ListIcon as={FaTimesCircle} color="red.500" />
                  advance modification
                </ListItem>
                <ListItem textDecoration="line-through">
                  <ListIcon as={FaTimesCircle} color="red.500" />
                  whatsapp chat support
                </ListItem>
                <ListItem textDecoration="line-through">
                  <ListIcon as={FaTimesCircle} color="red.500" />
                  product query from client
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="primary">
                  Get started
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="xl">
              Enterprise
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="900">
                {formatNumber(999)}
              </Text>
              <Text fontSize="2xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                unlimited products
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                unlimited categories
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                unlimited orders
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                notification system for orders
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                custom domain
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                order tracking system
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                24/7 live support from team
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                advance modification
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                whatsapp chat support
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                product query from client
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="primary" variant="outline">
                Get started
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
