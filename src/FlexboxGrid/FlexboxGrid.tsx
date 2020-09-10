import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import FlexboxGridItem from './FlexboxGridItem';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface FlexboxGridProps extends WithAsProps {
  /** align */
  align?: 'top' | 'middle' | 'bottom';

  /** horizontal arrangement */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

interface FlexboxGridCompont extends RsRefForwardingComponent<'div', FlexboxGridProps> {
  Item?: typeof FlexboxGridItem;
}

const defaultProps: Partial<FlexboxGridProps> = {
  as: 'div',
  classPrefix: 'flex-box-grid',
  align: 'top',
  justify: 'start'
};

const FlexboxGrid: FlexboxGridCompont = React.forwardRef((props: FlexboxGridProps, ref) => {
  const { as: Component, className, classPrefix, align, justify, ...rest } = props;
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(align, justify));
  return <Component {...rest} ref={ref} className={classes} />;
});

FlexboxGrid.Item = FlexboxGridItem;

FlexboxGrid.displayName = 'FlexboxGrid';
FlexboxGrid.defaultProps = defaultProps;
FlexboxGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
};

export default FlexboxGrid;
