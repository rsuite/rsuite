import * as React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button, Icon } from 'rsuite';
import AppContext from '../AppContext';
import * as SvgIcons from '@/components/SvgIcons';

interface ButtonProps {
  className?: string;
  [key: string]: any;
}

function LanguageButton(props: ButtonProps) {
  const router = useRouter();
  const { language, onChangeLanguage } = React.useContext(AppContext);
  const { className, ...rest } = props;
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
      appearance="subtle"
      onClick={handleChangeLanguage}
    >
      <Icon icon={SvgIcons.Language} /> {en ? '中文' : 'English'}
    </Button>
  );
}

export default LanguageButton;
