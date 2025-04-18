import React, { CSSProperties } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import { ImageWrapper } from './ImageWrapper';
import { useImage } from './hooks/useImage';

export interface ImageProps
  extends Omit<BoxProps, 'rounded'>,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /**
   * An image may appear with border.
   */
  bordered?: boolean;

  /**
   * An image may appear circular.
   */
  circle?: boolean;

  /**
   * The fallback image when the src fails to load.
   */
  fallbackSrc?: string;

  /**
   * An image may appear rounded.
   */
  rounded?: boolean;

  /**
   * Whether there is a shadow.
   */
  shaded?: boolean;

  /**
   * It maps to css `object-fit` property.
   */
  fit?: CSSProperties['objectFit'];

  /**
   * It maps to css `object-position` property.
   */
  position?: CSSProperties['objectPosition'];

  /**
   * The placeholder to display when the image is loading.
   */
  placeholder?: React.ReactNode;

  /**
   * Whether the image should be zoomed when hovered.
   */
  zoomed?: boolean;
}

const Image = forwardRef<'img', ImageProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Image', props);
  const {
    as = 'img',
    bordered,
    classPrefix = 'image',
    className,
    circle,
    crossOrigin,
    fit,
    fallbackSrc,
    loading,
    rounded,
    srcSet,
    sizes,
    shaded,
    src,
    style,
    position,
    placeholder,
    width,
    height,
    zoomed,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ circle, bordered, rounded, shaded, zoomed }));
  const { imgSrc, isLoading, onLoad, onError } = useImage({ src, fallbackSrc });

  const styles = { ...style, ['--rs-object-fit']: fit, ['--rs-object-position']: position };

  const image = (
    <Box
      as={as}
      ref={ref}
      src={imgSrc}
      className={classes}
      style={styles}
      width={width}
      height={height}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      crossOrigin={crossOrigin}
      srcSet={srcSet}
      sizes={sizes}
      {...rest}
    />
  );

  if (zoomed) {
    return (
      <ImageWrapper w={width} h={height}>
        {image}
      </ImageWrapper>
    );
  }

  if (placeholder) {
    return (
      <ImageWrapper w={width} h={height}>
        {isLoading && placeholder}
        {image}
      </ImageWrapper>
    );
  }

  return image;
});

Image.displayName = 'Image';

export default Image;
