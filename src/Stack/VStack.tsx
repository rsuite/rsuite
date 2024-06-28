import React from 'react';
import Stack, { StackProps } from './Stack';

export interface VStackProps extends Omit<StackProps, 'direction'> {
  reverse?: boolean;
}

const VStack = React.forwardRef((props: VStackProps, ref) => {
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
});

VStack.displayName = 'VStack';

export default VStack;
