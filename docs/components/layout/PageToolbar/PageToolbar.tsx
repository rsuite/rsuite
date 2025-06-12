import React, { useEffect } from 'react';
import HeartIcon from '@rsuite/icons/Heart';
import canUseDOM from 'dom-lib/canUseDOM';
import LanguageButton from './LanguageButton';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import packageJson from '../../../package.json';
import {
  ButtonToolbar,
  Tooltip,
  Whisper,
  Menu,
  IconButton,
  Button,
  Popover,
  Text,
  HStack
} from 'rsuite';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { useApp } from '@/hooks/useApp';
import { MoreActions } from './MoreActions';
import styles from './PageToolbar.module.scss';

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
      version: '4.11.1',
      url: 'https://v4.rsuitejs.com/'
    },
    {
      id: 'v3',
      name: locales?.common?.v3,
      version: '3.8.13',
      url: 'https://v3.rsuitejs.com/'
    }
  ];

  useEffect(() => {
    setShow(canUseDOM);
  }, []);

  return show ? (
    <ButtonToolbar className={styles['page-toolbar']}>
      <IconButton
        size="sm"
        icon={<HeartIcon color="red" />}
        href="https://opencollective.com/rsuite"
        target="_blank"
      />
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={({ className }, ref) => {
          return (
            <Popover ref={ref} className={className} full>
              <Menu>
                {versions.map(version => (
                  <Menu.Item key={version.id} as="a" href={version.url} target="_blank">
                    <HStack justify="space-between">
                      <HStack>
                        {version.name}
                        <Text as="span" muted className={styles['version']}>
                          (v{version.version})
                        </Text>
                      </HStack>
                      <MdOutlineOpenInNew />
                    </HStack>
                  </Menu.Item>
                ))}
              </Menu>
            </Popover>
          );
        }}
      >
        <Button size="sm" endIcon={<ArrowDownLineIcon />}>
          v{packageJson.version}
        </Button>
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
