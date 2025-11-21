import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef, mergeStyles } from '@/internals/utils';

interface ProgressBarProps extends BoxProps {
  vertical?: boolean;
  start?: number;
  end?: number;
}

const ProgressBar = forwardRef<'div', ProgressBarProps>((props, ref) => {
  const {
    as,
    classPrefix = 'slider-progress-bar',
    vertical,
    end = 0,
    start = 0,
    style,
    className,
    ...rest
  } = props;

  const { merge, withPrefix } = useStyles(classPrefix);

  const sizeKey = vertical ? 'height' : 'width';
  const startKey = vertical ? 'bottom' : 'insetInlineStart';

  const styles = mergeStyles(style, { [startKey]: `${start}%`, [sizeKey]: `${end - start}%` });
  const classes = merge(className, withPrefix());

  return (
    <Box
      as={as}
      ref={ref}
      style={styles}
      className={classes}
      data-testid="slider-progress-bar"
      {...rest}
    />
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
