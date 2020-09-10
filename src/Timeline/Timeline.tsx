import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { setStatic } from 'recompose';

import TimelineItem from './TimelineItem';
import { defaultProps, prefix, ReactChildren } from '../utils';
import { TimelineProps } from './Timeline.d';

class Timeline extends React.Component<TimelineProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    componentClass: PropTypes.elementType,
    align: PropTypes.oneOf(['left', 'right', 'alternate']),
    endless: PropTypes.bool
  };

  static defaultProps = {
    align: 'left'
  };

  render() {
    const {
      children,
      componentClass: Component,
      classPrefix,
      className,
      align,
      endless,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const count = React.Children.count(children);
    const withTime = _.some(React.Children.toArray(children), ({ props }: any) => !!props.time);
    const classes = classNames(classPrefix, className, addPrefix(`align-${align}`), {
      [addPrefix('with-time')]: withTime,
      [addPrefix('endless')]: endless
    });

    return (
      <Component className={classes} {...rest}>
        {ReactChildren.mapCloneElement(children, (_child: any, index: number) => ({
          last: index + 1 === count,
          align
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
