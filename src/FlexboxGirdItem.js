// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  colspan?: number,
  order?: number,
  classPrefix: string
};

class FlexboxGirdItem extends React.Component<Props> {
  static defaultProps = {
    colspan: 0,
    order: 0
  };

  render() {
    const { className, classPrefix, colspan, order, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const clesses = classNames(classPrefix, className, addPrefix(colspan), addPrefix(order));

    return <div {...props} className={clesses} />;
  }
}

export default defaultProps({
  classPrefix: 'flexbox-gird'
})(FlexboxGirdItem);
