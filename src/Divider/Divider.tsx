import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

export interface DividerProps extends WithAsProps {
  /**
   * Vertical dividing line. Cannot be used with text.
   */
  vertical?: boolean;
}

/**
 * The Divider component is used to separate content.
 * @see https://rsuitejs.com/components/divider
 */
const Divider: RsRefForwardingComponent<'div', DividerProps> = React.forwardRef(
  (props: DividerProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'divider',
      children,
      vertical,
      ...rest
    } = props;
    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix(vertical ? 'vertical' : 'horizontal', {
        'with-text': children
      })
    );

    return (
      <Component
        role="separator"
        {...rest}
        ref={ref}
        className={classes}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        {children && <span className={prefix('inner-text')}>{children}</span>}
      </Component>
    );
  }
);

Divider.displayName = 'Divider';
Divider.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool
};

export default Divider;
