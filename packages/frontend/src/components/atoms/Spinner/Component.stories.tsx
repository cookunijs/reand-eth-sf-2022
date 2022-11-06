import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SpinnerProps } from './Component';
import { Spinner } from '.';

export default {
  title: 'atoms/Spinner',
  component: Spinner,
  args: {},
} as Meta<SpinnerProps>;
type Template = Story<SpinnerProps>;
const Template: Template = args => <Spinner {...args} />;

export const Default = Template.bind({});
