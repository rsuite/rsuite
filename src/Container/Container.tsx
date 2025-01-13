import React, { useState, useMemo } from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export type ContainerProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;
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
    as: Component = 'section',
    classPrefix = 'container',
    className,
    children,
    ...rest
  } = propsWithDefaults;
  const [hasSidebar, setHasSidebar] = useState(false);
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ 'has-sidebar': hasSidebar }));
  const contextValue = useMemo(() => ({ setHasSidebar }), [setHasSidebar]);

  return (
    <ContainerContext.Provider value={contextValue}>
      <Component {...rest} ref={ref} className={classes}>
        {children}
      </Component>
    </ContainerContext.Provider>
  );
});

Container.displayName = 'Container';

export default Container;
