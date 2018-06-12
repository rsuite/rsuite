// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  colspan: number,
  order: number,
  classPrefix: string
};

class FlexboxGridItem extends React.Component<Props> {
  static defaultProps = {
    colspan: 0,
    order: 0
  };

  render() {
    const { className, classPrefix, colspan, order, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, addPrefix(colspan), {
      [addPrefix(`order-${order}`)]: order
    });

    return <div {...props} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'flex-box-grid-item'
})(FlexboxGridItem);
