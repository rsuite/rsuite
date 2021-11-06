import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';

export type ContainerProps = WithAsProps &
  React.HTMLAttributes<HTMLDivElement> & {
    hasSidebar?: boolean;
  };
export const ContainerContext = React.createContext<ContainerContextValue>({});

interface ContainerContextValue {
  setHasSidebar?: (value: boolean) => void;
}

const Container = React.forwardRef(
  (
    { hasSidebar: PropsHasSidebar = false, ...props }: ContainerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      as: Component = 'section',
      classPrefix = 'container',
      className,
      children,
      ...rest
    } = props;
    const [hasSidebar, setHasSidebar] = useState(PropsHasSidebar);
    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ 'has-sidebar': hasSidebar }));

    return (
      <ContainerContext.Provider value={{ setHasSidebar }}>
        <Component {...rest} ref={ref} className={classes}>
          {children}
        </Component>
      </ContainerContext.Provider>
    );
  }
);

Container.displayName = 'Container';
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  hasSidebar: PropTypes.bool
};

export default Container;
