import { Nav, NavProps } from 'rsuite';
import { useApp, Theme } from '@/components/AppContext';
import Icon from '@rsuite/icons/Icon';
import { MdContrast, MdLightMode, MdDarkMode } from 'react-icons/md';

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
          icon={<Icon as={item.icon} />}
        >
          {item.name}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default ThemeGroup;
