import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import prefix, { globalKey } from './utils/prefix';
import Icon from './Icon';

type Props = {
  className?: string,
  classPrefix?: string,
  style?: Object,
  itemWidth?: number | string,
  status?: 'finish' | 'wait' | 'process' | 'error',
  iconPrefix?: string,
  icon?: React.Element<typeof Icon>,
  stepNumber?: number,
  description?: React.Node,
  title?: React.Node
};

class StepItem extends React.Component<Props> {
  static defaultProps = {
    status: 'wait',
    classPrefix: `${globalKey}steps-item`,
  };
  render() {
    const {
      className,
      classPrefix,
      style,
      itemWidth,
      status,
      iconPrefix,
      icon,
      stepNumber,
      description,
      title,
      ...rest
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);
    const iconClasses = classNames({
      [addPrefix(`icon-${icon}`)]: icon && _.isString(icon),
      [addPrefix('icon-check')]: !icon && status === 'finish',
      [addPrefix('icon-cross')]: !icon && status === 'error',
    });

    const classes = classNames(classPrefix, {
      [addPrefix('custom')]: icon
    }, addPrefix(`status-${status}`), className);

    const styles = {
      width: itemWidth,
      ...style
    };

    return (
      <div
        {...rest}
        className={classes}
        style={styles}
      >
        <div
          className={addPrefix('tail')}
        />
        <div className={addPrefix('icon')}>
          {icon ? <span>{icon}</span> : <span className={iconClasses}>{stepNumber}</span>}
        </div>
        <div className={addPrefix('content')}>
          {title && <div className={addPrefix('title')}>{title}</div>}
          {description && <div className={addPrefix('description')}>{description}</div>}
        </div>
      </div>
    );
  }
}

export default StepItem;
