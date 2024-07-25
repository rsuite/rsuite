import { ButtonGroup, Button } from 'rsuite';
import { useApp, Theme } from '@/components/AppContext';
import { Icon } from '@rsuite/icons';
import { Light, Dark, HighContrast } from '@/components/SvgIcons';

function ThemeGroup() {
  const { theme, onChangeTheme, locales } = useApp();
  const [themeName] = theme;

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

  return (
    <ButtonGroup>
      {themesConfig.map(item => (
        <Button
          active={themeName === item.value}
          key={item.value}
          onClick={() => onChangeTheme(item.value as Theme)}
          startIcon={<Icon as={item.icon} />}
        >
          {item.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ThemeGroup;
