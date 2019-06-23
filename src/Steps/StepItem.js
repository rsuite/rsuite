import * as React from 'react';
import classNames from 'classnames';

import Icon from './Icon';
import { prefix, defaultProps } from './utils';

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
    const classes = classNames(
      classPrefix,
      {
        [addPrefix('custom')]: icon
      },
      addPrefix(`status-${status}`),
      className
    );

    const styles = {
      width: itemWidth,
      ...style
    };

    const contentNode =
      title || description ? (
        <div className={addPrefix('content')}>
          {title && <div className={addPrefix('title')}>{title}</div>}
          {description && <div className={addPrefix('description')}>{description}</div>}
        </div>
      ) : null;

    let iconNode = <span className={addPrefix(['icon', `icon-${status}`])}>{stepNumber}</span>;

    if (icon) {
      iconNode = <span className={addPrefix('icon')}>{icon}</span>;
    }

    return (
      <div {...rest} className={classes} style={styles}>
        <div className={addPrefix('tail')} />
        <div className={addPrefix(['icon-wrapper', icon ? 'custom-icon' : ''])}>{iconNode}</div>
        {contentNode}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'steps-item'
})(StepItem);
