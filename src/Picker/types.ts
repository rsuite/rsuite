import { RsRefForwardingComponent } from '../@types/common';

export interface PickerInstance {
  root?: Element;
  menu?: Element;
  toggle?: HTMLButtonElement;
  updatePosition?: () => void;
  open?: () => void;
  close?: () => void;
}

export type PickerComponent<P> = RsRefForwardingComponent<
  'div',
  P & { ref?: React.Ref<PickerInstance> }
>;
