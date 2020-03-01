import * as React from 'react';
import NextLink, { LinkProps } from 'next/link';
import AppContext from './AppContext';

interface MyLinkProps extends LinkProps {
  children?: React.ReactNode;
}

export default React.forwardRef(function Link(
  props: MyLinkProps,
  ref: React.RefObject<HTMLAnchorElement>
) {
  const { as, href, prefetch, scroll, passHref, replace, shallow, ...rest } = props;
  const { localePath } = React.useContext(AppContext);
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as ? as : `${localePath}${href}`}
      scroll={scroll}
      passHref={passHref}
      replace={replace}
      shallow={shallow}
    >
      <a ref={ref} {...rest} />
    </NextLink>
  );
});
