import React, { useContext } from "react";
import { Text, Heading, Image, Stack, Button } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import ShopContext from "context/shop/ShopContext";

function ShopDetail() {
  const { shop } = useContext(ShopContext);

  return (
    <Stack
      bg="white"
      borderRadius="md"
      p="5"
      mb="5"
      direction={["column", "column", "row"]}
      spacing="5"
    >
      <Image
        src={"https://lwr.org/themes/custom/ai/images/Corus_LWR.svg"}
        h="40vh"
        w="300px"
        objectFit="contain"
        fallbackSrc={`https://via.placeholder.com/300/EDEDED/CAC8CC?text=${shop.name}`}
        borderRadius="md"
      />
      <Stack spacing="5">
        <Heading fontSize="xl">Lutheran world relief</Heading>
        <Text textOverflow="ellipsis">
        Fact: The hardworking farmers who grow your coffee are often the ones who profit the least from it. But there’s a better way! <br/><br/>

    For every bag of rich, delicious LWR Farmers Market Coffee you buy, a farmer receives a strong, up-front price for their coffee beans and shares in the profit of the final sale. <br/><br/>

    With LWR Farmers Market Coffee, farmers aren’t just suppliers of coffee beans, they are partners in the coffee business. <br/><br/>

    Offered in a balanced medium roast, a classic dark roast or a smooth decaf, LWR Farmers Market Coffee is available in 12oz bags for your home or in bulk for your congregation. Serve it at your congregation’s coffee hour. Or sell it for a fundraiser or as an educational opportunity. You can even sign up for a home subscription to enjoy during your morning routine. <br/><br/>
        </Text>
        <Heading fontSize="md" color="grey">
          Connect with us on
        </Heading>
        <Stack direction={["column", "column", "row"]} spacing="5">
          <a
            href={`https://www.facebook.com/${shop?.socialData?.facebook}`}
            target="_blank"
          >
            <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
              Facebook
            </Button>
          </a>
          <a
            href={`https://www.instagram.com/${shop?.socialData?.instagram}`}
            target="_blank"
          >
            <Button colorScheme="red" leftIcon={<FaInstagram />}>
              Instagram
            </Button>
          </a>
          <a
            href={`https://wa.me/+977${shop?.socialData?.whatsapp}?text=Hi,%20I%20have%20some%20enquiry%20for%20your%20shop`}
            target="_blank"
          >
            <Button colorScheme="whatsapp" leftIcon={<FaWhatsapp />}>
              Whatsapp
            </Button>
          </a>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ShopDetail;
