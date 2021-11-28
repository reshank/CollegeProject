import React from "react";
import Flicking from "@egjs/react-flicking";
import { Image, Stack } from "@chakra-ui/react";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";

const Banners = () => {
  return (
    <Stack my="5">
      <Flicking circular={true} align="prev" inputType={["touch", "mouse"]}>
        <Image
          objectFit="contain"
          w="32%"
          h="35vh"
          mx="3"
          borderRadius="lg"
          bg="red"
          src="https://source.unsplash.com/random"
        />
        <Image
          objectFit="contain"
          w="32%"
          h="35vh"
          mx="3"
          borderRadius="lg"
          src="https://source.unsplash.com/random"
        />
        <Image
          objectFit="contain"
          w="32%"
          h="35vh"
          mx="3"
          borderRadius="lg"
          src="https://source.unsplash.com/random"
        />
      </Flicking>
    </Stack>
  );
};

export default Banners;
