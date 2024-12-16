import React, { CSSProperties } from 'react';
import { useCustom } from '../CustomProvider';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

export interface ImageProps extends WithAsProps, React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * An image may appear rounded.
   */
  rounded?: boolean;

  /**
   * An image may appear circular.
   */
  circle?: boolean;

  /**
   * An image may appear with border.
   */
  bordered?: boolean;

  /**
   * Whether there is a shadow.
   */
  shaded?: boolean;

  /**
   * The fallback image when the src fails to load.
   */
  fallbackSrc?: string;

  /**
   * It maps to css `object-fit` property.
   */
  fit?: CSSProperties['objectFit'];

  /**
   * It maps to css `object-position` property.
   */
  position?: CSSProperties['objectPosition'];

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
      rounded,
      shaded,
      style,
      position,
      zoomed,
      ...rest
    } = propsWithDefaults;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({ circle, bordered, rounded, shaded, zoomed })
    );

    const styles = { ...style, ['--rs-object-fit']: fit, ['--rs-object-position']: position };

    return <Component ref={ref} className={classes} style={styles} {...rest} />;
  }
);

Image.displayName = 'Image';

export default Image;
