import React from 'react';
import Check from '@rsuite/icons/Check';

import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { useClassNames, useCustom } from '../utils';
import { CheckButtonLocale } from '../locales';

export interface CheckButtonProps extends WithAsProps {
  /** Custom locale */
  locale?: CheckButtonLocale;
}

/**
 * Check button for components such as Message and Notification.
 */
const CheckButton: RsRefForwardingComponent<'button', CheckButtonProps> = React.forwardRef(
  (props: CheckButtonProps, ref) => {
    const {
      as: Component = 'span',
      classPrefix = 'btn-check',
      className,
      locale: overrideLocale,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const { locale } = useCustom<CheckButtonLocale>('CheckButton', overrideLocale);

    const classes = merge(className, withClassPrefix());
    return (
      <Component
        role="button"
        {...rest}
        ref={ref}
        className={classes}
        title={locale?.checkLabel}
        aria-label={locale?.checkLabel}
      >
        <Check style={{ transform: 'scale(1.1)' }} />
      </Component>
    );
  }
);

CheckButton.displayName = 'CheckButton';

export default CheckButton;
