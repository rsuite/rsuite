import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useUniqueId } from '@/internals/hooks';
import { oneOf } from '@/internals/propTypes';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '@/internals/types';

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
  speed?: 'normal' | 'fast' | 'slow';

  /** A loader can have different sizes */
  size?: TypeAttributes.Size;
}

/**
 * The `Loader` component is used to indicate the loading state of a page or a section.
 * @see https://rsuitejs.com/components/loader
 */
const Loader: RsRefForwardingComponent<'div', LoaderProps> = React.forwardRef(
  (props: LoaderProps, ref) => {
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
    } = props;

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
  }
);

Loader.displayName = 'Loader';
Loader.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  center: PropTypes.bool,
  backdrop: PropTypes.bool,
  inverse: PropTypes.bool,
  vertical: PropTypes.bool,
  content: PropTypes.node,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  speed: oneOf(['normal', 'fast', 'slow'])
};

export default Loader;
