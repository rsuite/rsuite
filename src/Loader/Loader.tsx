import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';

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

const defaultProps: Partial<LoaderProps> = {
  as: 'div',
  classPrefix: 'loader',
  speed: 'normal'
};

const Loader: RsRefForwardingComponent<'div', LoaderProps> = React.forwardRef(
  (props: LoaderProps, ref) => {
    const {
      as: Component,
      classPrefix,
      className,
      inverse,
      backdrop,
      speed,
      center,
      vertical,
      content,
      size,
      ...rest
    } = props;

    const hasContent = !!content;
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const classes = merge(
      className,
      prefix('wrapper', `speed-${speed}`, size, {
        'backdrop-wrapper': backdrop,
        'has-content': hasContent,
        vertical,
        inverse,
        center
      })
    );

    return (
      <Component role="progressbar" {...rest} ref={ref} className={classes}>
        {backdrop && <div className={prefix('backdrop')} />}
        <div className={withClassPrefix()}>
          <span className={prefix('spin')} />
          {hasContent && <span className={prefix('content')}>{content}</span>}
        </div>
      </Component>
    );
  }
);

Loader.displayName = 'Loader';
Loader.defaultProps = defaultProps;
Loader.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  center: PropTypes.bool,
  backdrop: PropTypes.bool,
  inverse: PropTypes.bool,
  vertical: PropTypes.bool,
  content: PropTypes.node,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  speed: PropTypes.oneOf(['normal', 'fast', 'slow'])
};

export default Loader;
