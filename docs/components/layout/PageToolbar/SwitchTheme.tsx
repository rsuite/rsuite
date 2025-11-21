import React from 'react';
import ThemeIcon from '@/components/ThemeIcon';
import { CustomProviderProps, Box, HStack } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { FaCheck } from 'react-icons/fa';
import styles from './PageToolbar.module.scss';

interface SwitchThemeProps {
  onClose: () => void;
}

type Theme = CustomProviderProps['theme'];

export function SwitchTheme({ onClose }: SwitchThemeProps) {
  const {
    theme: [themeName],
    locales,
    onChangeTheme
  } = useApp();

  const themesConfig = [
    {
      value: 'light',
      name: locales.common.light
    },
    {
      value: 'dark',
      name: locales.common.dark
    },
    {
      value: 'high-contrast',
      name: locales.common.highContrast
    }
  ];

  const handleChangeTheme = (value: Theme) => {
    onChangeTheme(value);
    onClose();
  };

  return (
    <Box className={styles['theme-switch']}>
      <p>{locales.common.theme}</p>

      {themesConfig.map(item => {
        return (
          <div
            className={styles['theme-item']}
            key={item.value}
            tabIndex={0}
            role="button"
            onClick={() => handleChangeTheme(item.value as Theme)}
          >
            <HStack>
              <ThemeIcon theme={item.value as Theme} />
              {item.name}
            </HStack>
            {themeName === item.value && <FaCheck />}
          </div>
        );
      })}
    </Box>
  );
}
