import React from 'react';
import { Size } from '@/internals/types';
import type { ReactSuiteComponents } from '@/internals/Provider/types';

export interface ButtonGroupContextProps {
  size?: Size;
  disabled?: boolean;

  /** @internal Checks whether Badge children can participate in the group layout. */
  isBadgeButton?: (
    children: React.ReactNode,
    components?: Partial<ReactSuiteComponents>
  ) => boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextProps | null>(null);

export default ButtonGroupContext;
