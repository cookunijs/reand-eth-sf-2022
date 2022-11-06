import React from 'react';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import { Modal } from '.';
import { ModalProps } from './Component';

export default {
  title: 'molecules/Modal',
  component: Modal,
  args: {
    title: 'Modal',
  },
} as Meta<ModalProps>;
type Template = Story<ModalProps>;
const Template: Template = args => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>onOpen</Button>
      <Modal {...args} isOpen={isOpen} onClose={onClose}>
        <Text>BodyBodyBodyBody</Text>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Default',
};
