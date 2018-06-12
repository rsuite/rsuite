// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import { defaultProps, prefix } from './utils';
import FlexboxGridItem from './FlexboxGridItem';

type Props = {
  className?: string,
  align: 'top' | 'middle' | 'bottom',
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between',
  classPrefix: string
};

class FlexboxGrid extends React.Component<Props> {
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

const EnhancedFlexboxGrid = defaultProps({
  classPrefix: 'flex-box-grid'
})(FlexboxGrid);

setStatic('Item', FlexboxGridItem)(EnhancedFlexboxGrid);

export default EnhancedFlexboxGrid;
