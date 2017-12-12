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
const ColorOf = ['default', 'primary', 'link', 'inverse'];

type RequiredProps = {
  className: string,
  classPrefix: string,
  innerRef?: Function,
  size?: Size,
  shape?: Status | Color
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
    static defaultProps = {
      shape: 'default',
      ...Component.defaultProps
    };

    render() {

      const { classPrefix, size, shape, innerRef, className, ...props } = this.props;
      const addPrefix: Function = prefix(classPrefix);
      const classes: string = classNames(
        classPrefix,
        hasSize ? addPrefix(size) : null,
        (hasStatus && hasColor) ? addPrefix(shape) : null,
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

  if (hasStatus || hasColor) {
    let oneOf: Array<string> = [];
    hasStatus && oneOf.push(...StatusOf);
    hasColor && oneOf.push(...ColorOf);
    propTypes.shape = PropTypes.oneOf(oneOf);
  }

  WithStyleProps.propTypes = propTypes;

  return WithStyleProps;
};


export default withStyleProps;
