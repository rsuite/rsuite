import React from 'react';
import classNames from 'classnames';
import Icon from '@rsuite/icons/Icon';
import { useRouter } from 'next/router';
import { Button } from 'rsuite';
import { Language } from '@/components/icons';
import styles from './PageToolbar.module.scss';

interface ButtonProps {
  className?: string;
  [key: string]: any;
}

const LanguageButton = React.forwardRef((props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
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
    <Button
      {...rest}
      ref={ref}
      size="sm"
      className={classNames(styles['btn-switch-language'], className)}
      startIcon={<Icon as={Language} />}
      onClick={handleChangeLanguage}
    >
      {isZH ? 'English' : '中文'}
    </Button>
  );
});

LanguageButton.displayName = 'LanguageButton';

export default LanguageButton;
