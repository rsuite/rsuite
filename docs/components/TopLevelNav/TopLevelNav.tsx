import * as React from 'react';
import { Icon, Whisper, Tooltip, Button, IconButton } from 'rsuite';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import * as SvgIcons from '@/components/SvgIcons';
import SearchDrawer from '../SearchDrawer';
import AppContext from '../AppContext';
import Link from '@/components/Link';
import { useRouter } from 'next/router';

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
      <Icon icon={SvgIcons.Search} size="lg" />
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
      icon: <Icon icon={SvgIcons.Guide} size="lg" />
    },
    {
      key: 'components',
      tip: messages?.common?.components,
      to: '/components/overview',
      icon: <Icon icon={SvgIcons.Component} size="lg" />
    },

    {
      key: 'tools',
      tip: messages?.common?.tools,
      to: '/tools/palette',
      icon: <Icon icon={SvgIcons.Tools} size="lg" />
    },
    {
      key: 'extensions',
      tip: messages?.common?.extension,
      to: '/extensions',
      icon: <Icon icon={SvgIcons.Extension} size="lg" />
    }
  ];
}

export default function TopLevelNav(props: TopLevelNavProps) {
  const { children, showSubmenu, hideToggle } = props;
  const router = useRouter();
  const [search, setSearch] = React.useState<boolean>();
  const onToggleMenu = (_event, show?: boolean) => {
    props?.onToggleMenu?.(show);
  };
  const { messages, theme } = React.useContext(AppContext);
  const [themeName] = theme;

  const navItems = getNavItems(messages);

  return (
    <div className="top-level-nav">
      {!hideToggle && (
        <IconButton
          circle
          className="btn-nav-toggle"
          appearance="default"
          icon={<Icon icon={showSubmenu ? 'angle-left' : 'angle-right'} />}
          size="xs"
          style={{ left: showSubmenu ? 310 : 70 }}
          tip={showSubmenu ? messages?.common?.closeMenu : messages?.common?.openMenu}
          onClick={onToggleMenu}
        />
      )}

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
            {React.cloneElement(
              item.icon,
              router.pathname.indexOf(`/${item.key}`) === 0
                ? {
                    svgStyle: {
                      fill: '#169de0'
                    }
                  }
                : null
            )}
          </ButtonWithTooltip>
        ))}
        <ButtonWithTooltip
          tip={messages?.common?.design}
          target="_blank"
          href={`/design/${themeName === 'dark' ? 'dark' : 'default'}/`}
        >
          <Icon icon={SvgIcons.Design} size="lg" />
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
        <ButtonWithTooltip tip="GitHub" href="https://github.com/rsuite/rsuite" target="_blank">
          <Icon icon="github" size="lg" />
        </ButtonWithTooltip>
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
