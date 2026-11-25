import React, { useCallback } from 'react';
import useCustomConfig from '@/internals/hooks/useCustomConfig';
import Box, { BaseBoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';

export interface SafeAnchorProps extends BaseBoxProps, React.HTMLAttributes<HTMLElement> {
  /** Link specified url */
  href?: string;

  /** A link can show it is currently unable to be interacted with */
  disabled?: boolean;
}

function isTrivialHref(href: string | undefined) {
  return !href || href.trim() === '#';
}

/**
 * A SafeAnchor is a wrapper around the `<a>` HTML element.
 * @private
 */
const SafeAnchor = forwardRef<'a', SafeAnchorProps>((props, ref) => {
  const { propsWithDefaults } = useCustomConfig('SafeAnchor', props);
  const { as = 'a', href, disabled, onClick, ...restProps } = propsWithDefaults;
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

  // There are default role and href attributes on the node to ensure Focus management and keyboard interactions.
  const trivialProps = isTrivialHref(href) ? { role: 'button', href: '#' } : null;

  if (disabled) {
    restProps.tabIndex = -1;
    restProps['aria-disabled'] = true;
  }

  return (
    <Box as={as} ref={ref} href={href} {...trivialProps} {...restProps} onClick={handleClick} />
  );
});

SafeAnchor.displayName = 'SafeAnchor';

export default SafeAnchor;
