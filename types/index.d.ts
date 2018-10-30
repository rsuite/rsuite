export namespace PropTypes {
  type Size = 'lg' | 'md' | 'sm' | 'xs';
  type Status = 'success' | 'warning' | 'error' | 'info';
  type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';

  type Placement4 = 'top' | 'bottom' | 'right' | 'left';
  type Placement8 =
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topRight'
    | 'leftTop'
    | 'rightTop'
    | 'leftBottom'
    | 'rightBottom';
  type PlacementAuto =
    | 'auto'
    | 'autoVerticalLeft'
    | 'autoVerticalRight'
    | 'autoHorizontalTop'
    | 'autoHorizontalBottom';

  type Placement = Placement8 | PlacementAuto;
}

export interface SVGIcon {
  viewBox: string;
  id: string;
}

export interface ItemDataType {
  label: any;
  value: any;
}

export { default as Button } from './Button';
export { default as Breadcrumb } from './Breadcrumb';
