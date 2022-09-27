import React from 'react';
import PropTypes from 'prop-types';
import { WithAsProps } from '../@types/common';

export interface StackItemProps extends WithAsProps {
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  flex?: React.CSSProperties['flex'];
  grow?: React.CSSProperties['flexGrow'];
  shrink?: React.CSSProperties['flexShrink'];
  basis?: React.CSSProperties['flexBasis'];
  order?: React.CSSProperties['order'];
}

export default function StackItem(props: StackItemProps) {
  const {
    as: Component = 'div',
    style,
    className,
    alignSelf,
    flex,
    grow,
    shrink,
    order,
    basis,
    ...rest
  } = props;

  return (
    <Component
      className={className}
      style={{
        alignSelf,
        order,
        ...(flex ? { flex } : { flexGrow: grow, flexShrink: shrink, flexBasis: basis }),
        ...style
      }}
      {...rest}
    />
  );
}

StackItem.displayName = 'StackItem';
StackItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  alignSelf: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.number,
  shrink: PropTypes.number,
  order: PropTypes.number,
  basis: PropTypes.string
};
