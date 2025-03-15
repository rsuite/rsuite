import React, { useContext, useMemo, CSSProperties } from 'react';
import StyledBox from '@/internals/StyledBox';
import AvatarIcon from './AvatarIcon';
import useImage from './useImage';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import { AvatarGroupContext } from '../AvatarGroup/AvatarGroup';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, ColorScheme, Size } from '@/internals/types';
export interface AvatarProps extends WithAsProps {
  /**
   * A avatar can have different sizes.
   *
   * @default 'md'
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
  color?: ColorScheme | CSSProperties['color'];

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
const Avatar = forwardRef<'div', AvatarProps>((props: AvatarProps, ref) => {
  const { size: groupSize } = useContext(AvatarGroupContext);
  const { propsWithDefaults } = useCustom('Avatar', props);
  const {
    as = 'div',
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
  } = propsWithDefaults;

  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ circle, bordered }));
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
    <StyledBox
      as={as}
      name="avatar"
      size={size}
      color={color}
      ref={ref}
      className={classes}
      {...rest}
    >
      {src ? image : placeholder}
    </StyledBox>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
