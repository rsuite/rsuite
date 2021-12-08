import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface PlaceholderParagraphProps extends WithAsProps {
  /* number of rows */
  rows?: number;

  /* height of rows */
  rowHeight?: number;

  /* margin of rows */
  rowMargin?: number;

  /* show graph */
  graph?: boolean | 'circle' | 'square' | 'image';

  /** Placeholder status */
  active?: boolean;
}

const PlaceholderParagraph: RsRefForwardingComponent<'div', PlaceholderParagraphProps> =
  React.forwardRef((props: PlaceholderParagraphProps, ref) => {
    const {
      as: Component = 'div',
      className,
      rows = 2,
      rowHeight = 10,
      rowMargin = 20,
      graph,
      active,
      classPrefix = 'placeholder',
      ...rest
    } = props;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const graphShape = graph === true ? 'square' : graph;

    const rowElements = useMemo(() => {
      const rowArr: React.ReactElement[] = [];

      for (let i = 0; i < rows; i++) {
        const styles = {
          width: `${Math.random() * 75 + 25}%`,
          height: rowHeight,
          marginTop: i > 0 ? rowMargin : Number(rowMargin) / 2
        };
        rowArr.push(<p key={i} style={styles} />);
      }
      return rowArr;
    }, [rowHeight, rowMargin, rows]);

    const classes = merge(className, withClassPrefix('paragraph', { active }));
    const graphClasses = prefix('paragraph-graph', `paragraph-graph-${graphShape}`);

    return (
      <Component {...rest} ref={ref} className={classes}>
        {graphShape && (
          <div className={graphClasses}>
            <span className={prefix('paragraph-graph-inner')} />
          </div>
        )}
        <div className={prefix('paragraph-rows')}>{rowElements}</div>
      </Component>
    );
  });

PlaceholderParagraph.displayName = 'PlaceholderParagraph';
PlaceholderParagraph.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  rows: PropTypes.number,
  rowHeight: PropTypes.number,
  rowMargin: PropTypes.number,
  graph: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['circle', 'square', 'image'])]),
  active: PropTypes.bool
};

export default PlaceholderParagraph;
