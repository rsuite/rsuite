/// <reference types="react" />
import { RsRefForwardingComponent } from '../types';
import type { ListHandle } from '../Windowing';
import { RSUITE_PICKER_TYPE } from '../symbols';
export interface PickerHandle {
    type?: typeof RSUITE_PICKER_TYPE;
    root: HTMLElement | null;
    list?: ListHandle;
    overlay?: HTMLElement | null;
    target?: HTMLElement | null;
    updatePosition?: () => void;
    open?: () => void;
    close?: () => void;
}
export type PickerComponent<P> = RsRefForwardingComponent<'div', P & {
    ref?: React.Ref<PickerHandle>;
}>;
