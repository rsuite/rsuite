import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Icon, Whisper, Tooltip } from 'rsuite';
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
import { readThemeName } from '../../utils/themeHelpers';
import { ThemeContext } from '../Context';

interface WithTooltipButtonProps {
  children: React.ReactNode;
  tip: React.ReactNode;
  className?: string;
  componentClass?: React.ElementType;
  [key: string]: any;
}

function WithTooltipButton({ children, tip, ...props }: WithTooltipButtonProps) {
  const btn = (
    <Button size="lg" {...props}>
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

interface TopLevelNavProps {
  onToggleMenu?: (show: boolean) => void;
  showSubmenu?: boolean;
  hideToggle?: boolean;
}

interface TopLevelNavState {
  light: boolean;
  search: boolean;
}
class TopLevelNav extends React.Component<TopLevelNavProps, TopLevelNavState> {
  static contextType = ThemeContext;

  static propTypes = {
    showSubmenu: PropTypes.bool,
    onToggleMenu: PropTypes.func,
    onChangeTheme: PropTypes.func,
    hideToggle: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      light: readThemeName() === 'dark' ? false : true,
      search: false
    };
  }

  showSearchDrawer = () => {
    this.setState({ search: true });
  };
  hideSearchDrawer = () => {
    this.setState({ search: false });
  };
  handleToggleMenu = (_event, show) => {
    this.props.onToggleMenu?.(show);
  };

  render() {
    const { children, showSubmenu, hideToggle } = this.props;
    const {
      messages,
      theme: [themeName, direction],
      handleToggleDirection,
      handleToggleTheme
    } = this.context;

    const localePath = messages?.id === 'en-US' ? '/en/' : '/';
    const menu = [
      {
        key: 'guide',
        tip: messages?.common?.guide,
        to: `${localePath}guide/introduction`,
        icon: <IconGuide />
      },
      {
        key: 'components',
        tip: messages?.common?.components,
        to: `${localePath}components/overview`,
        icon: <IconComponent />
      },

      {
        key: 'tools',
        tip: messages?.common?.tools,
        to: `${localePath}tools/palette`,
        icon: <IconTools />
      },
      {
        key: 'extensions',
        tip: messages?.common?.extension,
        to: `${localePath}extensions`,
        icon: <IconExtension />
      }
    ];
    const renderSearchButton = className => (
      <WithTooltipButton
        tip={messages?.common?.search}
        className={`icon-btn-circle ${className}`}
        onClick={this.showSearchDrawer}
      >
        <IconSearch />
      </WithTooltipButton>
    );

    return (
      <div className="top-level-nav">
        <Link href={`${localePath}`}>
          <a>
            <Logo width={26} height={30} className="logo-sm" />
          </a>
        </Link>

        <div className="top-level-nav-menu">
          {renderSearchButton('visible-xs')}

          {menu.map(item => (
            <Link href={item.to} key={item.key}>
              <WithTooltipButton
                tip={item.tip}
                className="icon-btn-circle"
                componentClass={'a'}
                href={item.to}
                onClick={event => {
                  this.handleToggleMenu(event, true);
                }}
              >
                {item.icon}
              </WithTooltipButton>
            </Link>
          ))}

          <WithTooltipButton
            tip={messages?.common?.design}
            className="icon-btn-circle"
            componentClass="a"
            target="_blank"
            href="/design/default/index.html"
          >
            <IconDesign />
          </WithTooltipButton>

          {renderSearchButton('hidden-xs')}

          <div className="nav-menu-bottom">
            <WithTooltipButton
              tip="Toggle light/dark theme"
              className="icon-btn-circle"
              onClick={handleToggleTheme}
            >
              {themeName === 'dark' ? <IconLightOff /> : <IconLightOn />}
            </WithTooltipButton>

            <WithTooltipButton
              tip="Toggle RTL/LTR"
              className="icon-btn-circle"
              onClick={handleToggleDirection}
            >
              {direction === 'rtl' ? <IconRtl /> : <IconLtr />}
            </WithTooltipButton>

            <WithTooltipButton
              tip="GitHub"
              className="icon-btn-circle"
              href="https://github.com/rsuite/rsuite"
              target="_blank"
            >
              <Icon icon="github" size="lg" />
            </WithTooltipButton>

            <WithTooltipButton
              tip="码云"
              className="icon-btn-circle"
              href="https://gitee.com/rsuite/rsuite"
              target="_blank"
            >
              <IconGitee />
            </WithTooltipButton>

            {hideToggle ? null : (
              <WithTooltipButton
                tip={showSubmenu ? messages?.common?.closeMenu : messages?.common?.openMenu}
                className="icon-btn-circle"
                onClick={this.handleToggleMenu}
              >
                <Icon icon={showSubmenu ? 'angle-left' : 'angle-right'} size="lg" />
              </WithTooltipButton>
            )}
          </div>
        </div>
        {children}
        <SearchDrawer show={this.state.search} onHide={this.hideSearchDrawer} />
      </div>
    );
  }
}

export default TopLevelNav;
