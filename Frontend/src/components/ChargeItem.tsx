import React, { useState } from "react";
import { deleteConfigById, updateConfigById } from "@api/config";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Switch,
  Stack,
  IconButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmAlert from "./ConfirmAlert";

const ChargeItem = ({ data, refresh, openDetailModal }) => {
  const [loading, setLoading] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSwitchChange = async (e) => {
    setLoading("update");
    await updateConfigById({
      configId: data.id,
      updatedValue: {
        ...data,
        show: e.target.checked,
      },
    });

    setLoading("");
    refresh();
  };

  const deleteConfirm = async () => {
    setLoading("delete");
    await deleteConfigById({ configId: data?.id });
    setLoading("");
    refresh();
    onClose();
  };

  return (
    <>
      <Flex
        bg="white"
        boxShadow="base"
        p="2"
        borderRadius="md"
        flexDirection="column"
        m="2"
      >
        <Flex p="3" flexDirection="column">
          <Heading fontWeight="700" fontSize="md">
            {data.name}
          </Heading>
          {data?.type === "percent" ? (
            <Text fontWeight="bold" color="primary.500" mt="2">
              {data?.percent}%
            </Text>
          ) : (
            <Text fontWeight="bold" color="primary.500" mt="2">
              Rs {data?.amount}
            </Text>
          )}
        </Flex>
        <Flex
          borderTopColor="grey.700"
          borderTopWidth="2px"
          p="3"
          justify="space-between"
          align="center"
        >
          <Switch
            id="show"
            colorScheme="primary"
            isChecked={data?.show}
            onChange={onSwitchChange}
            isDisabled={loading === "update"}
          />
          <Stack direction="row" spacing="3">
            <IconButton
              variant="outline"
              size="sm"
              colorScheme="red"
              aria-label="Delete product"
              icon={<DeleteIcon />}
              onClick={onOpen}
            />
            <Button
              onClick={() => openDetailModal(data.id)}
              colorScheme="primary"
              size="sm"
              variant="outline"
            >
              Details
            </Button>
          </Stack>
        </Flex>
      </Flex>
      <ConfirmAlert
        title={`Delete this extra charges ${data?.name} ?`}
        description="Are you sure you want to delete this extra charges"
        isOpen={isOpen}
        onCancel={onClose}
        onClose={onClose}
        onConfirm={deleteConfirm}
        isLoading={loading === "delete"}
      />
    </>
  );
};

export default ChargeItem;
