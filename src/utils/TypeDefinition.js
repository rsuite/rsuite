// @flow

export type Size = 'lg' | 'md' | 'sm' | 'xs';
export type Types = 'success' | 'warning' | 'error' | 'info';
export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
export type SVGIcon = { viewBox: string, id: string };
export type Placement =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd'
  | 'auto'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';
