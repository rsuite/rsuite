import React, { Dispatch } from 'react';
import type { DisclosureTrigger } from './Disclosure';

export interface DisclosureState {
  open: boolean;
}

export enum DisclosureActionTypes {
  Show,
  Hide
}

export type DisclosureAction = { type: DisclosureActionTypes };

export type DisclosureContextProps = [
  DisclosureState,
  Dispatch<DisclosureAction>,
  {
    trigger: DisclosureTrigger[];
    onToggle?: (open: boolean, event: React.SyntheticEvent) => void;
  }
];

const DisclosureContext = React.createContext<DisclosureContextProps | null>(null);
DisclosureContext.displayName = 'Disclosure.Context';

export default DisclosureContext;
