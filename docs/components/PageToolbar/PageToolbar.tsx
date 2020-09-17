import * as React from 'react';
import { ButtonToolbar, Tooltip, Whisper, Popover, Icon, Dropdown, IconButton } from 'rsuite';
import * as SvgIcons from '@/components/SvgIcons';
import canUseDOM from 'dom-lib/lib/query/canUseDOM';
import AppContext from '../AppContext';
import LanguageButton from '../LanguageButton';

const MenuPopover = ({ children, ...rest }: any) => (
  <Popover {...rest} full>
    <Dropdown.Menu>{children}</Dropdown.Menu>
  </Popover>
);
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
  return (
    <ButtonToolbar className="page-toolbar">
      <Whisper placement="bottom" speaker={<Tooltip>{messages?.common?.changeLanguage}</Tooltip>}>
        <LanguageButton />
      </Whisper>
      <Whisper placement="bottom" speaker={<Tooltip>Toggle light/dark theme</Tooltip>}>
        <IconButton
          appearance="subtle"
          icon={<Icon icon={themeName === 'dark' ? SvgIcons.Light : SvgIcons.Dark} />}
          onClick={onChangeTheme}
        />
      </Whisper>
      <Whisper placement="bottom" speaker={<Tooltip>Toggle RTL/LTR</Tooltip>}>
        <IconButton
          appearance="subtle"
          icon={<Icon icon={direction === 'rtl' ? SvgIcons.Rtl : SvgIcons.Ltr} />}
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
                icon={<Icon icon="diamond" />}
                target="_blank"
                href={`/design/${themeName}/#artboard${designHash}`}
              >
                {messages?.common?.design}
              </Dropdown.Item>
            )}
            {routerId && language && (
              <Dropdown.Item
                icon={<Icon icon="edit2" />}
                target="_blank"
                href={`https://github.com/rsuite/rsuite/edit/master/docs/pages${routerId}${localePath}/index.md`}
              >
                {messages?.common?.edit}
              </Dropdown.Item>
            )}

            <Dropdown.Item
              icon={<Icon icon="bug" />}
              target="_blank"
              href={'https://github.com/rsuite/rsuite/issues/new?template=bug_report.md'}
            >
              {messages?.common?.newIssues}
            </Dropdown.Item>
            {canUseDOM && (
              <Dropdown.Item
                icon={<Icon icon="twitter" />}
                target="_blank"
                href={`https://twitter.com/share?text=${document?.title}&url=${location?.href}`}
              >
                {messages.common.shareTwitter}
              </Dropdown.Item>
            )}
          </MenuPopover>
        }
      >
        <IconButton appearance="subtle" icon={<Icon icon={SvgIcons.More} />} />
      </Whisper>
    </ButtonToolbar>
  );
}

export default PageToolbar;
