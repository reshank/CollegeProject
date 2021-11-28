import { updateOrder } from "@api/order";
import { Button, Heading, Textarea, Stack } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

interface Props {
  status: string;
  message: string;
  id: string;
  Refresh: any;
}

const StatusDetails = ({ status, message, id, Refresh }: Props) => {
  const [inputMessage, setInputMessage] = useState(
    useMemo(() => {
      if (message) {
        return message;
      }
    }, [message])
  );
  const [loading, setLoading] = useState<string>("");

  const update = async (status) => {
    setLoading(status);
    await updateOrder({
      orderId: id,
      status,
      message: inputMessage,
    });
    setLoading("");
    Refresh();
  };

  if (status === "Just placed") {
    return (
      <>
        <Heading fontSize="md">Message</Heading>
        <Textarea
          placeholder="Any message that you want user can see (optional)"
          defaultValue={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Stack direction="row" w="full" mt="3" spacing="5">
          <Button
            w="full"
            size="sm"
            colorScheme="green"
            onClick={() => update("Accepted")}
            isLoading={loading === "Accepted"}
          >
            Accept Order
          </Button>
          <Button
            w="full"
            size="sm"
            variant="outline"
            colorScheme="red"
            onClick={() => update("Rejected")}
            isLoading={loading === "Rejected"}
          >
            Reject Order
          </Button>
        </Stack>
      </>
    );
  }

  if (status === "Accepted") {
    return (
      <>
        <Heading fontSize="md">Message</Heading>
        <Textarea
          placeholder="Any message that you want user can see (optional)"
          defaultValue={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Stack direction="row" w="full" mt="3" spacing="5">
          <Button
            w="full"
            size="sm"
            colorScheme="green"
            isLoading={loading === "Shipped"}
            onClick={() => update("Shipped")}
          >
            Order Shipped
          </Button>
          <Button
            w="full"
            size="sm"
            colorScheme="red"
            variant="outline"
            isLoading={loading === "Cancelled"}
            onClick={() => update("Cancelled")}
          >
            Cancel
          </Button>
        </Stack>
      </>
    );
  }

  if (status === "Shipped") {
    return (
      <>
        <Heading fontSize="md">Message</Heading>
        <Textarea
          placeholder="Any message that you want user can see (optional)"
          defaultValue={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Stack direction="row" w="full" mt="3" spacing="5">
          <Button
            w="full"
            size="sm"
            colorScheme="blue"
            isLoading={loading === "Delivered"}
            onClick={() => update("Delivered")}
          >
            Order Delivered
          </Button>
        </Stack>
      </>
    );
  }

  return null;
};

export default StatusDetails;
