import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface PlaceholderGraphProps extends WithAsProps {
  /* height of rows */
  height?: number;

  /* width of rows */
  width?: number;

  /** Placeholder status */
  active?: boolean;
}

const defaultProps: Partial<PlaceholderGraphProps> = {
  as: 'div',
  classPrefix: 'placeholder',
  height: 200
};

const PlaceholderGraph: RsRefForwardingComponent<'div', PlaceholderGraphProps> = React.forwardRef(
  (props: PlaceholderGraphProps, ref) => {
    const { as: Component, className, width, height, style, active, classPrefix, ...rest } = props;
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
PlaceholderGraph.defaultProps = defaultProps;

export default PlaceholderGraph;
