import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { useClassNames, useCustom } from '../utils';

export interface CloseButtonLocaleType {
  closeLabel?: string;
}

export interface CloseButtonProps extends WithAsProps {
  locale?: CloseButtonLocaleType;
}

/**
 * Close button for components such as Message and Notification.
 */
const CloseButton: RsRefForwardingComponent<'button', CloseButtonProps> = React.forwardRef(
  (props: CloseButtonProps, ref) => {
    const {
      as: Component = 'span',
      classPrefix = 'btn-close',
      className,
      locale: overrideLocale,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const { locale } = useCustom<CloseButtonLocaleType>('CloseButton', overrideLocale);

    const classes = merge(className, withClassPrefix());
    return (
      <Component
        role="button"
        {...rest}
        ref={ref}
        className={classes}
        title={locale?.closeLabel}
        aria-label={locale?.closeLabel}
      >
        <span aria-hidden="true">&times;</span>
      </Component>
    );
  }
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
