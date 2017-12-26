/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import wrapDisplayName from 'recompose/wrapDisplayName';
import type { HigherOrderComponent } from 'react-flow-types';
import type { Size, Status, Color } from './TypeDefinition';

import prefix from './prefix';

const SizeOf = ['lg', 'md', 'sm', 'xs'];
const StatusOf = ['success', 'warning', 'danger', 'info'];
const ColorOf = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

type RequiredProps = {
  className?: string,
  classPrefix?: string,
  innerRef?: Function,
  size?: Size,
  color?: Color,
  status?: Status
};

type ProvidedProps = {
  classPrefix: string
}

type Options = {
  hasSize?: boolean,
  hasStatus?: boolean,
  hasColor?: boolean
}

const withStyleProps = (
  options?: Options = {}
): HigherOrderComponent<RequiredProps, ProvidedProps> => (Component: any): any => {

  const { hasSize, hasStatus, hasColor } = options;

  class WithStyleProps extends React.Component<RequiredProps> {

    static displayName = wrapDisplayName(Component, 'withStyleProps');
    static defaultProps = Component.defaultProps;

    render() {

      const { classPrefix, size, color, status, innerRef, className, ...props } = this.props;
      const addPrefix: Function = prefix(classPrefix);
      const classes: string = classNames(
        hasSize ? addPrefix(size) : null,
        hasColor ? addPrefix(color) : null,
        hasStatus ? addPrefix(status) : null,
        className
      );

      return (
        <Component
          {...props}
          classPrefix={classPrefix}
          className={classes}
          ref={innerRef}
        />
      );
    }
  }

  const propTypes: Object = {
    innerRef: PropTypes.func
  };


  if (hasSize) {
    propTypes.size = PropTypes.oneOf(SizeOf);
  }

  if (hasColor) {
    propTypes.color = PropTypes.oneOf(ColorOf);
  }

  if (hasStatus) {
    propTypes.status = PropTypes.oneOf(StatusOf);
  }

  WithStyleProps.propTypes = propTypes;

  return WithStyleProps;
};


export default withStyleProps;
