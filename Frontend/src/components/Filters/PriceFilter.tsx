import React, { useMemo, useState } from "react";
import {
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import toast from "react-hot-toast";

const PriceFilter = () => {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState(
    useMemo(() => router.query.minPrice, [router.query.minPrice])
  );
  const [maxPrice, setMaxPrice] = useState(
    useMemo(() => router.query.maxPrice, [router.query.maxPrice])
  );

  const onMinChange = (e) => {
    if (Number(e.target.value) > Number(maxPrice)) {
      toast.error("Min price must be less than max price");
      return null;
    }
    setMinPrice(e.target.value);
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        minPrice: e.target.value,
      },
    });
    return null;
  };

  const onMaxChange = (e) => {
    if (Number(e.target.value) < Number(minPrice)) {
      toast.error("Max price must be less than min price");
      return null;
    }
    setMaxPrice(e.target.value);
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        maxPrice: e.target.value,
      },
    });
    return null;
  };

  const debounceMinPrice = useMemo(() => debounce(onMinChange, 2000), []);
  const debounceMaxPrice = useMemo(() => debounce(onMaxChange, 2000), []);

  const clearFilter = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        minPrice: null,
        maxPrice: null,
      },
    });
  };

  return (
    <Flex flexDirection="column" mt="5" pr="3" align="flex-start">
      <Flex w="full" justify="space-between" align="center">
        <Heading fontSize="md" mb="1">
          Price
        </Heading>
        {(minPrice || maxPrice) && (
          <Heading
            fontSize="xs"
            mb="1"
            cursor="pointer"
            color="red"
            onClick={clearFilter}
          >
            CLEAR
          </Heading>
        )}
      </Flex>

      <Flex flexDirection="column" maxW="200px">
        <FormLabel fontSize="xs">Min Value</FormLabel>
        <NumberInput
          size="sm"
          defaultValue={Number(minPrice) || 0}
          min={0}
          max={Number(maxPrice)}
        >
          <NumberInputField value={minPrice} onChange={debounceMinPrice} />
        </NumberInput>
        <FormLabel fontSize="xs">Max Value</FormLabel>
        <NumberInput
          size="sm"
          defaultValue={Number(maxPrice) || 0}
          min={Number(minPrice)}
        >
          <NumberInputField value={maxPrice} onChange={debounceMaxPrice} />
        </NumberInput>
      </Flex>
    </Flex>
  );
};

export default PriceFilter;
