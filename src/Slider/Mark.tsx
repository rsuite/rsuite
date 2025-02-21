import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface MarkProps extends WithAsProps {
  mark: number;
  last?: boolean;
  renderMark?: (mark: number) => React.ReactNode;
}

const Mark = forwardRef<'span', MarkProps>((props, ref) => {
  const {
    as: Component = 'span',
    mark,
    last,
    classPrefix = 'slider-mark',
    className,
    renderMark
  } = props;
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ last }));

  if (renderMark) {
    return (
      <Component ref={ref} className={classes}>
        <span className={prefix('content')}>{renderMark(mark)}</span>
      </Component>
    );
  }

  return null;
});

Mark.displayName = 'Mark';

export default Mark;
