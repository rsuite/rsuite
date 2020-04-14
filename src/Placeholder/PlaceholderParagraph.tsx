import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';
import { PlaceholderParagraphProps } from './PlaceholderParagraph.d';

class PlaceholderParagraph extends React.Component<PlaceholderParagraphProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    rows: PropTypes.number,
    rowHeight: PropTypes.number,
    rowMargin: PropTypes.number,
    graph: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['circle', 'square', 'image'])]),
    active: PropTypes.bool
  };
  static defaultProps = {
    rows: 2,
    rowHeight: 10,
    rowMargin: 20
  };

  render() {
    const {
      className,
      rows,
      rowHeight,
      rowMargin,
      graph,
      active,
      classPrefix,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PlaceholderParagraph, rest);
    const graphShape = graph === true ? 'square' : graph;
    const rowArr = [];

    for (let i = 0; i < rows; i++) {
      const styles = {
        width: `${Math.random() * 75 + 25}%`,
        height: rowHeight,
        marginTop: i > 0 ? rowMargin : Number(rowMargin) / 2
      };
      rowArr.push(<p key={i} style={styles} />);
    }

    const classes = classNames(className, classPrefix, addPrefix('paragraph'), {
      [addPrefix('active')]: active
    });

    const graphClasses = classNames(
      addPrefix('paragraph-graph'),
      addPrefix(`paragraph-graph-${graphShape}`)
    );

    return (
      <div className={classes} {...unhandled}>
        {graphShape && (
          <div className={graphClasses}>
            <span className={addPrefix('paragraph-graph-inner')} />
          </div>
        )}
        <div className={addPrefix('paragraph-rows')}>{rowArr}</div>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderParagraph);
