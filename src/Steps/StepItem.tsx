import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps } from '../utils';
import { StepItemProps } from './StepItem.d';

class StepItem extends React.Component<StepItemProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    style: PropTypes.object,
    itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.oneOf(['finish', 'wait', 'process', 'error']),
    icon: PropTypes.object,
    stepNumber: PropTypes.number,
    description: PropTypes.node,
    title: PropTypes.node
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

    const addPrefix = prefix(classPrefix);
    const classes = classNames(className, classPrefix, {
      [addPrefix(`status-${status}`)]: status,
      [addPrefix('custom')]: icon
    });

    const styles = {
      width: itemWidth,
      ...style
    };

    const contentNode = (
      <div className={addPrefix('content')}>
        {<div className={addPrefix('title')}>{title}</div>}
        {description && <div className={addPrefix('description')}>{description}</div>}
      </div>
    );

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

export default defaultProps<StepItemProps>({
  classPrefix: 'steps-item'
})(StepItem);
