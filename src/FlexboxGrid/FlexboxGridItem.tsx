import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface FlexboxGridItemProps extends WithAsProps {
  /** spacing between grids */
  colspan?: number;

  /** grid orders for sorting */
  order?: number;
}

const FlexboxGridItem: RsRefForwardingComponent<'div', FlexboxGridItemProps> = React.forwardRef(
  (props: FlexboxGridItemProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'flex-box-grid-item',
      colspan = 0,
      order = 0,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({
        [colspan]: colspan >= 0,
        [`order-${order}`]: order
      })
    );

    return <Component ref={ref} {...rest} className={classes} />;
  }
);

FlexboxGridItem.displayName = 'FlexboxGridItem';
FlexboxGridItem.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  colspan: PropTypes.number,
  order: PropTypes.number,
  classPrefix: PropTypes.string
};

export default FlexboxGridItem;
