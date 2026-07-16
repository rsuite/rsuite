import React from 'react';
import { convertToFlex } from './utils';
import { useClassNames } from './hooks';
import type { StandardProps } from './types';

export interface ColumnGroupProps extends StandardProps {
  /** Alignment */
  align?: 'left' | 'center' | 'right';
  /** Vertical alignment */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /** Fixed column */
  fixed?: boolean | 'left' | 'right';

  /**
   * Height of the merged cell group header.
   * The default value is half of the table's `headerHeight`.
   **/
  groupHeaderHeight?: number;

  /** Group header */
  header?: React.ReactNode;
  /** Width */
  width?: number;
  /** Header height */
  headerHeight?: number;
}

const ColumnGroup = React.forwardRef((props: ColumnGroupProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    header,
    className,
    children,
    classPrefix = 'column-group',
    headerHeight = 80,
    verticalAlign,
    align,
    width,
    groupHeaderHeight: groupHeightProp,
    ...rest
  } = props;

  const groupHeight = typeof groupHeightProp !== 'undefined' ? groupHeightProp : headerHeight / 2;
  const restHeight =
    typeof groupHeightProp !== 'undefined' ? headerHeight - groupHeightProp : headerHeight / 2;

  const styles: React.CSSProperties = {
    height: groupHeight,
    width
  };

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const contentStyles = {
    ...convertToFlex({ verticalAlign, align }),
    ...styles
  };

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className={prefix('header')} style={styles}>
        <div className={prefix('header-content')} style={contentStyles}>
          {header}
        </div>
      </div>

      {children
        ? React.Children.map(
            children as React.ReactElement<any>[],
            (node: React.ReactElement<any>) => {
              return React.cloneElement(node, {
                className: prefix('cell'),
                predefinedStyle: { height: restHeight, top: styles.height },
                headerHeight: restHeight,
                verticalAlign: node.props.verticalAlign || verticalAlign,
                children: <span className={prefix('cell-content')}>{node.props.children}</span>
              });
            }
          )
        : null}
    </div>
  );
});

ColumnGroup.displayName = 'Table.ColumnGroup';

export default ColumnGroup;
