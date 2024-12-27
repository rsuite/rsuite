import React from 'react';
import Stack, { StackProps } from './Stack';
import { RsRefForwardingComponent } from '@/internals/types';

export interface HStackProps extends Omit<StackProps, 'direction'> {
  /**
   * Reverse the order of the children in the stack
   */
  reverse?: boolean;
}

export interface StackComponent extends RsRefForwardingComponent<'div', HStackProps> {
  Item: typeof Stack.Item;
}

const HStack: StackComponent = React.forwardRef(function HStack(props: HStackProps, ref) {
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
}) as unknown as StackComponent;

HStack.displayName = 'HStack';
HStack.Item = Stack.Item;

export default HStack;
