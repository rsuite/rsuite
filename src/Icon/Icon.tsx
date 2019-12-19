import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';
import { IconProps } from './Icon.d';
import { SVGIcon } from '../@types/common';

class Icon extends React.Component<IconProps> {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    componentClass: PropTypes.elementType,
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    flip: PropTypes.oneOf(['horizontal', 'vertical']),
    stack: PropTypes.oneOf(['1x', '2x']),
    rotate: PropTypes.number,
    fixedWidth: PropTypes.bool,
    svgStyle: PropTypes.object,
    spin: PropTypes.bool,
    pulse: PropTypes.bool,
    inverse: PropTypes.bool
  };
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
      style,
      svgStyle,
      componentClass: Component,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const isSvgIcon = typeof icon === 'object' && icon.id && icon.viewBox;

    const classes = classNames(className, classPrefix, {
      [addPrefix(typeof icon === 'string' ? icon : '')]: !isSvgIcon,
      [addPrefix('fw')]: fixedWidth,
      [addPrefix('spin')]: spin,
      [addPrefix('pulse')]: pulse,
      [addPrefix(`size-${size || ''}`)]: size,
      [addPrefix(`flip-${flip || ''}`)]: flip,
      [addPrefix(`stack-${stack || ''}`)]: stack,
      [addPrefix('inverse')]: inverse
    });

    const styles = rotate ? { transform: `rotate(${rotate}deg)`, ...style } : style;

    if (isSvgIcon) {
      const svgIcon = icon as SVGIcon;
      return (
        <Component {...props} className={classes} style={styles}>
          <svg style={svgStyle} viewBox={svgIcon.viewBox}>
            <use xlinkHref={`#${svgIcon.id}`} />
          </svg>
        </Component>
      );
    }

    return <Component {...props} className={classes} style={styles} />;
  }
}

export default defaultProps<IconProps>({
  componentClass: 'i',
  classPrefix: 'icon'
})(Icon);
