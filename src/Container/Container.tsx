import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';

export type ContainerProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;
export const ContainerContext = React.createContext<ContainerContextValue>({});

interface ContainerContextValue {
  setHasSidebar?: (value: boolean) => void;
}

const defaultProps: Partial<ContainerProps> = {
  as: 'section',
  classPrefix: 'container'
};
const Container = React.forwardRef((props: ContainerProps, ref: React.Ref<HTMLDivElement>) => {
  const { as: Component, classPrefix, className, children, ...rest } = props;
  const [hasSidebar, setHasSidebar] = useState(false);
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ 'has-sidebar': hasSidebar }));

  return (
    <ContainerContext.Provider value={{ setHasSidebar }}>
      <Component {...rest} ref={ref} className={classes}>
        {children}
      </Component>
    </ContainerContext.Provider>
  );
});

Container.displayName = 'Container';
Container.defaultProps = defaultProps;
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};

export default Container;
