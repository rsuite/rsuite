import React from 'react';
import Stack, { StackProps } from './Stack';
import { forwardRef } from '@/internals/utils';

export interface VStackProps extends Omit<StackProps, 'direction'> {
  reverse?: boolean;
}

const Subcomponents = {
  Item: Stack.Item
};

const VStack = forwardRef<'div', VStackProps, typeof Subcomponents>((props, ref) => {
  const { reverse, ...rest } = props;

  const direction = reverse ? 'column-reverse' : 'column';

  return <Stack align="flex-start" {...rest} direction={direction} ref={ref} />;
}, Subcomponents);

VStack.displayName = 'VStack';

export default VStack;
