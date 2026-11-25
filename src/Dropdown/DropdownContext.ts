import React, { Dispatch } from 'react';
import { DropdownAction } from './DropdownState';

export interface DropdownContextProps {
  activeKey?: string | number;
  onSelect?: (eventKey: string | undefined, event: React.SyntheticEvent) => void;
  hasSelectedItem?: boolean;
  dispatch?: Dispatch<DropdownAction>;
}

const DropdownContext = React.createContext<DropdownContextProps | null>(null);
DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
