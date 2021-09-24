import React from 'react';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export type ComponentProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  componentAs?: React.ElementType;
  componentClassPrefix?: string;
}

/**
 * Create a component with `classPrefix` and `as` attributes.
 * @param defaultProps
 */
function createComponent(defaultProps: Props) {
  const { name, componentAs, componentClassPrefix, ...componentRestProps } = defaultProps;

  const Component: RsRefForwardingComponent<'div', ComponentProps> = React.forwardRef(
    (props: ComponentProps, ref) => {
      const { as: Component, classPrefix, className, role, ...rest } = props;
      const { withClassPrefix, merge } = useClassNames(classPrefix);
      const classes = merge(className, withClassPrefix());

      return <Component {...rest} role={role} ref={ref} className={classes} />;
    }
  );

  Component.displayName = name;
  Component.propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node
  };
  Component.defaultProps = {
    ...componentRestProps,
    as: componentAs || 'div',
    classPrefix: componentClassPrefix || kebabCase(name)
  };

  return Component;
}

export default createComponent;
