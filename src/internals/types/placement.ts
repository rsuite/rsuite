export type PlacementCardinal = 'top' | 'bottom' | 'right' | 'left';
export type PlacementCornersPolyfill = 'leftStart' | 'rightStart' | 'leftEnd' | 'rightEnd';
export type PlacementCorners =
  | 'topStart'
  | 'topEnd'
  | 'bottomStart'
  | 'bottomEnd'
  | PlacementCornersPolyfill;
export type PlacementAuto =
  | 'auto'
  | 'autoVertical'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontal'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';

export type Placement = PlacementCardinal | PlacementCorners | PlacementAuto;
