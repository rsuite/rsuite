// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import TimelineItem from './TimelineItem';
import { defaultProps, ReactChildren } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  children: React.Node,
  componentClass: React.ElementType
};

class Timeline extends React.Component<Props> {
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

const EnhancedTimeline = defaultProps({
  classPrefix: 'timeline',
  componentClass: 'ul'
})(Timeline);

setStatic('Item', TimelineItem)(EnhancedTimeline);

export default EnhancedTimeline;
