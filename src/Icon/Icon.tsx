import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { SVGIcon, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconNames } from '../@types/icons';

export interface IconProps extends WithAsProps {
  /** You can use a custom element for this component */
  as?: React.ElementType;

  /** Icon name */
  icon: IconNames | SVGIcon;

  /** Sets the icon size */
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';

  /** Flip the icon */
  flip?: 'horizontal' | 'vertical';

  /** Combine multiple icons */
  stack?: '1x' | '2x';

  /** Rotate the icon */
  rotate?: number;

  /** Fixed icon width because there are many icons with uneven size */
  fixedWidth?: boolean;

  /** Set SVG style when using custom SVG Icon */
  svgStyle?: React.CSSProperties;

  /** Dynamic rotation icon */

  spin?: boolean;

  /** Use pulse to have it rotate with 8 steps */
  pulse?: boolean;

  /** Inverse color */
  inverse?: boolean;
}

const defaultProps: Partial<IconProps> = {
  as: 'i',
  classPrefix: 'icon'
};

const Icon: RsRefForwardingComponent<'i', IconProps> = React.forwardRef((props: IconProps, ref) => {
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
    as: Component,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const isSvgIcon = typeof icon === 'object' && icon.id && icon.viewBox;

  const classes = merge(
    className,
    withClassPrefix({
      [typeof icon === 'string' ? icon : '']: !isSvgIcon,
      [`size-${size}`]: size,
      [`flip-${flip}`]: flip,
      [`stack-${stack}`]: stack,
      fw: fixedWidth,
      inverse,
      spin,
      pulse
    })
  );

  const styles = rotate ? { transform: `rotate(${rotate}deg)`, ...style } : style;

  if (isSvgIcon) {
    const svgIcon = icon as SVGIcon;
    return (
      <Component {...rest} ref={ref} className={classes} style={styles}>
        <svg style={svgStyle} viewBox={svgIcon.viewBox}>
          <use xlinkHref={`#${svgIcon.id}`} />
        </svg>
      </Component>
    );
  }

  return <Component {...rest} ref={ref} className={classes} style={styles} />;
});

Icon.displayName = 'Icon';
Icon.defaultProps = defaultProps;
Icon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType,
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

export default Icon;
