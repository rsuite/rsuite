import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

export interface MarkProps extends BoxProps {
  mark: number;
  last?: boolean;
  renderMark?: (mark: number) => React.ReactNode;
}

const Mark = forwardRef<'span', MarkProps>((props, ref) => {
  const { as = 'span', mark, last, classPrefix = 'slider-mark', className, renderMark } = props;
  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ last }));

  if (renderMark) {
    return (
      <Box as={as} ref={ref} className={classes}>
        <span className={prefix('content')}>{renderMark(mark)}</span>
      </Box>
    );
  }

  return null;
});

Mark.displayName = 'Mark';

export default Mark;
