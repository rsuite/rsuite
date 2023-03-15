import React from 'react';
import NextLink, { LinkProps } from 'next/link';

interface MyLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default React.forwardRef(function Link(
  props: MyLinkProps,
  ref: React.RefObject<HTMLAnchorElement>
) {
  const { as, href, prefetch, scroll, passHref, replace, shallow, className, ...rest } = props;
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      scroll={scroll}
      passHref={passHref}
      replace={replace}
      shallow={shallow}
    >
      <a ref={ref} className={className} {...rest} />
    </NextLink>
  );
});
