export interface StandardProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Additional style */
  style?: React.CSSProperties;
}

export interface AnimationEventProps {
  /** Callback fired before the Modal transitions in */
  onEnter?: (node: null | Element | Text) => void;

  /** Callback fired as the Modal begins to transition in */
  onEntering?: (node: null | Element | Text) => void;

  /** Callback fired after the Modal finishes transitioning in */
  onEntered?: (node: null | Element | Text) => void;

  /** Callback fired right before the Modal transitions out */
  onExit?: (node: null | Element | Text) => void;

  /** Callback fired as the Modal begins to transition out */
  onExiting?: (node: null | Element | Text) => void;

  /** Callback fired after the Modal finishes transitioning out */
  onExited?: (node: null | Element | Text) => void;
}

export interface PickerBaseProps extends StandardProps, AnimationEventProps {
  /** A picker can have different appearances. */
  appearance: 'default' | 'subtle';

  /** Format picker to appear inside a content block */
  block?: boolean;

  /** Set the padding of the container. */
  containerPadding?: number;

  /** Sets the rendering container */
  container?: HTMLElement | (() => HTMLElement);

  /** A picker can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** You can use a custom element for this component */
  toggleComponentClass?: React.ReactType<any>;

  /** A CSS class to apply to the Menu DOM node. */
  menuClassName?: string;

  /** A style to apply to the Menu DOM node. */
  menuStyle?: object;

  /** Placeholder text */
  placeholder?: string;

  /** The placement of picker */
  placement?: PropTypes.Placement;

  /** Open the menu and control it */
  open?: boolean;

  /** Initial open menu */
  defaultOpen?: boolean;

  /** A picker that can clear values */
  cleanable?: boolean;

  /** Called when Modal is displayed */
  onOpen?: () => void;

  /** Called when Modal is closed */
  onClose?: () => void;

  /** Custom render extra footer */
  renderExtraFooter?: () => React.ReactNode;
}

export interface FormControlBaseProps<ValueType = any> {
  /** Initial value */
  defaultValue?: ValueType;

  /** Current value of the component. Creates a controlled component */
  value?: ValueType;

  /** Called after the value has been changed */
  onChange?: (value: ValueType, event: React.SyntheticEvent<HTMLElement>) => void;
}

export interface FormControlPickerProps<ValueType = any> extends PickerBaseProps {
  /** The data of component */
  data: any[];

  /** Set option value 'key' in 'data' */
  valueKey?: string;

  /** Set options to display the 'key' in 'data' */
  labelKey?: string;

  /** Set children key in data */
  childrenKey?: string;

  /** Disabled items */
  disabledItemValues?: any[];

  /** Initial value */
  defaultValue?: ValueType;

  /** Current value of the component. Creates a controlled component */
  value?: ValueType;

  /** Called after the value has been changed */
  onChange?: (value: ValueType, event: React.SyntheticEvent<HTMLElement>) => void;
}

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
