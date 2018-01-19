import * as React from 'react';
import classNames from 'classnames';
import prefix, { globalKey } from './utils/prefix';
import Icon from './Icon';

type Props = {
  className?: string,
  classPrefix?: string,
  style?: Object,
  itemWidth?: number | string,
  status?: 'finish' | 'wait' | 'process' | 'error',
  icon?: React.Element<typeof Icon>,
  stepNumber?: number,
  description?: React.Node,
  title?: React.Node
};

class StepItem extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}steps-item`,
  };
  render() {
    const {
      className,
      classPrefix,
      style,
      itemWidth,
      status,
      icon,
      stepNumber,
      description,
      title,
      ...rest
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('custom')]: icon
    }, addPrefix(`status-${status}`), className);

    const styles = {
      width: itemWidth,
      ...style
    };

    const contentNode = (title || description) ? (
      <div className={addPrefix('content')}>
        {title && <div className={addPrefix('title')}>{title}</div>}
        {description && <div className={addPrefix('description')}>{description}</div>}
      </div>
    ) : null;

    const iconNode = icon ? <span>{icon}</span> : (
      <span className={addPrefix(`icon-${status}`)}>{stepNumber}</span>
    );

    return (
      <div
        {...rest}
        className={classes}
        style={styles}
      >
        <div className={addPrefix('tail')} />
        <div className={addPrefix('icon')}>
          {iconNode}
        </div>
        {contentNode}
      </div>
    );
  }
}

export default StepItem;
