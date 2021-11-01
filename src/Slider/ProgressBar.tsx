import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

interface ProgressBarProps extends WithAsProps {
  vertical?: boolean;
  rtl?: boolean;
  start?: number;
  end?: number;
}

const ProgressBar: RsRefForwardingComponent<'div', ProgressBarProps> = React.forwardRef(
  (props: ProgressBarProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'slider-progress-bar',
      vertical,
      rtl,
      end = 0,
      start = 0,
      style,
      className
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);

    const sizeKey = vertical ? 'height' : 'width';
    const dirKey = rtl ? 'right' : 'left';
    const startKey = vertical ? 'bottom' : dirKey;

    const styles = { ...style, [startKey]: `${start}%`, [sizeKey]: `${end - start}%` };
    const classes = merge(className, withClassPrefix());

    return <Component ref={ref} style={styles} className={classes} />;
  }
);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  rtl: PropTypes.bool,
  start: PropTypes.number,
  end: PropTypes.number
};

export default ProgressBar;
