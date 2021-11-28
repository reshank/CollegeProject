import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

interface InputProps {
  title: string;
  description: string;
  onConfirm: any;
  onCancel: any;
  onClose: any;
  isOpen: boolean;
  isLoading?: boolean;
}

const ConfirmAlert = ({
  title = "",
  description = "",
  onConfirm,
  onCancel,
  isOpen,
  onClose,
  isLoading = false,
}: InputProps) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onCancel} ref={cancelRef}>
            No
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlert;
