// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import { defaultProps, prefix } from './utils';
import FlexboxGirdItem from './FlexboxGirdItem';

type Props = {
  className?: string,
  align: 'top' | 'middle' | 'bottom',
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between',
  classPrefix: string
};

class FlexboxGird extends React.Component<Props> {
  static defaultProps = {
    align: 'top',
    gutter: 0,
    justify: 'start'
  };
  render() {
    const { className, classPrefix, align, justify, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const clesses = classNames(classPrefix, className, addPrefix(align), addPrefix(justify));
    return <div {...props} className={clesses} />;
  }
}

const EnhancedFlexboxGird = defaultProps({
  classPrefix: 'flexbox-gird-item'
})(FlexboxGird);

setStatic('Item', FlexboxGirdItem)(EnhancedFlexboxGird);

export default EnhancedFlexboxGird;
