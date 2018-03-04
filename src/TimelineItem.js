import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';

import { prefix, defaultProps, withStyleProps } from './utils';

type Props = {
  last?: boolean,
  dot?: React.Node,
  className?: string,
  children: React.Node,
  classPrefix?: string
};

class TimelineItem extends React.Component<Props> {
  render() {
    const { children, classPrefix, last, className, dot, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('last')]: last
    });

    return (
      <li className={classes} {...rest}>
        <div className={addPrefix('tail')} />
        <div className={classNames(addPrefix('dot'), { [addPrefix('custom-dot')]: !!dot })}>
          {dot}
        </div>
        <div className={addPrefix('content')}>{children}</div>
      </li>
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
