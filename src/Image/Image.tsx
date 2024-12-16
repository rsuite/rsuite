import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { useCustom } from '../CustomProvider';
import { useClassNames } from '@/internals/hooks';
import { useImage } from './hooks/useImage';
import { ImageWrapper } from './ImageWrapper';

import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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

const Image: RsRefForwardingComponent<'img', ImageProps> = React.forwardRef(
  (props: ImageProps, ref: React.Ref<HTMLImageElement>) => {
    const { propsWithDefaults } = useCustom('Image', props);
    const {
      as: Component = 'img',
      bordered,
      classPrefix = 'image',
      className,
      circle,
      fit,
      fallbackSrc,
      rounded,
      shaded,
      src,
      style,
      position,
      placeholder,
      zoomed,
      width,
      height,
      ...rest
    } = propsWithDefaults;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({ circle, bordered, rounded, shaded, zoomed })
    );

    const { imgSrc, isLoading } = useImage({ src, fallbackSrc });

    const styles = { ...style, ['--rs-object-fit']: fit, ['--rs-object-position']: position };
    const wrapperStyles = { width, height };

    const image = (
      <Component
        ref={ref}
        src={imgSrc}
        className={classes}
        style={styles}
        width={width}
        height={height}
        {...rest}
      />
    );

    if (zoomed) {
      return <ImageWrapper style={wrapperStyles}>{image}</ImageWrapper>;
    }

    if (placeholder) {
      return (
        <ImageWrapper style={wrapperStyles}>
          {isLoading && placeholder}
          {image}
        </ImageWrapper>
      );
    }

    return image;
  }
);

Image.displayName = 'Image';
Image.propTypes = {
  bordered: PropTypes.bool,
  circle: PropTypes.bool,
  fallbackSrc: PropTypes.string,
  fit: PropTypes.string,
  position: PropTypes.string,
  rounded: PropTypes.bool,
  shaded: PropTypes.bool,
  placeholder: PropTypes.node,
  zoomed: PropTypes.bool
};

export default Image;
