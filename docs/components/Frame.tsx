import * as React from 'react';
import SideNavbar from './SideNavbar';
import TopLevelNav from './TopLevelNav';
import { ThemeContext } from './Context';

interface FrameProps {
  openSubmenu?: boolean;
  children?: React.ReactNode;
}

export default function Frame(props: FrameProps) {
  const [openSubmenu, setOpenSubmenu] = React.useState(
    typeof props.openSubmenu !== 'undefined' ? props.openSubmenu : true
  );
  const menuStyles = {
    width: openSubmenu ? 260 : 0
  };

  function handleToggleMenu(open) {
    setOpenSubmenu(typeof open === 'undefined' ? !openSubmenu : open);
  }

  console.log('ddddd');

  return (
    <ThemeContext.Consumer>
      {({ theme: [, direction] }) => {
        const contextStyle = {
          [`margin${direction === 'rtl' ? 'Right' : 'Left'}`]: openSubmenu ? 324 : 80
        };
        return (
          <div>
            <TopLevelNav showSubmenu={openSubmenu} onToggleMenu={handleToggleMenu} />
            <SideNavbar style={menuStyles} />
            <div className="page-context" style={contextStyle}>
              {props.children}
            </div>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}
