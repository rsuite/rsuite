import React from 'react';
import { ButtonToolbar, Tooltip, Whisper, Popover, Dropdown, IconButton } from 'rsuite';
import * as SvgIcons from '@/components/SvgIcons';
import canUseDOM from 'dom-lib/lib/query/canUseDOM';
import AppContext from '../AppContext';
import LanguageButton from '../LanguageButton';
import { Icon } from '@rsuite/icons';
import Diamond from '@rsuite/icons/legacy/Diamond';
import Edit2 from '@rsuite/icons/legacy/Edit2';
import Bug from '@rsuite/icons/legacy/Bug';
import Twitter from '@rsuite/icons/legacy/Twitter';

const MenuPopover = React.forwardRef(function MenuPopover({ children, ...rest }: any, ref) {
  return (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Popover>
  );
});
interface PageToolbarProps {
  designHash?: any;
  routerId?: string;
}

function PageToolbar({ designHash, routerId }: PageToolbarProps) {
  const {
    messages,
    language,
    localePath,
    theme: [themeName, direction],
    onChangeDirection,
    onChangeTheme
  } = React.useContext(AppContext);

  const ThemeIcon = props =>
    themeName === 'dark' ? <SvgIcons.Light {...props} /> : <SvgIcons.Dark {...props} />;

  const DirectionIcon = props =>
    direction === 'rtl' ? <SvgIcons.Rtl {...props} /> : <SvgIcons.Ltr {...props} />;

  return (
    <ButtonToolbar className="page-toolbar">
      <Whisper placement="bottom" speaker={<Tooltip>{messages?.common?.changeLanguage}</Tooltip>}>
        <LanguageButton />
      </Whisper>
      <Whisper placement="bottom" speaker={<Tooltip>Toggle light/dark theme</Tooltip>}>
        <IconButton
          size="sm"
          appearance="subtle"
          icon={<Icon as={ThemeIcon} />}
          onClick={onChangeTheme}
        />
      </Whisper>
      <Whisper placement="bottom" speaker={<Tooltip>Toggle RTL/LTR</Tooltip>}>
        <IconButton
          size="sm"
          appearance="subtle"
          icon={<Icon as={DirectionIcon} />}
          onClick={onChangeDirection}
        />
      </Whisper>
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={
          <MenuPopover>
            {designHash && (
              <Dropdown.Item
                as="a"
                icon={<Diamond />}
                target="_blank"
                href={`/design/${themeName}/#s${designHash}`}
              >
                {messages?.common?.design}
              </Dropdown.Item>
            )}
            {routerId && language && (
              <Dropdown.Item
                as="a"
                icon={<Edit2 />}
                target="_blank"
                href={`https://github.com/rsuite/rsuite/edit/master/docs/pages${routerId}${localePath}/index.md`}
              >
                {messages?.common?.edit}
              </Dropdown.Item>
            )}

            <Dropdown.Item
              icon={<Bug />}
              as="a"
              target="_blank"
              href={'https://github.com/rsuite/rsuite/issues/new?template=bug_report.md'}
            >
              {messages?.common?.newIssues}
            </Dropdown.Item>
            {canUseDOM && (
              <Dropdown.Item
                as="a"
                icon={<Twitter />}
                target="_blank"
                href={`https://twitter.com/share?text=${document?.title}&url=${location?.href}`}
              >
                {messages.common.shareTwitter}
              </Dropdown.Item>
            )}
          </MenuPopover>
        }
      >
        <IconButton size="sm" appearance="subtle" icon={<Icon as={SvgIcons.More} />} />
      </Whisper>
    </ButtonToolbar>
  );
}

export default PageToolbar;
