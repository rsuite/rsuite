import React, { useState, useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';

export type ContainerProps = BoxProps & React.HTMLAttributes<HTMLDivElement>;
export const ContainerContext = React.createContext<ContainerContextValue>({});

interface ContainerContextValue {
  setHasSidebar?: (value: boolean) => void;
}

/**
 * The Container component is used to wrap content in a themed container with a max-width.
 * @see https://rsuitejs.com/components/container
 */
const Container = forwardRef<'section', ContainerProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Container', props);
  const {
    as = 'section',
    classPrefix = 'container',
    className,
    children,
    ...rest
  } = propsWithDefaults;
  const [hasSidebar, setHasSidebar] = useState(false);
  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ 'has-sidebar': hasSidebar }));
  const contextValue = useMemo(() => ({ setHasSidebar }), [setHasSidebar]);

  return (
    <ContainerContext.Provider value={contextValue}>
      <Box as={as} {...rest} ref={ref} className={classes}>
        {children}
      </Box>
    </ContainerContext.Provider>
  );
});

Container.displayName = 'Container';

export default Container;
