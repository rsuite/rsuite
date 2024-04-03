import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import { AvatarGroupContext, type Size } from '../AvatarGroup/AvatarGroup';
import { oneOf } from '../internals/propTypes';
import AvatarIcon from './AvatarIcon';
import useImage from './useImage';

export interface AvatarProps extends WithAsProps {
  /**
   * A avatar can have different sizes.
   *
   * @default 'md'
   * @version xxl and xs added in v5.59.0
   */
  size?: Size;

  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;

  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string;

  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet?: string;

  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;

  /**
   * Set avatar shape to circle
   */
  circle?: boolean;

  /**
   * This attribute defines an alternative text description of the image
   */
  alt?: string;

  /**
   * Show a border around the avatar.
   * @version 5.59.0
   */
  bordered?: boolean;

  /**
   * Sets the avatar background color.
   * @version 5.59.0
   */
  color?: TypeAttributes.Color;

  /**
   * Callback fired when the image failed to load.
   * @version 5.59.0
   */
  onError?: OnErrorEventHandler;
}

/**
 * The Avatar component is used to represent user or brand.
 * @see https://rsuitejs.com/components/avatar
 */
const Avatar: RsRefForwardingComponent<'div', AvatarProps> = React.forwardRef(
  (props: AvatarProps, ref) => {
    const { size: groupSize } = useContext(AvatarGroupContext);

    const {
      as: Component = 'div',
      bordered,
      alt,
      className,
      children,
      circle,
      color,
      classPrefix = 'avatar',
      size = groupSize,
      src,
      srcSet,
      sizes,
      imgProps,
      onError,
      ...rest
    } = props;

    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(size, color, { circle, bordered }));
    const imageProps = { ...imgProps, alt, src, srcSet, sizes };
    const { loaded } = useImage({ ...imageProps, onError });

    const altComponent = useMemo(() => {
      if (alt) {
        return (
          <span role="img" aria-label={alt}>
            {alt}
          </span>
        );
      }

      return null;
    }, [alt]);

    const placeholder = children || altComponent || <AvatarIcon className={prefix`icon`} />;
    const image = loaded ? <img {...imageProps} className={prefix`image`} /> : placeholder;

    return (
      <Component {...rest} ref={ref} className={classes}>
        {src ? image : placeholder}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';
Avatar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  size: oneOf(['xxl', 'xl', 'lg', 'md', 'sm', 'xs']),
  src: PropTypes.string,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  imgProps: PropTypes.object,
  circle: PropTypes.bool,
  alt: PropTypes.string
};

export default Avatar;
