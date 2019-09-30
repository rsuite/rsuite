import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import TimelineItem from './TimelineItem';
import { defaultProps, prefix, ReactChildren } from '../utils';
import { TimelineProps } from './Timeline.d';

class Timeline extends React.Component<TimelineProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    componentClass: PropTypes.elementType,
    mode: PropTypes.oneOf(['left', 'right', 'alternate'])
  };

  static defaultProps = {
    mode: 'left'
  };

  render() {
    const {
      children,
      componentClass: Component,
      classPrefix,
      className,
      mode,
      timeWidth,
      style = {},
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const count = React.Children.count(children);
    const styles = timeWidth ? { ...style, paddingLeft: timeWidth + 12 } : style;
    return (
      <Component
        className={classNames(classPrefix, addPrefix(`mode-${mode}`), className)}
        style={styles}
        {...rest}
      >
        {ReactChildren.mapCloneElement(children, (_child: any, index: number) => ({
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
