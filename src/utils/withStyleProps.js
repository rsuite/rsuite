/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { setPropTypes } from 'recompose';
import type { HigherOrderComponent } from 'react-flow-types';
import type { Size, Types, Color } from './TypeDefinition';

import prefix from './prefix';

const SizeOf = ['lg', 'md', 'sm', 'xs'];
const TypeOf = ['success', 'warning', 'danger', 'info'];
const ColorOf = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

type RequiredProps = {
  className?: string,
  classPrefix?: string,
  innerRef?: Function,
  size?: Size,
  color?: Color,
  type?: Types
};

type ProvidedProps = {
  classPrefix: string
}

type Options = {
  hasSize?: boolean,
  hasType?: boolean,
  hasColor?: boolean
}

const withStyleProps = (
  options?: Options = {}
): HigherOrderComponent<RequiredProps, ProvidedProps> => (Component: any): any => {

  const { hasSize, hasType, hasColor } = options;

  class WithStyleProps extends React.Component<RequiredProps> {

    static displayName = wrapDisplayName(Component, 'withStyleProps');
    static defaultProps = Component.defaultProps;

    render() {

      const { classPrefix, size, color, type, innerRef, className, ...props } = this.props;
      const addPrefix: Function = prefix(classPrefix);
      const classes: string = classNames(
        hasSize ? addPrefix(size) : null,
        hasColor ? addPrefix(color) : null,
        hasType ? addPrefix(type) : null,
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

  if (hasType) {
    propTypes.type = PropTypes.oneOf(TypeOf);
  }

  setPropTypes(propTypes)(WithStyleProps);

  return WithStyleProps;
};


export default withStyleProps;
