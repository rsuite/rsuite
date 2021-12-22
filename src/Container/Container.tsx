import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';

export type ContainerProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;
export const ContainerContext = React.createContext<ContainerContextValue>({});

interface ContainerContextValue {
  setHasSidebar?: (value: boolean) => void;
}

const Container = React.forwardRef((props: ContainerProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'section',
    classPrefix = 'container',
    className,
    children,
    ...rest
  } = props;
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
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};

export default Container;
