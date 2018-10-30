import * as React from 'react';

export interface HeaderProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;
}

declare const Header: React.ComponentType<HeaderProps>;

export default Header;
