import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import * as SvgIcons from '@/components/SvgIcons';
import Icon from '@rsuite/icons/Icon';

interface ButtonProps {
  className?: string;
  [key: string]: any;
}

const LanguageButton = React.forwardRef((props: ButtonProps, ref: React.Ref<HTMLElement>) => {
  const router = useRouter();
  const { className, ...rest } = props;
  const isZH = router.locale === 'zh';

  const handleChangeLanguage = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      const nextLocale = isZH ? 'en' : 'zh';

      // https://nextjs.org/docs/advanced-features/i18n-routing#transition-between-locales
      router.push(
        {
          pathname: router.pathname,
          query: router.query
        },
        router.asPath,
        { locale: nextLocale }
      );
    },
    [router, isZH]
  );

  return (
    <IconButton
      {...rest}
      ref={ref}
      size="sm"
      className={classnames('btn-switch-language', className)}
      appearance="subtle"
      icon={<Icon as={SvgIcons.Language} />}
      onClick={handleChangeLanguage}
    >
      {isZH ? 'English' : '中文'}
    </IconButton>
  );
});

LanguageButton.displayName = 'LanguageButton';

export default LanguageButton;
