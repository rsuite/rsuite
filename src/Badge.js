// @flow

import * as React from 'react';
import { defaultProps, prefix } from './utils';
import setDisplayName from 'recompose/setDisplayName';
import classNames from 'classnames';

type Props = {
  className?: string,
  classPrefix: string,
  children?: React.Node,
  content: string | number | React.Node,
  maxCount?: number
};

class Badge extends React.Component<Props> {
  static defaultProps = {
    maxCount: 99
  };

  render() {
    const {
      className,
      classPrefix,
      children,
      content: contentText,
      maxCount,
      ...rest
    } = this.props;
    const addPrefix: (className: string) => string = prefix(classPrefix);
    const dot = contentText === undefined || contentText === null;
    const classes: string = classNames(classPrefix, className, {
      [addPrefix('independent')]: !children,
      [addPrefix('wrapper')]: children,
      [addPrefix('dot')]: dot
    });

    const contentInner =
      typeof contentText === 'number' && contentText > maxCount ? `${maxCount}+` : contentText;
    if (!children) {
      return (
        <div {...rest} className={classes}>
          {contentInner}
        </div>
      );
    }
    const content = <div className={addPrefix('content')}>{contentInner}</div>;
    return (
      <div {...rest} className={classes}>
        {children}
        {content}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'badge'
})(Badge);
