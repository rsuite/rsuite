import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';

import { prefix, defaultProps, withStyleProps } from './utils';

type Props = {
  last?: boolean,
  dot?: React.Node,
  className?: string,
  children: React.Node,
  classPrefix?: string,
  componentClass: React.ElementType
};

class TimelineItem extends React.Component<Props> {
  render() {
    const {
      children,
      componentClass: Component,
      classPrefix,
      last,
      className,
      dot,
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
        <div className={addPrefix('content')}>{children}</div>
      </Component>
    );
  }
}

export default compose(
  withStyleProps({
    hasColor: true
  }),
  defaultProps({
    componentClass: 'li',
    classPrefix: 'timeline-item'
  })
)(TimelineItem);
