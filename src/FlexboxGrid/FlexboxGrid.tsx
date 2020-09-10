import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';

import { defaultProps, prefix } from '../utils';
import FlexboxGridItem from './FlexboxGridItem';
import { FlexboxGridProps } from './FlexboxGrid.d';

class FlexboxGrid extends React.Component<FlexboxGridProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
  };
  static defaultProps = {
    align: 'top',
    justify: 'start'
  };
  render() {
    const { className, classPrefix, align, justify, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, addPrefix(align), addPrefix(justify));
    return <div {...props} className={classes} />;
  }
}

const EnhancedFlexboxGrid = defaultProps<FlexboxGridProps>({
  classPrefix: 'flex-box-grid'
})(FlexboxGrid);

setStatic('Item', FlexboxGridItem)(EnhancedFlexboxGrid);

export default EnhancedFlexboxGrid;
