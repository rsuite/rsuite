// @flow
import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import StepItem from './StepItem';
import { prefix, defaultProps, ReactChildren, isIE9, isIE10 } from './utils';

type Props = {
  classPrefix: string,
  vertical?: boolean,
  small?: boolean,
  className?: string,
  children: React.Childrenany[],
  current: number,
  currentStatus?: 'finish' | 'wait' | 'process' | 'error'
};

class Steps extends React.Component<Props> {
  static defaultProps = {
    currentStatus: 'process',
    current: 0
  };

  render() {
    const {
      classPrefix,
      className,
      children,
      vertical,
      small,
      current,
      currentStatus,
      ...rest
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);
    const horizontal = !vertical;
    const classes = classNames(classPrefix, className, {
      'ie-polyfill': horizontal && isIE9,
      [addPrefix('small')]: small,
      [addPrefix('vertical')]: vertical,
      [addPrefix('horizontal')]: horizontal
    });

    const count = children.length;
    const items: React.Node = ReactChildren.mapCloneElement(children, (item, index) => {
      const itemStyles = {
        [isIE10 ? 'msFlexPreferredSize' : 'flexBasis']:
          index < count - 1 ? `${100 / (count - 1)}%` : undefined,
        maxWidth: index === count - 1 ? `${100 / count}%` : undefined
      };
      const itemProps = {
        stepNumber: index + 1,
        status: 'wait',
        style: horizontal ? itemStyles : undefined,
        ...item.props
      };

      // fix tail color
      if (currentStatus === 'error' && index === current - 1) {
        itemProps.className = addPrefix('next-error');
      }

      if (!item.props.status) {
        if (index === current) {
          itemProps.status = currentStatus;
        } else if (index < current) {
          itemProps.status = 'finish';
        }
      }

      return itemProps;
    });

    return (
      <div {...rest} className={classes}>
        {items}
      </div>
    );
  }
}

const EnhancedSteps = defaultProps({
  classPrefix: 'steps'
})(Steps);

setStatic('Item', StepItem)(EnhancedSteps);

export default EnhancedSteps;
