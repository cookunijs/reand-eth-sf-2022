import React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import { Footer } from '.';

export default {
  title: 'organisms/Footer',
  component: Footer,
  args: {},
} as Meta<ButtonProps>;
type Template = Story<ButtonProps>;
const Template: Template = args => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
