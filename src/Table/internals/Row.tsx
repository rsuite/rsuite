import React from 'react';
import { mergeRefs } from './utils';
import { useClassNames, useTable } from './hooks';
import { ROW_HEADER_HEIGHT, ROW_HEIGHT } from './constants';
import type { StandardProps } from './types';

export interface RowProps extends StandardProps {
  width?: number;
  height?: number;
  headerHeight?: number;
  top?: number;
  isHeaderRow?: boolean;
  rowRef?: any;
  rowSpan?: number;
}

const Row = React.forwardRef((props: RowProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    classPrefix = 'row',
    height = ROW_HEIGHT,
    headerHeight = ROW_HEADER_HEIGHT,
    className,
    width,
    top,
    style,
    isHeaderRow,
    rowRef,
    children,
    rowSpan,
    ...rest
  } = props;

  const { setCssPosition } = useTable();
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ header: isHeaderRow, rowspan: rowSpan }));

  const styles = {
    minWidth: width,
    height: isHeaderRow ? headerHeight : height,
    ...style
  };

  setCssPosition?.(styles as CSSStyleDeclaration, 0, top);

  return (
    <div role="row" {...rest} ref={mergeRefs(rowRef, ref)} className={classes} style={styles}>
      {children}
    </div>
  );
});

Row.displayName = 'Table.Row';

export default Row;
