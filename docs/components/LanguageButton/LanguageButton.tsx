import * as React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'rsuite';
import { ButtonProps } from 'rsuite/lib/Button';
import AppContext from '../AppContext';

function LanguageButton(props: ButtonProps) {
  const router = useRouter();
  const { language, onChangeLanguage } = React.useContext(AppContext);
  const { appearance = 'subtle', className, ...rest } = props;
  const en = language === 'en';

  const handleChangeLanguage = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      onChangeLanguage?.(en ? 'zh' : 'en');
      const pathname = router.pathname;
      const as = en ? pathname : `/en${pathname}`;

      router.push(pathname, as);
    },
    [language]
  );

  return (
    <Button
      {...rest}
      className={classnames('btn-switch-language', className)}
      appearance={appearance}
      onClick={handleChangeLanguage}
    >
      {en ? '中文' : 'EN'}
    </Button>
  );
}

export default LanguageButton;
