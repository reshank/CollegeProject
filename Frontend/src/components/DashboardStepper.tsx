import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import router from "next/router";
import React, { useMemo } from "react";
import { getStepperIndex } from "utils/helpers";

const stepperDetails = [
  {
    title: "Your e-commerce store is ready!",
    detail: "Congratulations! Your e-commerce store is now live.",
    link: "/admin/dashboard",
    type: "Visit store",
  },
  {
    title: "Add your first category",
    detail: "Start adding categories to your online store now!",
    link: "/admin/category/create",
    type: "Add category",
  },
  {
    title: "Add your first product",
    detail: "Start adding products to your online store now!",
    link: "/admin/products/create",
    type: "Add product",
  },
  {
    title: "Fill up basic shop details",
    detail: "Fill up the shop details to get started.",
    link: "/admin/manage/shop-detail",
    type: "Add shop details",
  },
];

interface IProps {
  data: {
    products: number;
    categories: number;
    orders: number;
    totalRevenue: number;
    slug: string;
    location?: string;
  };
}

const StepperItem = ({
  title,
  detail,
  link,
  completed,
  type,
  active,
  index,
  disabled,
  slug,
}) => {
  return (
    <Flex align="center" my="5">
      <Flex
        align="center"
        justify="center"
        w="35px"
        h="35px"
        borderRadius="full"
        color={disabled ? "grey" : "primary.500"}
        fontSize="lg"
        fontWeight="bold"
        borderWidth="2px"
        borderColor={disabled ? "grey" : "primary.500"}
        bg={completed ? "primary.500" : "white"}
      >
        {completed ? <CheckIcon color="white" /> : index + 1}
      </Flex>
      <Flex flexDirection="column" ml="3">
        <Heading fontSize="md" fontWeight="semibold" color={disabled && "grey"}>
          {title}
        </Heading>
        <Text fontSize="sm" color="grey">
          {detail}
        </Text>

        {index === 0 && (
          <a href={`/${slug}/`} target="_blank">
            <Button
              size="sm"
              colorScheme="primary"
              mt="3"
              variant="outline"
              w="150px"
              onClick={() => router.push(link)}
            >
              {type}
            </Button>
          </a>
        )}

        {active && (
          <Button
            size="sm"
            colorScheme="primary"
            mt="3"
            variant="outline"
            w="150px"
            onClick={() => router.push(link)}
          >
            {type}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const DashboardStepper = ({ data }: IProps) => {
  const stepperIndex: number = useMemo(() => getStepperIndex(data), []);

  return (
    <Flex
      bg="white"
      shadow="md"
      p={5}
      flexDirection="column"
      borderRadius="lg"
      m={["3", "3", "5"]}
      maxW={["full", "full", "2xl"]}
      alignSelf="center"
    >
      <Heading fontSize="2xl" fontWeight="semibold">
        Finish your store setup...
      </Heading>
      <Text fontSize="md" color="grey" mt={3}>
        Sellers who add more than 25 products are likely to get more orders. Add
        all your products to your e-commerce store now.
      </Text>
      <Flex mt="5" flexDirection="column">
        {stepperDetails?.map((stepper, index) => (
          <StepperItem
            title={stepper.title}
            key={index}
            detail={stepper.detail}
            link={stepper.link}
            completed={stepperIndex > index}
            active={stepperIndex === index}
            type={stepper.type}
            index={index}
            disabled={stepperIndex < index}
            slug={data?.slug}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default DashboardStepper;
