import React, { useEffect } from 'react';
import HeartIcon from '@rsuite/icons/legacy/HeartO';
import canUseDOM from 'dom-lib/canUseDOM';
import LanguageButton from './LanguageButton';
import packageJson from '../../../package.json';
import { ButtonToolbar, Tooltip, Whisper, Menu, IconButton, Button, Popover } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { MoreActions } from './MoreActions';

interface PageToolbarProps {
  designHash?: any;
  routerId?: string;
}

function PageToolbar({ designHash, routerId }: PageToolbarProps) {
  const { locales } = useApp();

  const [show, setShow] = React.useState(false);

  const versions = [
    {
      id: 'v4',
      name: locales?.common?.v4,
      url: 'https://v4.rsuitejs.com/'
    },
    {
      id: 'v3',
      name: locales?.common?.v3,
      url: 'https://v3.rsuitejs.com/'
    }
  ];

  useEffect(() => {
    setShow(canUseDOM);
  }, []);

  return show ? (
    <ButtonToolbar className="page-toolbar">
      <IconButton
        size="sm"
        icon={<HeartIcon color="red" />}
        href="https://opencollective.com/rsuite"
        target="_blank"
      />
      <Whisper
        placement="autoVertical"
        trigger="click"
        speaker={({ className }, ref) => {
          return (
            <Popover ref={ref} className={className} full>
              <Menu>
                {versions.map(version => (
                  <Menu.Item key={version.id} as="a" href={version.url}>
                    {version.name}
                  </Menu.Item>
                ))}
              </Menu>
            </Popover>
          );
        }}
      >
        <Button size="sm">{packageJson.version}</Button>
      </Whisper>
      <Whisper
        placement="autoVertical"
        speaker={<Tooltip>{locales?.common?.changeLanguage}</Tooltip>}
      >
        <LanguageButton />
      </Whisper>

      <MoreActions designHash={designHash} routerId={routerId} />
    </ButtonToolbar>
  ) : null;
}

export default PageToolbar;
