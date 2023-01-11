import React from 'react';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export type ComponentProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;

interface Props<TElement extends React.ElementType> extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  componentAs?: TElement;
  componentClassPrefix?: string;
}

/**
 * Create a component with `classPrefix` and `as` attributes.
 */
function createComponent<TElement extends React.ElementType = 'div'>({
  name,
  componentAs,
  componentClassPrefix,
  ...defaultProps
}: Props<TElement>) {
  const Component: RsRefForwardingComponent<TElement, ComponentProps> = React.forwardRef(
    (props: ComponentProps, ref) => {
      const {
        as: Component = componentAs || 'div',
        classPrefix = componentClassPrefix || kebabCase(name),
        className,
        role,
        ...rest
      } = props;
      const { withClassPrefix, merge } = useClassNames(classPrefix);
      const classes = merge(className, withClassPrefix());

      return <Component {...defaultProps} {...rest} role={role} ref={ref} className={classes} />;
    }
  );

  Component.displayName = name;
  Component.propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node
  };

  return Component;
}

export default createComponent;
