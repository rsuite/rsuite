import * as React from 'react';
import PropTypes from 'prop-types';
import { defaultProps, prefix } from '../utils';
import classNames from 'classnames';
import { BadgeProps } from './Badge.d';

class Badge extends React.Component<BadgeProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    maxCount: PropTypes.number
  };
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

    if (contentText === false) {
      return children;
    }

    const content =
      // $FlowFixMe I'm sure contenxtText is number type and maxCount is number type.
      typeof contentText === 'number' && contentText > maxCount ? `${maxCount}+` : contentText;
    if (!children) {
      return (
        <div {...rest} className={classes}>
          {content}
        </div>
      );
    }
    return (
      <div {...rest} className={classes}>
        {children}
        <div className={addPrefix('content')}>{content}</div>
      </div>
    );
  }
}

export default defaultProps<BadgeProps>({
  classPrefix: 'badge'
})(Badge);
