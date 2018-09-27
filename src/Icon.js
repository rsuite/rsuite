// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps, prefix } from './utils';
import type { SVGIcon } from './utils/TypeDefinition';

type Props = {
  icon: string | SVGIcon,
  className?: string,
  classPrefix?: string,
  componentClass: React.ElementType,
  size?: 'lg' | '2x' | '3x' | '4x' | '5x',
  flip?: 'horizontal' | 'vertical',
  stack?: '1x' | '2x',
  rotate?: number,
  fixedWidth?: boolean,
  svgStyle?: Object,
  spin?: boolean,
  pulse?: boolean,
  inverse?: boolean
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
      inverse,
      svgStyle,
      componentClass: Component,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const isSvgIcon = typeof icon === 'object' && icon.id && icon.viewBox;

    const classes = classNames(classPrefix, className, {
      [addPrefix(icon)]: !isSvgIcon,
      [addPrefix(size)]: size,
      [addPrefix('fw')]: fixedWidth,
      [addPrefix('spin')]: spin,
      [addPrefix('pulse')]: pulse,
      [addPrefix(`flip-${flip || ''}`)]: flip,
      [addPrefix(`rotate-${rotate || ''}`)]: rotate,
      [addPrefix(`stack-${stack || ''}`)]: stack,
      [addPrefix('inverse')]: inverse
    });

    if (isSvgIcon) {
      const svgIcon: any = icon;
      return (
        <Component {...props} className={classes}>
          <svg style={svgStyle} viewBox={svgIcon.viewBox}>
            <use xlinkHref={`#${svgIcon.id}`} />
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
