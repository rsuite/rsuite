import * as React from 'react';
import _ from 'lodash';
import SideNavbar from './SideNavbar';
import TopLevelNav from './TopLevelNav';
import { ThemeContext } from './Context';

interface FrameProps {
  showSubmenu?: boolean;
}

interface FrameState {
  showSubmenu: boolean;
}

class Frame extends React.Component<FrameProps, FrameState> {
  constructor(props) {
    super(props);
    const { showSubmenu } = props;
    this.state = {
      showSubmenu: typeof showSubmenu !== 'undefined' ? showSubmenu : true
    };
  }

  handleToggleMenu = show => {
    const { showSubmenu } = this.state;
    this.setState({
      showSubmenu: _.isUndefined(show) ? !showSubmenu : show
    });
  };

  render() {
    const { showSubmenu } = this.state;
    const menuStyles = {
      width: showSubmenu ? 260 : 0
    };

    return (
      <ThemeContext.Consumer>
        {({ theme: [, direction] }) => {
          const contextStyle = {
            [`margin${direction === 'rtl' ? 'Right' : 'Left'}`]: showSubmenu ? 324 : 80
          };
          return (
            <div>
              <TopLevelNav showSubmenu={showSubmenu} onToggleMenu={this.handleToggleMenu} />
              <SideNavbar style={menuStyles} />
              <div className="page-context" style={contextStyle}>
                {this.props.children}
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Frame;
