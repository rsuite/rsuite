import React from 'react';
import Stack, { StackProps } from './Stack';

export interface HStackProps extends Omit<StackProps, 'direction'> {
  /**
   * Reverse the order of the children in the stack
   */
  reverse?: boolean;
}

const HStack = React.forwardRef((props: HStackProps, ref) => {
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
});

HStack.displayName = 'HStack';

export default HStack;
