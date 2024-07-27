import { Nav } from 'rsuite';
import { useApp, Theme } from '@/components/AppContext';
import { Icon } from '@rsuite/icons';
import { MdContrast, MdLightMode, MdDarkMode } from 'react-icons/md';

function ThemeGroup() {
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
    <Nav appearance={'pills' as any}>
      {themesConfig.map(item => (
        <Nav.Item
          key={item.value}
          active={themeName === item.value}
          onClick={() => onChangeTheme(item.value as Theme)}
          icon={<Icon as={item.icon} />}
        >
          {item.name}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default ThemeGroup;
