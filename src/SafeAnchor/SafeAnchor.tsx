import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface SafeAnchorProps extends WithAsProps, React.HTMLAttributes<HTMLAnchorElement> {
  /** Link specified url */
  href?: string;

  /** A link can show it is currently unable to be interacted with */
  disabled?: boolean;
}

const SafeAnchor: RsRefForwardingComponent<'a', SafeAnchorProps> = React.forwardRef(
  (props: SafeAnchorProps, ref) => {
    const { as: Component = 'a', href, disabled, onClick, ...rest } = props;
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClick?.(event);
      },
      [onClick, disabled]
    );

    if (disabled) {
      rest.tabIndex = -1;
      rest['aria-disabled'] = true;
    }
    if (!href || href !== '#') {
      rest.role = rest.role || 'button';
    }

    return <Component {...rest} href={href} ref={ref} onClick={handleClick} />;
  }
);

SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  disabled: PropTypes.bool,
  as: PropTypes.elementType
};

export default SafeAnchor;
