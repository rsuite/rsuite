import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames, useUniqueId } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, SizeType } from '@/internals/types';

export interface LoaderProps extends WithAsProps {
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
  size?: SizeType;
}

/**
 * The `Loader` component is used to indicate the loading state of a page or a section.
 * @see https://rsuitejs.com/components/loader
 */
const Loader = forwardRef<'div', LoaderProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Loader', props);
  const {
    as: Component = 'div',
    classPrefix = 'loader',
    className,
    inverse,
    backdrop,
    speed = 'normal',
    center,
    vertical,
    content,
    size,
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const labelId = useUniqueId('loader-label-');

  const classes = merge(
    className,
    prefix('wrapper', `speed-${speed}`, size, {
      'backdrop-wrapper': backdrop,
      vertical,
      inverse,
      center
    })
  );

  return (
    <Component
      role="status"
      aria-labelledby={content ? labelId : undefined}
      {...rest}
      ref={ref}
      className={classes}
    >
      {backdrop && <div className={prefix('backdrop')} />}
      <div className={withClassPrefix()}>
        <span className={prefix('spin')} />
        {content && (
          <span id={labelId} className={prefix('content')}>
            {content}
          </span>
        )}
      </div>
    </Component>
  );
});

Loader.displayName = 'Loader';

export default Loader;
