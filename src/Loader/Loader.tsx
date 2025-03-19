import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useUniqueId } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { Size } from '@/internals/types';

export interface LoaderProps extends BoxProps {
  /** Centered in the container */
  center?: boolean;

  /** Whether the background is displayed */
  backdrop?: boolean;

  /** An alternative dark visual style for the Loader */
  inverse?: boolean;

  /** The icon is displayed vertically with the text */
  vertical?: boolean;

  /** Custom descriptive text */
  content?: React.ReactNode;

  /** The speed at which the loader rotates */
  speed?: 'normal' | 'fast' | 'slow' | 'paused';

  /** A loader can have different sizes */
  size?: Size;
}

/**
 * The `Loader` component is used to indicate the loading state of a page or a section.
 * @see https://rsuitejs.com/components/loader
 */
const Loader = forwardRef<'div', LoaderProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Loader', props);
  const {
    as,
    classPrefix = 'loader',
    className,
    inverse,
    backdrop,
    speed = 'normal',
    center,
    vertical,
    content,
    size = 'sm',
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix, prefix } = useStyles(classPrefix);
  const labelId = useUniqueId('loader-label-');

  const classes = merge(
    className,
    prefix(`speed-${speed}`, size, {
      center: backdrop || center,
      vertical,
      inverse
    })
  );

  return (
    <Box
      as={as}
      role="status"
      aria-labelledby={content ? labelId : undefined}
      ref={ref}
      className={classes}
      {...rest}
    >
      {backdrop && <div className={prefix('backdrop')} />}
      <div className={withPrefix()}>
        <span className={prefix('spin')} />
        {content && (
          <span id={labelId} className={prefix('content')}>
            {content}
          </span>
        )}
      </div>
    </Box>
  );
});

Loader.displayName = 'Loader';

export default Loader;
