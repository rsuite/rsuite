import React, { useContext } from 'react';
import { CustomProviderProps, RadioGroup, Radio } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { Light, Dark, HighContrast } from '@/components/SvgIcons';
import AppContext from '@/components/AppContext';

interface SwitchThemeProps {
  onClose: () => void;
}

export function SwitchTheme({ onClose }: SwitchThemeProps) {
  const {
    theme: [themeName],
    messages,
    onChangeTheme
  } = useContext(AppContext);

  const themesConfig = [
    {
      value: 'light',
      name: messages.common.light,
      icon: Light
    },
    {
      value: 'dark',
      name: messages.common.dark,
      icon: Dark
    },
    {
      value: 'high-contrast',
      name: messages.common.highContrast,
      icon: HighContrast
    }
  ];

  const handleChangeTheme = (value: CustomProviderProps['theme']) => {
    onChangeTheme(value);
    onClose();
  };

  return (
    <RadioGroup className="theme-switch" value={themeName} onChange={handleChangeTheme}>
      <p>{messages.common.theme}</p>

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
