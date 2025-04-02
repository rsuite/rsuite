import React from 'react';
import ThemeIcon from '@/components/ThemeIcon';
import { Nav, NavProps } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { MdContrast, MdLightMode, MdDarkMode } from 'react-icons/md';
import type { Theme } from '@/components/AppProvider';

function ThemeGroup(props: NavProps) {
  const { theme, onChangeTheme, locales } = useApp();
  const [themeName] = theme;

  const themesConfig = [
    {
      value: 'light',
      name: locales.common.light,
      icon: MdLightMode
    },
    {
      value: 'dark',
      name: locales.common.dark,
      icon: MdDarkMode
    },
    {
      value: 'high-contrast',
      name: locales.common.highContrast,
      icon: MdContrast
    }
  ];

  return (
    <Nav appearance="pills" {...props}>
      {themesConfig.map(item => (
        <Nav.Item
          key={item.value}
          active={themeName === item.value}
          onClick={() => onChangeTheme(item.value as Theme)}
          icon={
            <ThemeIcon theme={item.value as Theme} className="rs-icon" width={22} height={21} />
          }
        >
          {item.name}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default ThemeGroup;
