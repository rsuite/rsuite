/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { setPropTypes } from 'recompose';
import type { HigherOrderComponent } from 'react-flow-types';
import type { Size, Types, Color } from './TypeDefinition';

import prefix from './prefix';
import { SIZE, STATUS, COLOR } from './constants';

type RequiredProps = {
  className?: string,
  classPrefix?: string,
  innerRef?: Function,
  size?: Size,
  color?: Color,
  status?: Types
};

type ProvidedProps = {
  classPrefix: string
};

type Options = {
  hasSize?: boolean,
  hasStatus?: boolean,
  hasColor?: boolean,
  defaultColor?: string
};

const withStyleProps = (
  options?: Options = {}
): HigherOrderComponent<RequiredProps, ProvidedProps> => (Component: any): any => {
  const { hasSize, hasStatus, hasColor, defaultColor } = options;

  class WithStyleProps extends React.Component<RequiredProps> {
    static displayName = wrapDisplayName(Component, 'withStyleProps');
    static defaultProps = Component.defaultProps;

    render() {
      const { classPrefix, size, color, status, innerRef, className, ...props } = this.props;
      const addPrefix: Function = prefix(classPrefix);
      const classes: string = classNames(className, {
        [addPrefix(size)]: hasSize && size,
        [addPrefix(color)]: hasColor && color,
        [addPrefix(defaultColor)]: !color,
        [addPrefix(status)]: hasStatus && status
      });

      return <Component {...props} classPrefix={classPrefix} className={classes} ref={innerRef} />;
    }
  }

  const propTypes: Object = {
    innerRef: PropTypes.func
  };

  if (hasSize) {
    propTypes.size = PropTypes.oneOf(SIZE);
  }

  if (hasColor) {
    propTypes.color = PropTypes.oneOf(COLOR);
  }

  if (hasStatus) {
    propTypes.status = PropTypes.oneOf(STATUS);
  }

  setPropTypes(propTypes)(WithStyleProps);

  return WithStyleProps;
};

export default withStyleProps;
