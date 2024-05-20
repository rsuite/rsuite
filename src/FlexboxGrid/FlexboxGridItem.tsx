import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

export interface FlexboxGridItemProps extends WithAsProps {
  /** spacing between grids */
  colspan?: number;

  /** grid orders for sorting */
  order?: number;
}

/**
 * The `FlexboxGrid.Item` component is used to specify the layout of the child element in the `FlexboxGrid` component.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
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
