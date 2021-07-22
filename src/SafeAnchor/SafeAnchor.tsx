import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { KEY_VALUES } from '../utils/constants';

export interface SafeAnchorProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** Link specified url */
  href?: string;

  /** A link can show it is currently unable to be interacted with */
  disabled?: boolean;
}

function isTrivialHref(href: string) {
  return !href || href.trim() === '#';
}

const SafeAnchor: RsRefForwardingComponent<'a', SafeAnchorProps> = React.forwardRef(
  (props: SafeAnchorProps, ref) => {
    const { as: Component = 'a', href, disabled, onClick, onKeyDown, ...restProps } = props;
    const handleClick = useCallback(
      event => {
        if (disabled || isTrivialHref(href)) {
          event.preventDefault();
        }

        if (disabled) {
          event.stopPropagation();
          return;
        }

        onClick?.(event);
      },
      [disabled, href, onClick]
    );

    const handleKeyDown = useCallback(
      event => {
        if (event.key === KEY_VALUES.SPACE) {
          event.preventDefault();
          handleClick(event);
        }
        onKeyDown?.(event);
      },
      [handleClick, onKeyDown]
    );

    // There are default role and href attributes on the node to ensure Focus management and keyboard interactions.
    const trivialProps = isTrivialHref(href) ? { role: 'button', href: '#' } : null;

    if (disabled) {
      restProps.tabIndex = -1;
      restProps['aria-disabled'] = true;
    }

    return (
      <Component
        ref={ref}
        href={href}
        {...trivialProps}
        {...restProps}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.elementType
};

export default SafeAnchor;
