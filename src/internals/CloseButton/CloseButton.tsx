import React from 'react';
import Close from '@rsuite/icons/Close';
import IconButton from '../../IconButton';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '../hooks';
import { useCustom } from '../../CustomProvider';
import { CloseButtonLocale } from '../../locales';
import type { WithAsProps } from '@/internals/types';

export interface CloseButtonProps extends WithAsProps {
  /** Custom locale */
  locale?: CloseButtonLocale;
}

/**
 * Close button for components such as Message and Notification.
 */
const CloseButton = forwardRef<'button', CloseButtonProps>((props, ref) => {
  const {
    as: Component = 'button',
    classPrefix = 'btn-close',
    className,
    locale: overrideLocale,
    ...rest
  } = props;
  const { getLocale } = useCustom();
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const { closeLabel } = getLocale('CloseButton', overrideLocale);
  const classes = merge(className, withClassPrefix());

  if (Component === IconButton) {
    return (
      <IconButton
        icon={<Close />}
        ref={ref}
        className={classes}
        aria-label={closeLabel}
        appearance="subtle"
        size="sm"
        {...rest}
      />
    );
  }

  return (
    <Component type="button" ref={ref} className={classes} aria-label={closeLabel} {...rest}>
      <Close />
    </Component>
  );
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;
