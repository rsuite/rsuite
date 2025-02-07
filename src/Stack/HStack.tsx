import React from 'react';
import Stack, { StackProps } from './Stack';
import { forwardRef } from '@/internals/utils';

export interface HStackProps extends Omit<StackProps, 'direction'> {
  /**
   * Reverse the order of the children in the stack
   */
  reverse?: boolean;
}

const Subcomponents = {
  Item: Stack.Item
};

const HStack = forwardRef<'div', HStackProps, typeof Subcomponents>((props, ref) => {
  const { reverse, spacing = 6, childrenRenderMode = 'clone', ...rest } = props;
  const direction = reverse ? 'row-reverse' : 'row';

  return (
    <Stack
      spacing={spacing}
      childrenRenderMode={childrenRenderMode}
      {...rest}
      direction={direction}
      ref={ref}
    />
  );
}, Subcomponents);

HStack.displayName = 'HStack';

export default HStack;
