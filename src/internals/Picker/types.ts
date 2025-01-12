import { RSUITE_PICKER_TYPE } from '@/internals/symbols';
import type { InternalRefForwardingComponent } from '@/internals/types';
import type { ListHandle } from '@/internals/Windowing';

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

export type PickerComponent<P> = InternalRefForwardingComponent<
  'div',
  P & { ref?: React.Ref<PickerHandle> }
>;
