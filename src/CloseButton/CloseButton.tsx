import React from 'react';
import Close from '@rsuite/icons/Close';

import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { useClassNames, useCustom } from '../utils';
import { CloseButtonLocale } from '../locales';

export interface CloseButtonProps extends WithAsProps {
  /** Custom locale */
  locale?: CloseButtonLocale;
}

/**
 * Close button for components such as Message and Notification.
 */
const CloseButton: RsRefForwardingComponent<'button', CloseButtonProps> = React.forwardRef(
  (props: CloseButtonProps, ref) => {
    const {
      as: Component = 'button',
      classPrefix = 'btn-close',
      className,
      locale: overrideLocale,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const { locale } = useCustom<CloseButtonLocale>('CloseButton', overrideLocale);

    const classes = merge(className, withClassPrefix());
    return (
      <Component
        type="button"
        ref={ref}
        className={classes}
        aria-label={locale?.closeLabel}
        {...rest}
      >
        <Close />
      </Component>
    );
  }
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
