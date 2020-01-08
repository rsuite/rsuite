import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Sidebar, Nav, Icon, IconButton } from 'rsuite';
//import Link from 'next/link';
import _ from 'lodash';
import getMenu from '../../utils/getMenu';

interface SideNavbarProps {
  style: React.CSSProperties;
}
interface SideNavbarState {
  mediaSidebarShow: boolean;
}

class SideNavbar extends React.PureComponent<SideNavbarProps, SideNavbarState> {
  static contextTypes = {
    locale: PropTypes.object,
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      mediaSidebarShow: false
    };
  }

  getMenuItems() {
    const { locale } = this.context;
    return getMenu(locale);
  }

  getRootPath() {
    return _.get(this.context.router, 'routes.0.path');
  }

  handleOpenMediaSidebarShow = () => {
    this.setState({
      mediaSidebarShow: true
    });
  };

  handleCloseMediaSidebarShow = () => {
    this.setState({
      mediaSidebarShow: false
    });
  };

  render() {
    const nodeItems = [];
    //const menuItems = this.getMenuItems();
    //const rootPath = this.getRootPath();
    const { locale } = this.context;
    const showMediaToggleButton = this.props.style.width !== 0;

    const menu = getMenu(locale);
    const { mediaSidebarShow } = this.state;

    const { name: activeTitle, icon } = menu[0];

    return (
      <>
        {showMediaToggleButton && (
          <IconButton
            className="media-toggle-side-bar"
            icon={<Icon icon="bars" />}
            onClick={this.handleOpenMediaSidebarShow}
          />
        )}
        <div
          className={classnames('rs-sidebar-wrapper fixed', {
            'media-sidebar-show': mediaSidebarShow
          })}
          onClick={this.handleCloseMediaSidebarShow}
          {...this.props}
        >
          <Sidebar>
            <IconButton
              className="media-close-side-bar-button"
              icon={<Icon icon="close" />}
              onClick={this.handleCloseMediaSidebarShow}
            />
            <div className="title-wrapper">
              {icon} {activeTitle}
            </div>
            <Nav className="nav-docs" vertical>
              {nodeItems}
            </Nav>
          </Sidebar>
        </div>
        <div
          className={classnames('rs-sidebar-media-backdrop', {
            'media-sidebar-show': mediaSidebarShow
          })}
          onClick={this.handleCloseMediaSidebarShow}
        />
      </>
    );
  }
}

export default SideNavbar;
