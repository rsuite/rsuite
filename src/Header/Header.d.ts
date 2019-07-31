import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface HeaderProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const Header: React.ComponentType<HeaderProps>;

export default Header;
