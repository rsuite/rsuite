import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';

import { prefix, defaultProps, withStyleProps } from '../utils';
import { TimelineItemProps } from './TimelineItem.d';

class TimelineItem extends React.Component<TimelineItemProps> {
  static propTypes = {
    last: PropTypes.bool,
    dot: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node,
    classPrefix: PropTypes.string,
    componentClass: PropTypes.elementType
  };
  render() {
    const {
      children,
      componentClass: Component,
      classPrefix,
      last,
      className,
      dot,
      time,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('last')]: last
    });

    return (
      <Component className={classes} {...rest}>
        <span className={addPrefix('tail')} />
        <span className={classNames(addPrefix('dot'), { [addPrefix('custom-dot')]: !!dot })}>
          {dot}
        </span>
        {time && <div className={addPrefix('time')}>{time}</div>}
        <div className={addPrefix('content')}>{children}</div>
      </Component>
    );
  }
}

export default compose<any, TimelineItemProps>(
  withStyleProps<TimelineItemProps>({
    hasColor: true
  }),
  defaultProps<TimelineItemProps>({
    componentClass: 'li',
    classPrefix: 'timeline-item'
  })
)(TimelineItem);
