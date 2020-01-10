import * as React from 'react';
import classnames from 'classnames';
import { Button } from 'rsuite';
import { ButtonProps } from 'rsuite/lib/Button';

export type LanguageType = 'en-US' | 'zh-CN';

interface LanguageButtonProps extends ButtonProps {
  language?: LanguageType;
  onClick?: (event: React.MouseEvent) => void;
}

function LanguageButton(props: LanguageButtonProps) {
  const { language, appearance = 'subtle', className, ...rest } = props;

  function handleChangeLanguage(event: React.MouseEvent) {
    const isEN = language === 'en-US';
    localStorage.setItem('localeKey', isEN ? 'zh-CN' : 'en-US');
    props.onClick?.(event);
  }

  return (
    <Button
      {...rest}
      className={classnames('language-switch-button', className)}
      appearance={appearance}
      onClick={handleChangeLanguage}
    >
      {language === 'en-US' ? '中文' : 'EN'}
    </Button>
  );
}

export default LanguageButton;
