// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  placement: 'top' | 'right' | 'bottom' | 'left',
  classPrefix: string,
  children?: React.Node,
  title?: React.Node,
  style?: Object,
  className?: string
}

class Popover extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}popover`,
    placement: 'right'
  };
  render() {
    const {
      classPrefix,
      title,
      children,
      style,
      placement,
      className
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix(placement)]: true
    }, className);

    const styles = {
      display: 'block',
      ...style
    };

    return (
      <div
        className={classes}
        style={styles}
      >
        <div className="arrow" />
        {
          title ? (
            <h3 className={addPrefix('title')}>
              {title}
            </h3>
          ) : null
        }
        <div className={addPrefix('content')}>
          {children}
        </div>
      </div>
    );
  }
}

export default Popover;
