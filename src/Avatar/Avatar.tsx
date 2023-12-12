import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { AvatarGroupContext } from '../AvatarGroup/AvatarGroup';

export interface AvatarProps extends WithAsProps {
  /** A avatar can have different sizes */
  size?: TypeAttributes.Size;

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

  /** Set avatar shape to circle  */
  circle?: boolean;

  /** This attribute defines an alternative text description of the image */
  alt?: string;
}

/**
 * The Avatar component is used to represent user or brand.
 * @see https://rsuitejs.com/components/avatar
 */
const Avatar: RsRefForwardingComponent<'div', AvatarProps> = React.forwardRef(
  (props: AvatarProps, ref) => {
    const {
      classPrefix = 'avatar',
      as: Component = 'div',
      size: sizeProp,
      className,
      children,
      src,
      srcSet,
      sizes,
      imgProps,
      circle,
      alt,
      ...rest
    } = props;

    const { size } = useContext(AvatarGroupContext);
    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(sizeProp || size, { circle }));

    return (
      <Component {...rest} ref={ref} className={classes}>
        {src || srcSet ? (
          <img
            {...imgProps}
            className={prefix`image`}
            src={src}
            sizes={sizes}
            srcSet={srcSet}
            alt={alt}
          />
        ) : (
          children
        )}
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
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  src: PropTypes.string,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  imgProps: PropTypes.object,
  circle: PropTypes.bool,
  alt: PropTypes.string
};

export default Avatar;
