import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setPropTypes, wrapDisplayName } from 'recompose';

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

function withStyleProps<T>(options: Options = {}) {
  return (Component: React.ComponentType<any>) => {
    const { hasSize, hasStatus, hasColor, defaultColor } = options;

    const WithStyleComponent = React.forwardRef((props: RequiredProps & T, ref: React.Ref<any>) => {
      const { classPrefix, size, color, status, className, ...rest } = props;
      const addPrefix = prefix(classPrefix);
      const classes = classNames(className, {
        [addPrefix(size)]: hasSize && size,
        [addPrefix(color)]: hasColor && color,
        [addPrefix(defaultColor)]: !color,
        [addPrefix(status)]: hasStatus && status
      });

      return <Component {...rest} classPrefix={classPrefix} className={classes} ref={ref} />;
    });

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

    WithStyleComponent.displayName = wrapDisplayName(Component, 'withStyleProps');
    WithStyleComponent.defaultProps = Component.defaultProps;

    setPropTypes<any>(propTypes)(WithStyleComponent);

    return WithStyleComponent;
  };
}

export default withStyleProps;
