import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
  if (isMobile) {
    return (
      <Button size="lg" {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Whisper speaker={<Tooltip>{tip}</Tooltip>} placement="right" trigger="hover">
      <Button size="lg" {...props}>
        {children}
      </Button>
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
  static contextTypes = {
    locale: PropTypes.object
  };

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
    const { locale } = this.context;
    const localePath = _.get(locale, 'id') === 'en-US' ? '/en/' : '/';
    const menu = [
      {
        key: 'guide',
        tip: _.get(locale, 'common.guide'),
        to: `${localePath}guide/introduction`,
        icon: <IconGuide />
      },
      {
        key: 'components',
        tip: _.get(locale, 'common.components'),
        to: `${localePath}components/overview`,
        icon: <IconComponent />
      },

      {
        key: 'tools',
        tip: _.get(locale, 'common.tools'),
        to: `${localePath}tools/palette`,
        icon: <IconTools />
      },
      {
        key: 'extensions',
        tip: _.get(locale, 'common.extension'),
        to: `${localePath}extensions`,
        icon: <IconExtension />
      }
    ];
    const renderSearchButton = className => (
      <WithTooltipButton
        tip={_.get(locale, 'common.search')}
        className={`icon-btn-circle ${className}`}
        onClick={this.showSearchDrawer}
      >
        <IconSearch />
      </WithTooltipButton>
    );

    return (
      <ThemeContext.Consumer>
        {({ theme: [themeName, direction], handleToggleDirection, handleToggleTheme }) => {
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
                  <WithTooltipButton
                    tip={item.tip}
                    key={item.key}
                    className="icon-btn-circle"
                    componentClass={Link}
                    href={item.to}
                    onClick={event => {
                      this.handleToggleMenu(event, true);
                    }}
                  >
                    {item.icon}
                  </WithTooltipButton>
                ))}

                <WithTooltipButton
                  tip={_.get(locale, 'common.design')}
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
                    {direction === 'ltr' ? <IconRtl /> : <IconLtr />}
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
                      tip={
                        showSubmenu
                          ? _.get(locale, 'common.closeMenu')
                          : _.get(locale, 'common.openMenu')
                      }
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
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default TopLevelNav;
