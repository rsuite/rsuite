import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../../CustomProvider';
import type { WithAsProps } from '@/internals/types';

type LocaleKey = 'unfilled' | 'notSelected' | 'notUploaded';

export interface PlaintextProps extends WithAsProps {
  placeholder?: React.ReactNode;
  localeKey?: LocaleKey;
}

/**
 * Make the component display in plain text, and display default characters when there is no children.
 * @private
 */
const Plaintext = forwardRef<'div', PlaintextProps>((props, ref) => {
  const { getLocale } = useCustom();
  const {
    as: Component = 'div',
    classPrefix = 'plaintext',
    className,
    children,
    localeKey = '',
    placeholder = getLocale('Plaintext')[localeKey] || '',
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ empty: !children }));

  return (
    <Component role="text" {...rest} ref={ref} className={classes}>
      {children ? children : placeholder}
    </Component>
  );
});

Plaintext.displayName = 'Plaintext';

export default Plaintext;
