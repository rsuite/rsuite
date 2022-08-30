import { RsRefForwardingComponent } from '../@types/common';
import type { ListHandle } from '../Windowing';

export interface PickerHandle {
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
