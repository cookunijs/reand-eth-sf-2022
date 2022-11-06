import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CardProps } from './Component';
import { Card } from '.';

export default {
  title: 'atoms/Card',
  component: Card,
  args: {
    children: 'Card',
  },
} as Meta<CardProps>;
type Template = Story<CardProps>;
const Template: Template = args => <Card {...args} />;

export const Default = Template.bind({});
