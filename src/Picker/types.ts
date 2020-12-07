import { RsRefForwardingComponent } from '../@types/common';

export interface PickerInstance {
  root?: Element;
  overlay?: Element;
  target?: HTMLElement;
  updatePosition?: () => void;
  open?: () => void;
  close?: () => void;
}

export type PickerComponent<P> = RsRefForwardingComponent<
  'div',
  P & { ref?: React.Ref<PickerInstance> }
>;
