import React from 'react';
import classNames from 'classnames';
import canUseDOM from 'dom-lib/canUseDOM';
import Bug from '@rsuite/icons/legacy/Bug';
import Edit2 from '@rsuite/icons/legacy/Edit2';
import Twitter from '@rsuite/icons/legacy/Twitter';
import SettingIcon from '@rsuite/icons/Setting';
import Diamond from '@rsuite/icons/legacy/Diamond';
import Icon from '@rsuite/icons/Icon';
import { Ltr, Rtl } from '@/components/icons';
import { Box, Whisper, Popover, Menu, IconButton, Toggle, HStack } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { SwitchTheme } from './SwitchTheme';
import styles from './PageToolbar.module.scss';

interface MoreActionsProps {
  designHash?: any;
  routerId?: string;
}

export function MoreActions({ designHash, routerId }: MoreActionsProps) {
  const {
    language,
    locales,
    localePath,
    theme: [themeName, direction],
    onChangeDirection
  } = useApp();

  const isRtl = direction === 'rtl';

  const DirectionIcon = isRtl ? Rtl : Ltr;

  return (
    <Whisper
      placement="autoVerticalEnd"
      trigger="click"
      speaker={({ onClose, left, top, className }, ref) => (
        <Popover ref={ref} className={className} style={{ left, top, width: '200px' }} full>
          <Menu>
            <Box className={classNames(styles['more-actions-panel'], styles['theme-panel'])}>
              <SwitchTheme onClose={onClose} />
            </Box>
            <Menu.Separator />
            <Box className={styles['more-actions-panel']}>
              <div className={styles['rtl-item']}>
                <HStack>
                  <Icon as={DirectionIcon} />
                  RTL
                </HStack>
                <Toggle
                  size="sm"
                  checked={isRtl}
                  tabIndex={0}
                  onChange={() => {
                    onChangeDirection();
                    onClose();
                  }}
                />
              </div>
            </Box>
            <Menu.Separator />
            {designHash && (
              <Menu.Item
                as="a"
                icon={<Diamond />}
                target="_blank"
                href={`/design/${themeName}/#s${designHash}`}
              >
                {locales?.common?.design}
              </Menu.Item>
            )}
            {routerId && language && (
              <Menu.Item
                as="a"
                icon={<Edit2 />}
                target="_blank"
                href={`https://github.com/rsuite/rsuite/edit/main/docs/pages${routerId}${localePath}/index.md`}
              >
                {locales?.common?.edit}
              </Menu.Item>
            )}

            <Menu.Item
              icon={<Bug />}
              as="a"
              target="_blank"
              href={
                'https://github.com/rsuite/rsuite/issues/new?assignees=&labels=&template=bug-report.yml'
              }
            >
              {locales?.common?.newIssues}
            </Menu.Item>
            {canUseDOM && (
              <Menu.Item
                as="a"
                icon={<Twitter />}
                target="_blank"
                href={`https://twitter.com/share?text=${document?.title}&url=${location?.href}`}
              >
                {locales.common.shareTwitter}
              </Menu.Item>
            )}
          </Menu>
        </Popover>
      )}
    >
      <IconButton size="sm" icon={<SettingIcon />} />
    </Whisper>
  );
}
