import React, { CSSProperties } from 'react';
import { useClassNames } from '@/internals/hooks';
import { ImageWrapper } from './ImageWrapper';
import { useImage } from './hooks/useImage';
import { useCustom } from '../CustomProvider';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface ImageProps
  extends WithAsProps,
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
    as: Component = 'img',
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

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ circle, bordered, rounded, shaded, zoomed }));
  const imgProps = { crossOrigin, srcSet, sizes, loading };
  const { imgSrc, isLoading } = useImage({ src, fallbackSrc, ...imgProps });

  const styles = { ...style, ['--rs-object-fit']: fit, ['--rs-object-position']: position };
  const wrapStyles = { width, height };

  const image = (
    <Component
      ref={ref}
      src={imgSrc}
      className={classes}
      style={styles}
      width={width}
      height={height}
      {...imgProps}
      {...rest}
    />
  );

  if (zoomed) {
    return <ImageWrapper style={wrapStyles}>{image}</ImageWrapper>;
  }

  if (placeholder) {
    return (
      <ImageWrapper style={wrapStyles}>
        {isLoading && placeholder}
        {image}
      </ImageWrapper>
    );
  }

  return image;
});

Image.displayName = 'Image';

export default Image;
