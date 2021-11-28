import { ReactElement, useContext } from "react";
import { Box, SimpleGrid, Icon, Text, Flex, Heading } from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import ShopContext from "context/shop/ShopContext";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Flex p="5">
      <Flex
        w={10}
        h={10}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Flex flexDirection="column" ml="5">
        <Heading fontSize="lg">{title}</Heading>
        <Text
          color={"gray.600"}
          fontSize="md"
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};

const Features = () => {
  const { shop } = useContext(ShopContext);

  return (
    <Box w="full" p={4} mt={5} bg="white" borderRadius="md">
      <SimpleGrid columns={[1, 1, 3, 3]} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={5} h={5} />}
          title={"Customer Support"}
          text={shop?.otherData?.supportEmail || "-"}
        />
        <Feature
          icon={<Icon as={FcDonate} w={5} h={5} />}
          title={"Payment Options"}
          text={"Cash on Delivery"}
        />
        <Feature
          icon={<Icon as={FcInTransit} w={5} h={5} />}
          title={"Free Delivery"}
          text={"Delivery happens within " + shop?.otherData?.delivery || "-"}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Features;
