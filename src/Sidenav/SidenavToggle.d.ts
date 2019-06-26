import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface SidenavToggleProps extends StandardProps {
  /** Expand then nav */
  expanded?: boolean;

  /** Callback function for menu state switching */
  onToggle?: (expanded: boolean, event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

declare const SidenavToggle: React.ComponentType<SidenavToggleProps>;

export default SidenavToggle;
