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
  return <NextLink ref={ref} {...props} />;
});
