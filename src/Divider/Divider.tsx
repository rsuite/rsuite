import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

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
    const { propsWithDefaults } = useCustom('Divider', props);
    const {
      as: Component = 'div',
      className,
      classPrefix = 'divider',
      children,
      vertical,
      ...rest
    } = propsWithDefaults;

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

export default Divider;
