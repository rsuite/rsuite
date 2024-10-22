import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export interface GridProps extends WithAsProps {
  /** Fluid layout */
  fluid?: boolean;
}

/**
 * The Grid component is used to specify the layout of child elements in rows and columns.
 * @see https://rsuitejs.com/components/grid
 */
const Grid: RsRefForwardingComponent<'div', GridProps> = React.forwardRef(
  (props: GridProps, ref) => {
    const { propsWithDefaults } = useCustom('Grid', props);
    const {
      as: Component = 'div',
      classPrefix = 'grid-container',
      className,
      fluid,
      ...rest
    } = propsWithDefaults;

    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, fluid ? prefix({ fluid }) : withClassPrefix());

    return <Component role="grid" {...rest} ref={ref} className={classes} />;
  }
);

Grid.displayName = 'Grid';
Grid.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};

export default Grid;
