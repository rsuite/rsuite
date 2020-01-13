import * as React from 'react';
import NextLink, { LinkProps } from 'next/link';

export default function Link(props: LinkProps & { children?: React.ReactNode }) {
  const { as, href, prefetch, scroll, passHref, replace, shallow, ...rest } = props;
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
      <a {...rest} />
    </NextLink>
  );
}
