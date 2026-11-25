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

/**
 * Placement options for error messages in form controls.
 * @since 'static' is supported from v6.0.0
 */
export type ErrorMessagePlacement = 'static' | PlacementCorners;

export type Placement = PlacementCardinal | PlacementCorners | PlacementAuto;
