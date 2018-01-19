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
  current: number
}

class Steps extends React.Component<Props> {

  static Item = StepItem;
  static defaultProps = {
    classPrefix: `${globalKey}steps`,
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
      ...restProps
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('small')]: small,
      [addPrefix('vertical')]: vertical,
      [addPrefix('horizontal')]: !vertical
    }, className);

    const items: React.Node = mapCloneElement(children, (item, index) => {

      //console.log(index);

      const itemProps = {
        stepNumber: index,
        status: 'wait',
        ...item.props
      };

      if (!item.props.status) {

        if (index === current) {
          itemProps.status = 'process';
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
