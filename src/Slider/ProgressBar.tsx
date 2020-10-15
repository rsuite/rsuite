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

const defaultProps: Partial<ProgressBarProps> = {
  as: 'div',
  classPrefix: 'slider-progress-bar'
};

const ProgressBar: RsRefForwardingComponent<'div', ProgressBarProps> = React.forwardRef(
  (props: ProgressBarProps, ref) => {
    const {
      as: Component,
      classPrefix,
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
    const startKey = vertical ? 'top' : dirKey;

    const styles = { ...style, [startKey]: `${start}%`, [sizeKey]: `${end - start}%` };
    const classes = merge(className, withClassPrefix());

    return <Component ref={ref} style={styles} className={classes} />;
  }
);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = defaultProps;
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
