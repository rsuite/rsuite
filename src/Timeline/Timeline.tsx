import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import TimelineItem from './TimelineItem';
import { defaultProps, ReactChildren } from '../utils';
import { TimelineProps } from './Timeline.d';

class Timeline extends React.Component<TimelineProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    componentClass: PropTypes.elementType
  };
  render() {
    const { children, componentClass: Component, classPrefix, className, ...rest } = this.props;
    const count = React.Children.count(children);
    return (
      <Component className={classNames(classPrefix, className)} {...rest}>
        {ReactChildren.mapCloneElement(children, (child: any, index: number) => ({
          last: index + 1 === count
        }))}
      </Component>
    );
  }
}

const EnhancedTimeline = defaultProps<TimelineProps>({
  classPrefix: 'timeline',
  componentClass: 'ul'
})(Timeline);

setStatic('Item', TimelineItem)(EnhancedTimeline);

export default EnhancedTimeline;
