import * as React from 'react';
import { Icon, Whisper, Tooltip, Button } from 'rsuite';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import * as SvgIcons from '@/components/SvgIcons';
import SearchDrawer from '../SearchDrawer';
import AppContext from '../AppContext';
import Link from '@/components/Link';
import { canUseDOM } from 'dom-lib';
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
  // Resolve server render is not same with the client problem.
  // reference https://itnext.io/tips-for-server-side-rendering-with-react-e42b1b7acd57
  const [ssrDone, setSsrDone] = React.useState(false);
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

  React.useEffect(() => {
    setSsrDone(canUseDOM);
  }, [canUseDOM]);

  const navItems = getNavItems(messages);

  return (
    <div className="top-level-nav" key={ssrDone ? 'client' : 'server'}>
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
        <ButtonWithTooltip tip="Toggle light/dark theme" onClick={onChangeTheme}>
          <Icon icon={themeName === 'dark' ? SvgIcons.LightOff : SvgIcons.LightOn} size="lg" />
        </ButtonWithTooltip>

        <ButtonWithTooltip tip="Toggle RTL/LTR" onClick={onChangeDirection}>
          <Icon icon={direction === 'rtl' ? SvgIcons.Rtl : SvgIcons.Ltr} size="lg" />
        </ButtonWithTooltip>

        <ButtonWithTooltip tip="GitHub" href="https://github.com/rsuite/rsuite" target="_blank">
          <Icon icon="github" size="lg" />
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
