import React from 'react';
import { CustomProviderProps, RadioGroup, Radio } from 'rsuite';
import Icon from '@rsuite/icons/Icon';
import { Light, Dark, HighContrast } from '@/components/SvgIcons';
import { useApp } from '@/components/AppContext';

interface SwitchThemeProps {
  onClose: () => void;
}

export function SwitchTheme({ onClose }: SwitchThemeProps) {
  const {
    theme: [themeName],
    locales,
    onChangeTheme
  } = useApp();

  const themesConfig = [
    {
      value: 'light',
      name: locales.common.light,
      icon: Light
    },
    {
      value: 'dark',
      name: locales.common.dark,
      icon: Dark
    },
    {
      value: 'high-contrast',
      name: locales.common.highContrast,
      icon: HighContrast
    }
  ];

  const handleChangeTheme = (value: CustomProviderProps['theme']) => {
    onChangeTheme(value);
    onClose();
  };

  return (
    <RadioGroup className="theme-switch" value={themeName} onChange={handleChangeTheme}>
      <p>{locales.common.theme}</p>

      {themesConfig.map(item => (
        <div className="theme-item" key={item.value}>
          <div
            className="item-name"
            tabIndex={-1}
            role="button"
            onClick={() => handleChangeTheme(item.value as CustomProviderProps['theme'])}
          >
            <Icon as={item.icon} />
            {item.name}
          </div>
          <Radio value={item.value} />
        </div>
      ))}
    </RadioGroup>
  );
}
