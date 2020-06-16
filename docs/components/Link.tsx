import * as React from 'react';
import NextLink, { LinkProps } from 'next/link';
import AppContext from './AppContext';

interface MyLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

const paths = {
  en: '',
  zh: '/zh'
};

export const languageToPath = language => paths[language] || '';

export default React.forwardRef(function Link(
  props: MyLinkProps,
  ref: React.RefObject<HTMLAnchorElement>
) {
  const { as, href, prefetch, scroll, passHref, replace, shallow, className, ...rest } = props;
  const { language } = React.useContext(AppContext);
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as ? as : `${languageToPath(language)}${href}`}
      scroll={scroll}
      passHref={passHref}
      replace={replace}
      shallow={shallow}
    >
      <a ref={ref} className={className} {...rest} />
    </NextLink>
  );
});
