// @flow
import * as React from 'react';
import classNames from 'classnames';
import StepItem from './StepItem';
import prefix, { globalKey } from './utils/prefix';
import { mapCloneElement } from './utils/ReactChildren';

type Props = {
  classPrefix: string,
  vertical?: boolean,
  small?: boolean,
  className?: string,
  children: React.ChildrenArray<any>,
  current: number,
  currentStatus?: 'finish' | 'wait' | 'process' | 'error',
}

class Steps extends React.Component<Props> {

  static Item = StepItem;
  static defaultProps = {
    classPrefix: `${globalKey}steps`,
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
    const classes = classNames(classPrefix, {
      [addPrefix('small')]: small,
      [addPrefix('vertical')]: vertical,
      [addPrefix('horizontal')]: !vertical
    }, className);

    const items: React.Node = mapCloneElement(children, (item, index) => {

      const itemProps = {
        stepNumber: index + 1,
        status: 'wait',
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
      <div
        {...rest}
        className={classes}
      >
        {items}
      </div>
    );
  }
}

export default Steps;
