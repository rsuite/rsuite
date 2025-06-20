import React from 'react';
import ThemeIcon from '@/components/ThemeIcon';
import { SegmentedControl, SegmentedControlProps, HStack } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { MdContrast, MdLightMode, MdDarkMode } from 'react-icons/md';
import type { Theme } from '@/components/AppProvider';

function ThemeGroup(props: SegmentedControlProps) {
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

  const options = themesConfig.map(item => ({
    value: item.value,
    label: (
      <HStack>
        <ThemeIcon theme={item.value as Theme} className="rs-icon" width={22} height={21} />
        <span>{item.name}</span>
      </HStack>
    )
  }));

  return <SegmentedControl data={options} value={themeName} onChange={onChangeTheme} {...props} />;
}

export default ThemeGroup;
