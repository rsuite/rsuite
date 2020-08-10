import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface GridProps extends StandardProps, React.HTMLAttributes<HTMLDivElement> {
  /** Fluid layout */
  fluid?: boolean;
}

const Grid = React.forwardRef((props: GridProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'div',
    classPrefix = 'grid-container',
    className,
    fluid,
    ...rest
  } = props;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, fluid ? prefix({ fluid }) : withClassPrefix());

  return <Component role="grid" {...rest} ref={ref} className={classes} />;
});

Grid.displayName = 'Grid';
Grid.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};

export default Grid;
