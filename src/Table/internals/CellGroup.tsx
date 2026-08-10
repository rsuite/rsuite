import React from 'react';
import { useClassNames, useTable } from './hooks';
import type { StandardProps } from './types';
export interface CellGroupProps extends StandardProps {
  fixed?: 'left' | 'right';
  width?: number;
  height?: number;
  left?: number;
}

const CellGroup = React.forwardRef((props: CellGroupProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    fixed,
    width,
    left,
    height,
    style,
    classPrefix = 'cell-group',
    className,
    children,
    ...rest
  } = props;

  const { setCssPosition } = useTable();
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ [`fixed-${fixed}`]: fixed, scroll: !fixed }));

  const styles = {
    width,
    height,
    ...style
  };

  setCssPosition?.(styles as CSSStyleDeclaration, left, 0);

  return (
    <div {...rest} ref={ref} className={classes} style={styles}>
      {children}
    </div>
  );
});

CellGroup.displayName = 'Table.CellGroup';

export default CellGroup;
