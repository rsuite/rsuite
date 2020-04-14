import * as React from 'react';
import SideNavbar from './SideNavbar';
import TopLevelNav from './TopLevelNav';
import AppContext from './AppContext';

export interface FrameProps {
  submenu?: boolean;
  children?: React.ReactNode;
}

export default function Frame(props: FrameProps) {
  const [submenu, setSubmenu] = React.useState(
    typeof props.submenu !== 'undefined' ? props.submenu : true
  );
  const menuStyles = {
    width: submenu ? 260 : 20
  };

  function handleToggleMenu(open) {
    setSubmenu(typeof open === 'undefined' ? !submenu : open);
  }

  const {
    theme: [, direction]
  } = React.useContext(AppContext);

  const contextStyle = {
    [`margin${direction === 'rtl' ? 'Right' : 'Left'}`]: submenu ? 324 : 80
  };

  return (
    <div className={submenu ? '' : 'submenu-close'}>
      <TopLevelNav showSubmenu={submenu} onToggleMenu={handleToggleMenu} />
      <SideNavbar style={menuStyles} />
      <div className="page-context" style={contextStyle}>
        {props.children}
      </div>
    </div>
  );
}
