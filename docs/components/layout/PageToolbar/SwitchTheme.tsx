import React from 'react';
import ThemeIcon from '@/components/ThemeIcon';
import { CustomProviderProps, RadioGroup, Radio } from 'rsuite';
import { useApp } from '@/hooks/useApp';

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
    <RadioGroup className="theme-switch" value={themeName} onChange={handleChangeTheme}>
      <p>{locales.common.theme}</p>

      {themesConfig.map(item => {
        return (
          <div className="theme-item" key={item.value}>
            <div
              className="item-name"
              tabIndex={-1}
              role="button"
              onClick={() => handleChangeTheme(item.value as Theme)}
            >
              <ThemeIcon theme={item.value as Theme} />
              {item.name}
            </div>
            <Radio value={item.value} />
          </div>
        );
      })}
    </RadioGroup>
  );
}
