import React from 'react';
import {
  Modal,
  ModalProps as ChakraModalProps,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

export interface ModalProps extends ChakraModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const Component: React.FC<ModalProps> = ({ children, title, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="2xl" px="4px" pt="12px" pb="20px" mt="17vh" mx="4">
        <ModalHeader pt="10px" pb="8px">
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton
          as={IconButton}
          variant="outline"
          colorScheme="gray"
          minW="0"
          w="36px"
          h="36px"
          mt="14px"
          mx="14px"
          borderRadius="full"
          icon={<FiX fontSize="1.2rem" />}
          onClick={onClose}
          aria-label="Modal"
          bgColor={useColorModeValue('white', 'gray.700')}
          color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
          _active={{
            boxShadow: 'none',
            bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            color: useColorModeValue('blackAlpha.900', 'whiteAlpha.900'),
          }}
          _hover={{
            boxShadow: 'none',
            bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            color: useColorModeValue('blackAlpha.900', 'whiteAlpha.900'),
          }}
          _focus={{
            boxShadow: 'none',
            bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
            color: useColorModeValue('blackAlpha.900', 'whiteAlpha.900'),
          }}
        />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Component;
