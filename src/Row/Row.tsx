import React from 'react';
import PropTypes from 'prop-types';
import { ReactChildren, useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface RowProps extends WithAsProps {
  gutter?: number;
}

const Row: RsRefForwardingComponent<'div', RowProps> = React.forwardRef((props: RowProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'row',
    className,
    gutter,
    children,
    style,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  let cols = children;
  let rowStyles = style;

  if (typeof gutter !== 'undefined') {
    const padding = gutter / 2;
    cols = ReactChildren.mapCloneElement(children, child => ({
      ...child.props,
      style: {
        ...child.props.style,
        paddingLeft: padding,
        paddingRight: padding
      }
    }));

    rowStyles = {
      ...style,
      marginLeft: -padding,
      marginRight: -padding
    };
  }

  return (
    <Component role="row" {...rest} ref={ref} className={classes} style={rowStyles}>
      {cols}
    </Component>
  );
});

Row.displayName = 'Row';
Row.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  gutter: PropTypes.number,
  style: PropTypes.any,
  as: PropTypes.elementType,
  children: PropTypes.node
};

export default Row;
