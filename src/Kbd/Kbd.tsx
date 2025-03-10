import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, SizeType } from '@/internals/types';

export interface KbdProps extends WithAsProps {
  /**
   * Sets Kbd size.
   */
  size?: SizeType;
}

/**
 *
 * The `Kbd` component is used to display a Kbd.
 *
 * @see https://rsuitejs.com/components/kbd
 */
const Kbd = forwardRef<'kbd', KbdProps>((props: KbdProps, ref) => {
  const { propsWithDefaults } = useCustom('Kbd', props);
  const {
    as: Component = 'kbd',
    classPrefix = 'kbd',
    className,
    size = 'md',
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size));

  return <Component {...rest} ref={ref} className={classes} />;
});

Kbd.displayName = 'Kbd';

export default Kbd;
