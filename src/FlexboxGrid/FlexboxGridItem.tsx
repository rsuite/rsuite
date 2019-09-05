import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps, prefix } from '../utils';
import { FlexboxGridItemProps } from './FlexboxGridItem.d';

class FlexboxGridItem extends React.Component<FlexboxGridItemProps> {
  static propTypes = {
    className: PropTypes.string,
    colspan: PropTypes.number,
    order: PropTypes.number,
    classPrefix: PropTypes.string,
    componentClass: PropTypes.elementType
  };
  static defaultProps = {
    componentClass: 'div',
    colspan: 0,
    order: 0
  };

  render() {
    const {
      className,
      classPrefix,
      colspan,
      order,
      componentClass: Component,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(className, classPrefix, {
      [addPrefix(`${colspan}`)]: colspan >= 0,
      [addPrefix(`order-${order}`)]: order
    });

    return <Component {...props} className={classes} />;
  }
}

export default defaultProps<FlexboxGridItemProps>({
  classPrefix: 'flex-box-grid-item'
})(FlexboxGridItem);
