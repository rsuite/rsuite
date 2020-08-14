import { RsRefForwardingComponent } from '../@types/common';

export interface PickerInstance {
  root?: HTMLDivElement;
  menu?: HTMLDivElement;
  toggle?: HTMLButtonElement;
  open?: () => void;
  close?: () => void;
}

export interface PickerLocaleType {
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
}

export type PickerComponent<P> = RsRefForwardingComponent<
  'div',
  P & { ref: React.Ref<PickerInstance> }
>;
