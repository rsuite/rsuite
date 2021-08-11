import React, { useContext } from 'react';
import { CustomProviderProps, Dropdown, IconButton, Popover, Whisper } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { Light, Dark } from '@/components/SvgIcons';
import AppContext from '@/components/AppContext';

export function SwitchTheme() {
  const {
    theme: [themeName],
    onChangeTheme
  } = useContext(AppContext);

  const ThemeIcon =
    {
      light: Light,
      dark: Dark,
      'high-contrast': Dark
    }[themeName] ?? Light;

  return (
    <Whisper
      trigger="click"
      placement="bottomEnd"
      speaker={({ onClose, left, top, className }, ref) => (
        <Popover ref={ref} className={className} style={{ left, top }} full>
          <Dropdown.Menu
            activeKey={themeName}
            onSelect={eventKey => {
              onChangeTheme(eventKey as CustomProviderProps['theme']);
              onClose();
            }}
          >
            <Dropdown.Item eventKey="light" icon={<Icon as={Light} />}>
              Light
            </Dropdown.Item>
            <Dropdown.Item eventKey="dark" icon={<Icon as={Dark} />}>
              Dark
            </Dropdown.Item>
            <Dropdown.Item eventKey="high-contrast">High contrast</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      )}
    >
      <IconButton appearance="subtle" size="sm" icon={<Icon as={ThemeIcon} />} />
    </Whisper>
  );
}
