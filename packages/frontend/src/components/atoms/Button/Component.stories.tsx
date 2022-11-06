import React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import { Button } from '.';

export default {
  title: 'atoms/Button',
  component: Button,
  args: {
    children: 'BUTTON',
  },
} as Meta<ButtonProps>;
type Template = Story<ButtonProps>;
const Template: Template = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  colorScheme: 'blue',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};
