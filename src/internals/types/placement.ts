export type PlacementCardinal = 'top' | 'bottom' | 'right' | 'left';
export type PlacementCorners =
  | 'topStart'
  | 'topEnd'
  | 'bottomStart'
  | 'bottomEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd';
export type PlacementAuto =
  | 'auto'
  | 'autoVertical'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontal'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';

export type Placement = PlacementCardinal | PlacementCorners | PlacementAuto;
