import { RsRefForwardingComponent } from '../../@types/common';
import type { ListHandle } from '../../internals/Windowing';
import { RSUITE_PICKER_TYPE } from '../../internals/symbols';

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

export type PickerComponent<P> = RsRefForwardingComponent<
  'div',
  P & { ref?: React.Ref<PickerHandle> }
>;
