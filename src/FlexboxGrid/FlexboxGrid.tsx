import React from 'react';
import PropTypes from 'prop-types';
import FlexboxGridItem from './FlexboxGridItem';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { oneOf } from '@/internals/propTypes';
import { useCustom } from '../CustomProvider';

export interface FlexboxGridProps extends WithAsProps {
  /** align */
  align?: 'top' | 'middle' | 'bottom';

  /** horizontal arrangement */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

interface FlexboxGridCompont extends RsRefForwardingComponent<'div', FlexboxGridProps> {
  Item: typeof FlexboxGridItem;
}

/**
 * The FlexboxGrid component is a box that can be used to layout other components.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
const FlexboxGrid: FlexboxGridCompont = React.forwardRef((props: FlexboxGridProps, ref) => {
  const { propsWithDefaults } = useCustom('FlexboxGrid', props);
  const {
    as: Component = 'div',
    className,
    classPrefix = 'flex-box-grid',
    align = 'top',
    justify = 'start',
    ...rest
  } = propsWithDefaults;
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(align, justify));
  return <Component {...rest} ref={ref} className={classes} />;
}) as unknown as FlexboxGridCompont;

FlexboxGrid.Item = FlexboxGridItem;

FlexboxGrid.displayName = 'FlexboxGrid';
FlexboxGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  align: oneOf(['top', 'middle', 'bottom']),
  justify: oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
};

export default FlexboxGrid;
