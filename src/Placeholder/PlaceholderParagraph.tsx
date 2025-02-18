import React, { useMemo } from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface PlaceholderParagraphProps extends WithAsProps {
  /**
   * The number of rows.
   * @default 2
   */
  rows?: number;

  /**
   * The height of the row.
   * @default 10
   */
  rowHeight?: number;

  /**
   * @deprecated Use `rowSpacing` instead.
   */
  rowMargin?: number;

  /**
   * The spacing between rows.
   * @default 20
   * @version 5.59.1
   */
  rowSpacing?: number;

  /**
   * The shape of the graph.
   * @default false
   */
  graph?: boolean | 'circle' | 'square' | 'image';

  /**
   * Placeholder status, display the loading state.
   */
  active?: boolean;
}

/**
 * The `Placeholder.Paragraph` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
const PlaceholderParagraph = forwardRef<'div', PlaceholderParagraphProps>(
  (props: PlaceholderParagraphProps, ref) => {
    const { propsWithDefaults } = useCustom('PlaceholderParagraph', props);
    const {
      as: Component = 'div',
      className,
      classPrefix = 'placeholder',
      rows = 3,
      rowHeight,
      rowSpacing,
      graph,
      active,
      style,
      ...rest
    } = propsWithDefaults;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const graphShape = graph === true ? 'square' : graph;

    const styles = {
      '--rs-placeholder-row-height': getCssValue(rowHeight),
      '--rs-placeholder-row-spacing': getCssValue(rowSpacing)
    } as React.CSSProperties;

    const rowElements = useMemo(() => {
      const rowArr: React.ReactElement[] = [];

      for (let i = 0; i < rows; i++) {
        rowArr.push(<div key={i} className={prefix`row`} />);
      }
      return rowArr;
    }, [prefix, rows]);

    const classes = merge(className, withClassPrefix('paragraph', { active }));
    const graphClasses = prefix('paragraph-graph', `paragraph-graph-${graphShape}`);

    return (
      <Component {...rest} ref={ref} className={classes} style={mergeStyles(styles, style)}>
        {graphShape && (
          <div className={graphClasses}>
            <span className={prefix('paragraph-graph-inner')} />
          </div>
        )}
        <div className={prefix('paragraph-group')}>{rowElements}</div>
      </Component>
    );
  }
);

PlaceholderParagraph.displayName = 'PlaceholderParagraph';

export default PlaceholderParagraph;
