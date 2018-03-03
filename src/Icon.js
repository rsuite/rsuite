// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import { defaultProps, prefix } from './utils';
import type { SVGIcon } from './utils/TypeDefinition';

type Props = {
  icon: string | SVGIcon,
  className?: string,
  classPrefix?: string,
  componentClass?: React.ElementType,
  size?: 'lg' | '2x' | '3x' | '4x' | '5x',
  flip?: 'horizontal' | 'vertical',
  stack?: '1x' | '2x',
  rotate?: number,
  fixedWidth?: boolean,
  svgStyle?: Object,
  spin?: boolean,
  pulse?: boolean,
  componentClass: React.ElementType
};

class Icon extends React.Component<Props> {
  render() {
    const {
      className,
      classPrefix,
      icon,
      size,
      fixedWidth,
      spin,
      pulse,
      rotate,
      flip,
      stack,
      svgStyle,
      componentClass: Component,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const isSvgIcon =
      typeof icon === 'object' && _.get(icon, ['constructor', 'name']) === 'BrowserSpriteSymbol';

    const classes = classNames('icon', className, {
      [addPrefix(icon)]: !isSvgIcon,
      [addPrefix(size)]: size,
      [addPrefix('fw')]: fixedWidth,
      [addPrefix('spin')]: spin,
      [addPrefix('pulse')]: pulse,
      [addPrefix(`flip-${flip || ''}`)]: flip,
      [addPrefix(`rotate-${rotate || ''}`)]: rotate,
      [addPrefix(`stack-${stack || ''}`)]: stack
    });

    if (isSvgIcon && typeof icon === 'object') {
      return (
        <Component {...props} className={classes}>
          <svg style={svgStyle} viewBox={icon.viewBox}>
            <use xlinkHref={`#${icon.id}`} />
          </svg>
        </Component>
      );
    }

    return <Component {...props} className={classes} />;
  }
}

export default defaultProps({
  componentClass: 'i',
  classPrefix: 'icon'
})(Icon);
