import React, { Dispatch } from 'react';
import type { DisclosureTrigger } from './Disclosure';
export interface DisclosureState {
    open: boolean;
}
export declare enum DisclosureActionTypes {
    Show = 0,
    Hide = 1
}
export type DisclosureAction = {
    type: DisclosureActionTypes.Show;
} | {
    type: DisclosureActionTypes.Hide;
    cascade?: boolean;
};
export type DisclosureContextProps = [
    DisclosureState,
    Dispatch<DisclosureAction>,
    {
        trigger: readonly DisclosureTrigger[];
        onToggle?: (open: boolean, event: React.SyntheticEvent) => void;
    }
];
declare const DisclosureContext: React.Context<DisclosureContextProps | null>;
export default DisclosureContext;
