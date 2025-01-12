import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

interface ProgressBarProps extends WithAsProps {
  vertical?: boolean;
  rtl?: boolean;
  start?: number;
  end?: number;
}

const ProgressBar = forwardRef<'div', ProgressBarProps>((props, ref) => {
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

  return (
    <Component ref={ref} style={styles} className={classes} data-testid="slider-progress-bar" />
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
