import React from 'react';
import Stack, { StackProps } from './Stack';
import { RsRefForwardingComponent } from '@/internals/types';

export interface VStackProps extends Omit<StackProps, 'direction'> {
  reverse?: boolean;
}

export interface StackComponent extends RsRefForwardingComponent<'div', VStackProps> {
  Item: typeof Stack.Item;
}

const VStack: StackComponent = React.forwardRef((props: VStackProps, ref) => {
  const {
    reverse,
    spacing = 6,
    alignItems = 'flex-start',
    childrenRenderMode = 'clone',
    ...rest
  } = props;

  const direction = reverse ? 'column-reverse' : 'column';

  return (
    <Stack
      spacing={spacing}
      childrenRenderMode={childrenRenderMode}
      alignItems={alignItems}
      {...rest}
      direction={direction}
      ref={ref}
    />
  );
}) as unknown as StackComponent;

VStack.displayName = 'VStack';
VStack.Item = Stack.Item;

export default VStack;
