import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import AppContext from '../AppContext';
import * as SvgIcons from '@/components/SvgIcons';
import { languageToPath } from '@/components/Link';
import { Icon } from '@rsuite/icons';

interface ButtonProps {
  className?: string;
  [key: string]: any;
}

const LanguageButton = React.forwardRef((props: ButtonProps, ref) => {
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
    [onChangeLanguage, router, isZH]
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
