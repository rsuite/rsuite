import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { setStatic } from 'recompose';

import StepItem from './StepItem';
import { prefix, defaultProps, ReactChildren, isIE10 } from '../utils';
import { StepsProps } from './Steps.d';

class Steps extends React.Component<StepsProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    vertical: PropTypes.bool,
    small: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    current: PropTypes.number,
    currentStatus: PropTypes.oneOf(['finish', 'wait', 'process', 'error'])
  };
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
      [addPrefix('small')]: small,
      [addPrefix('vertical')]: vertical,
      [addPrefix('horizontal')]: horizontal
    });

    const count = _.get(_.flatten(children), 'length');
    const items = ReactChildren.mapCloneElement(children, (item, index) => {
      const itemStyles = {
        [isIE10() ? 'msFlexPreferredSize' : 'flexBasis']:
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

const EnhancedSteps = defaultProps<StepsProps>({
  classPrefix: 'steps'
})(Steps);

setStatic('Item', StepItem)(EnhancedSteps);

export default EnhancedSteps;
