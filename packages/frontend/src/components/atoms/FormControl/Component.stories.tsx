import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FormControl } from '.';
import { FormControlProps } from './Component';

export default {
  title: 'atoms/FormControl',
  component: FormControl,
  args: {},
} as Meta<FormControlProps>;
type Template = Story<FormControlProps>;
const Template: Template = args => <FormControl {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
