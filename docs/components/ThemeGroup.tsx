import React from 'react';
import ThemeIcon from '@/components/ThemeIcon';
import { SegmentedControl, SegmentedControlProps, HStack } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { MdContrast, MdLightMode, MdDarkMode } from 'react-icons/md';
import type { Theme } from '@/components/AppProvider';

interface ThemeGroupProps extends SegmentedControlProps {
  onChange: (theme: Theme) => void;
}

function ThemeGroup(props: ThemeGroupProps) {
  const { onChange, ...rest } = props;
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

  const handleChange = (value: string) => {
    onChange(value as Theme);
    onChangeTheme(value as Theme);
  };

  return <SegmentedControl data={options} value={themeName} onChange={handleChange} {...rest} />;
}

export default ThemeGroup;
