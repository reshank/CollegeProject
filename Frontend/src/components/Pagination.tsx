import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import times from "lodash/times";

const Pagination = ({
  noOfPages,
  activePage,
  setActivePage,
}: {
  noOfPages: number;
  activePage: number;
  setActivePage: any;
}) => {
  const pages = Math.ceil(noOfPages);

  if (pages <= 1) {
    return null;
  }

  return (
    <Stack direction="row" my="5" pt="5" spacing="3">
      {times(pages, (index) => (
        <Button
          key={index}
          variant={activePage === index ? "solid" : "outline"}
          colorScheme="primary"
          onClick={() => setActivePage(index)}
        >
          {index + 1}
        </Button>
      ))}
    </Stack>
  );
};

export default Pagination;
