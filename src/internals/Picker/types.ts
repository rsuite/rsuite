import { RSUITE_PICKER_TYPE } from '@/internals/symbols';
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
