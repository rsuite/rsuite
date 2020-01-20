import * as React from 'react';
import { Icon, Whisper, Tooltip, Button } from 'rsuite';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import IconSearch from '../icons/Search';
import IconGuide from '../icons/Guide';
import IconGitee from '../icons/Gitee';
import IconComponent from '../icons/Component';
import IconTools from '../icons/Tools';
import IconExtension from '../icons/Extension';
import IconDesign from '../icons/Design';
import IconLightOff from '../icons/LightOff';
import IconLightOn from '../icons/LightOn';
import IconRtl from '../icons/Rtl';
import IconLtr from '../icons/Ltr';

import SearchDrawer from '../SearchDrawer';
import AppContext from '../AppContext';
import Link from '@/components/Link';

interface ButtonWithTooltipProps {
  children: React.ReactNode;
  tip: React.ReactNode;
  className?: string;
  componentClass?: React.ElementType;
  [key: string]: any;
}

function ButtonWithTooltip({
  children,
  componentClass = 'a',
  tip,
  className,
  ...props
}: ButtonWithTooltipProps) {
  const btn = (
    <Button
      {...props}
      size="lg"
      className={classNames('icon-btn-circle', className)}
      componentClass={componentClass}
    >
      {children}
    </Button>
  );
  if (isMobile) {
    return btn;
  }
  return (
    <Whisper speaker={<Tooltip>{tip}</Tooltip>} placement="right" trigger="hover">
      {btn}
    </Whisper>
  );
}

function SearchButton({ tip, ...rest }: any) {
  return (
    <ButtonWithTooltip tip={tip} {...rest}>
      <IconSearch />
    </ButtonWithTooltip>
  );
}

interface TopLevelNavProps {
  onToggleMenu?: (show: boolean) => void;
  showSubmenu?: boolean;
  hideToggle?: boolean;
  children?: React.ReactNode;
}

function getNavItems(messages) {
  return [
    {
      key: 'guide',
      tip: messages?.common?.guide,
      to: '/guide/introduction',
      icon: <IconGuide />
    },
    {
      key: 'components',
      tip: messages?.common?.components,
      to: '/components/overview',
      icon: <IconComponent />
    },

    {
      key: 'tools',
      tip: messages?.common?.tools,
      to: '/tools/palette',
      icon: <IconTools />
    },
    {
      key: 'extensions',
      tip: messages?.common?.extension,
      to: '/extensions',
      icon: <IconExtension />
    }
  ];
}

export default function TopLevelNav(props: TopLevelNavProps) {
  const { children, showSubmenu, hideToggle } = props;
  const [search, setSearch] = React.useState();
  const onToggleMenu = (_event, show) => {
    props?.onToggleMenu?.(show);
  };
  const {
    messages,
    theme: [themeName, direction],
    onChangeDirection,
    onChangeTheme
  } = React.useContext(AppContext);

  const navItems = getNavItems(messages);

  return (
    <div className="top-level-nav">
      <Link href="/">
        <Logo width={26} height={30} className="logo-sm" />
      </Link>

      <div className="top-level-nav-header">
        <SearchButton
          className="visible-xs"
          tip={messages?.common?.search}
          onClick={() => {
            setSearch(true);
          }}
        />
        {navItems.map(item => (
          <ButtonWithTooltip
            tip={item.tip}
            key={item.key}
            href={item.to}
            componentClass={Link}
            onClick={event => {
              onToggleMenu(event, true);
            }}
          >
            {item.icon}
          </ButtonWithTooltip>
        ))}
        <ButtonWithTooltip
          tip={messages?.common?.design}
          target="_blank"
          href="/design/default/index.html"
        >
          <IconDesign />
        </ButtonWithTooltip>
        <SearchButton
          className="hidden-xs"
          tip={messages?.common?.search}
          onClick={() => {
            setSearch(true);
          }}
        />
      </div>
      <div className="top-level-nav-footer">
        <ButtonWithTooltip tip="Toggle light/dark theme" onClick={onChangeTheme}>
          {themeName === 'dark' ? <IconLightOff /> : <IconLightOn />}
        </ButtonWithTooltip>

        <ButtonWithTooltip tip="Toggle RTL/LTR" onClick={onChangeDirection}>
          {direction === 'rtl' ? <IconRtl /> : <IconLtr />}
        </ButtonWithTooltip>

        <ButtonWithTooltip tip="GitHub" href="https://github.com/rsuite/rsuite" target="_blank">
          <Icon icon="github" size="lg" />
        </ButtonWithTooltip>

        <ButtonWithTooltip tip="码云" href="https://gitee.com/rsuite/rsuite" target="_blank">
          <IconGitee />
        </ButtonWithTooltip>

        {hideToggle ? null : (
          <ButtonWithTooltip
            tip={showSubmenu ? messages?.common?.closeMenu : messages?.common?.openMenu}
            onClick={onToggleMenu}
          >
            <Icon icon={showSubmenu ? 'angle-left' : 'angle-right'} size="lg" />
          </ButtonWithTooltip>
        )}
      </div>
      {children}
      <SearchDrawer
        show={search}
        onHide={() => {
          setSearch(false);
        }}
      />
    </div>
  );
}
