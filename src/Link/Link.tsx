import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import SafeAnchor, { SafeAnchorProps } from '@/internals/SafeAnchor';
import ExternalLinkIcon from './ExternalLinkIcon';

export interface LinkProps extends SafeAnchorProps {
  /** The icon to be displayed after the link */
  anchorIcon?: React.ReactNode;

  /** Determines in which cases link should have text-decoration: underline styles, hover by default */
  underline?: 'always' | 'hover' | 'not-hover' | 'never';

  /** Whether the link is external */
  external?: boolean;

  /** Whether to show the anchor icon */
  showAnchorIcon?: boolean;
}

const Link = forwardRef<'a', LinkProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Link', props);
  const {
    as,
    anchorIcon,
    classPrefix = 'link',
    className,
    children,
    disabled,
    underline,
    showAnchorIcon,
    external,
    ...rest
  } = propsWithDefaults;

  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const icon = anchorIcon || <ExternalLinkIcon className={prefix('icon')} />;

  return (
    <SafeAnchor
      as={as}
      ref={ref}
      role="link"
      className={classes}
      disabled={disabled}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      data-underline={underline}
      data-disabled={disabled}
      {...rest}
    >
      {children}
      {showAnchorIcon && icon}
    </SafeAnchor>
  );
});

Link.displayName = 'Link';

export default Link;
