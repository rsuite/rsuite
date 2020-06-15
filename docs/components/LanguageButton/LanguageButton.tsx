import * as React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button, Icon } from 'rsuite';
import AppContext from '../AppContext';
import * as SvgIcons from '@/components/SvgIcons';
import { languageToPath } from '@/components/Link';

interface ButtonProps {
  className?: string;
  [key: string]: any;
}

function LanguageButton(props: ButtonProps) {
  const router = useRouter();
  const { language, onChangeLanguage } = React.useContext(AppContext);
  const { className, ...rest } = props;
  const isZH = language === 'zh';

  const handleChangeLanguage = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      const nextLanguage = isZH ? 'en' : 'zh';

      onChangeLanguage?.(nextLanguage);
      const pathname = router.pathname;

      router.push(pathname, `${languageToPath(nextLanguage)}${pathname}`);
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
      <Icon icon={SvgIcons.Language} /> {isZH ? 'English' : '中文'}
    </Button>
  );
}

export default LanguageButton;
