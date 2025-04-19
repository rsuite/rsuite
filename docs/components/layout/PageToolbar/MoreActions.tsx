import React from 'react';
import canUseDOM from 'dom-lib/canUseDOM';
import Bug from '@rsuite/icons/legacy/Bug';
import Edit2 from '@rsuite/icons/legacy/Edit2';
import Twitter from '@rsuite/icons/legacy/Twitter';
import MenuIcon from '@rsuite/icons/Menu';
import Diamond from '@rsuite/icons/legacy/Diamond';
import Icon from '@rsuite/icons/Icon';
import { Ltr, Rtl } from '@/components/icons';
import { Whisper, Popover, Dropdown, IconButton, Toggle } from 'rsuite';
import { useApp } from '@/hooks/useApp';
import { SwitchTheme } from './SwitchTheme';

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
          <Dropdown.Menu>
            <Dropdown.Item panel className="more-actions-panel theme-panel">
              <SwitchTheme onClose={onClose} />
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item panel className="more-actions-panel">
              <div className="rtl-item">
                <div className="item-name">
                  <Icon as={DirectionIcon} />
                  RTL
                </div>
                <Toggle
                  size="sm"
                  onChange={() => {
                    onChangeDirection();
                    onClose();
                  }}
                  checked={isRtl}
                />
              </div>
            </Dropdown.Item>
            <Dropdown.Separator />
            {designHash && (
              <Dropdown.Item
                as="a"
                icon={<Diamond />}
                target="_blank"
                href={`/design/${themeName}/#s${designHash}`}
              >
                {locales?.common?.design}
              </Dropdown.Item>
            )}
            {routerId && language && (
              <Dropdown.Item
                as="a"
                icon={<Edit2 />}
                target="_blank"
                href={`https://github.com/rsuite/rsuite/edit/main/docs/pages${routerId}${localePath}/index.md`}
              >
                {locales?.common?.edit}
              </Dropdown.Item>
            )}

            <Dropdown.Item
              icon={<Bug />}
              as="a"
              target="_blank"
              href={
                'https://github.com/rsuite/rsuite/issues/new?assignees=&labels=&template=bug-report.yml'
              }
            >
              {locales?.common?.newIssues}
            </Dropdown.Item>
            {canUseDOM && (
              <Dropdown.Item
                as="a"
                icon={<Twitter />}
                target="_blank"
                href={`https://twitter.com/share?text=${document?.title}&url=${location?.href}`}
              >
                {locales.common.shareTwitter}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Popover>
      )}
    >
      <IconButton size="sm" icon={<MenuIcon />} />
    </Whisper>
  );
}
