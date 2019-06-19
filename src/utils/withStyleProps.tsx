import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { setPropTypes } from 'recompose';

import { TypeAttributes } from '../@types/common';

import prefix from './prefix';
import { SIZE, STATUS, COLOR } from '../constants';

export interface RequiredProps {
  className?: string;
  classPrefix?: string;
  innerRef?: Function;
  size?: TypeAttributes.Size;
  color?: TypeAttributes.Color;
  status?: TypeAttributes.Status;
}

interface Options {
  hasSize?: boolean;
  hasStatus?: boolean;
  hasColor?: boolean;
  defaultColor?: string;
}

function withStyleProps<ProvidedProps>(options: Options = {}) {
  return (Component: React.ComponentType) => {
    const { hasSize, hasStatus, hasColor, defaultColor } = options;

    class WithStyleProps extends React.Component<RequiredProps & ProvidedProps> {
      static displayName = wrapDisplayName(Component, 'withStyleProps');
      static defaultProps = Component.defaultProps;

      render() {
        const { classPrefix, size, color, status, innerRef, className, ...props } = this.props;
        const addPrefix = prefix(classPrefix);
        const classes = classNames(className, {
          [addPrefix(size)]: hasSize && size,
          [addPrefix(color)]: hasColor && color,
          [addPrefix(defaultColor)]: !color,
          [addPrefix(status)]: hasStatus && status
        });

        return (
          <Component {...props} classPrefix={classPrefix} className={classes} ref={innerRef} />
        );
      }
    }

    const propTypes: any = {
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
}

export default withStyleProps;
