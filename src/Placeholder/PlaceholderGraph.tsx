import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface PlaceholderGraphProps extends WithAsProps {
  /**
   * The height of the graph.
   *
   * @default 200
   */
  height?: number;

  /**
   * The width of the graph.
   *
   * @default 100%
   */
  width?: number;

  /**
   * Placeholder status, display the loading state.
   */
  active?: boolean;
}

/**
 * The `Placeholder.Graph` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
const PlaceholderGraph: RsRefForwardingComponent<'div', PlaceholderGraphProps> = React.forwardRef(
  (props: PlaceholderGraphProps, ref) => {
    const {
      as: Component = 'div',
      className,
      width,
      height = 200,
      style,
      active,
      classPrefix = 'placeholder',
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);

    const classes = merge(className, withClassPrefix('graph', { active }));
    const styles = { width: width || '100%', height, ...style };
    return <Component {...rest} ref={ref} className={classes} style={styles} />;
  }
);

PlaceholderGraph.displayName = 'PlaceholderGraph';
PlaceholderGraph.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  classPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  active: PropTypes.bool
};

export default PlaceholderGraph;
