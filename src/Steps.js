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
  status?: 'finish' | 'wait' | 'process' | 'error',
}

class Steps extends React.Component<Props> {

  static Item = StepItem;
  static defaultProps = {
    classPrefix: `${globalKey}steps`,
    status: 'process',
    current: 0
  };


  render() {
    const {
      classPrefix,
      className,
      children,
      vertical,
      status,
      small,
      current,
      ...restProps
    } = this.props;

    const lastIndex = children.length - 1;
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('small')]: small,
      [addPrefix('vertical')]: vertical,
      [addPrefix('horizontal')]: !vertical
    }, className);

    const items: React.Node = mapCloneElement(children, (item, index) => {
      const itemWidth = vertical ? null : `${100 / lastIndex}%`;
      const itemProps = {
        stepNumber: (index + 1),
        itemWidth,
        ...item.props
      };

      // fix tail color
      if (status === 'error' && index === (current - 1)) {
        itemProps.className = `${classPrefix}-next-error`;
      }


      if (!item.props.status) {
        itemProps.status = 'wait';

        if (index === current) {
          itemProps.status = status;
        } else if (index < current) {
          itemProps.status = 'finish';
        }
      }

      return itemProps;
    });

    return (
      <div
        {...restProps}
        className={classes}
      >
        {items}
      </div>
    );
  }
}

export default Steps;
