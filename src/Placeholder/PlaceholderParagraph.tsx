import React, { useMemo } from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef } from '@/internals/utils';
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
      rows = 2,
      rowHeight = 10,
      rowMargin = 20,
      rowSpacing = rowMargin,
      graph,
      active,
      classPrefix = 'placeholder',
      ...rest
    } = propsWithDefaults;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const graphShape = graph === true ? 'square' : graph;

    const rowElements = useMemo(() => {
      const rowArr: React.ReactElement[] = [];

      for (let i = 0; i < rows; i++) {
        const styles = {
          height: rowHeight,
          marginTop: i > 0 ? rowSpacing : Number(rowSpacing) / 2
        };
        rowArr.push(<div key={i} style={styles} className={prefix`row`} />);
      }
      return rowArr;
    }, [prefix, rowHeight, rowSpacing, rows]);

    const classes = merge(className, withClassPrefix('paragraph', { active }));
    const graphClasses = prefix('paragraph-graph', `paragraph-graph-${graphShape}`);

    return (
      <Component {...rest} ref={ref} className={classes}>
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
