export interface StandardProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Additional style */
  style?: React.CSSProperties;

  [key: string]: any;
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
  appearance?: 'default' | 'subtle';

  /** Format picker to appear inside a content block */
  block?: boolean;

  /** Set the padding of the container. */
  containerPadding?: number;

  /** Sets the rendering container */
  container?: HTMLElement | (() => HTMLElement);

  /** A picker can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** You can use a custom element for this component */
  toggleComponentClass?: React.ElementType;

  /** A CSS class to apply to the Menu DOM node. */
  menuClassName?: string;

  /** A style to apply to the Menu DOM node. */
  menuStyle?: object;

  /** Placeholder text */
  placeholder?: string;

  /** The placement of picker */
  placement?: PropTypes.Placement;

  /** Prevent floating element overflow */
  preventOverflow?: boolean;

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
  type Appearance = 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
  type Placement4 = 'top' | 'bottom' | 'right' | 'left';
  type Placement8 =
    | 'bottomStart'
    | 'bottomEnd'
    | 'topStart'
    | 'topEnd'
    | 'leftStart'
    | 'rightStart'
    | 'leftEnd'
    | 'rightEnd';
  type PlacementAuto =
    | 'auto'
    | 'autoVerticalStart'
    | 'autoVerticalEnd'
    | 'autoHorizontalStart'
    | 'autoHorizontalEnd';

  type Placement = Placement8 | PlacementAuto;
  type CheckTrigger = 'change' | 'blur' | 'none';
}

export interface SVGIcon {
  viewBox: string;
  id: string;
}

export interface ItemDataType {
  label: any;
  value: any;
  groupBy?: string;
}

export { default as Alert } from './Alert';
export { default as Animation } from './Animation';
export { default as AutoComplete } from './AutoComplete';
export { default as Avatar } from './Avatar';
export { default as Badge } from './Badge';
export { default as Breadcrumb } from './Breadcrumb';
export { default as Button } from './Button';
export { default as ButtonGroup } from './ButtonGroup';
export { default as ButtonToolbar } from './ButtonToolbar';
export { default as Cascader } from './Cascader';
export { default as Checkbox } from './Checkbox';
export { default as CheckboxGroup } from './CheckboxGroup';
export { default as CheckPicker } from './CheckPicker';
export { default as CheckTree } from './CheckTree';
export { default as CheckTreePicker } from './CheckTreePicker';
export { default as Col } from './Col';
export { default as Container } from './Container';
export { default as Content } from './Content';
export { default as ControlLabel } from './ControlLabel';
export { default as DatePicker } from './DatePicker';
export { default as DateRangePicker } from './DateRangePicker';
export { default as Divider } from './Divider';
export { default as DOMHelper } from './DOMHelper';
export { default as Drawer } from './Drawer';
export { default as Dropdown } from './Dropdown';
export { default as ErrorMessage } from './ErrorMessage';
export { default as FlexboxGrid } from './FlexboxGrid';
export { default as Footer } from './Footer';
export { default as Form } from './Form';
export { default as FormControl } from './FormControl';
export { default as FormGroup } from './FormGroup';
export { default as Grid } from './Grid';
export { default as Header } from './Header';
export { default as HelpBlock } from './HelpBlock';
export { default as Icon } from './Icon';
export { default as IconButton } from './IconButton';
export { default as IconStack } from './IconStack';
export { default as Input } from './Input';
export { default as InputGroup } from './InputGroup';
export { default as InputNumber } from './InputNumber';
export { default as InputPicker } from './InputPicker';
export { default as IntlProvider } from './IntlProvider';
export { default as Loader } from './Loader';
export { default as Message } from './Message';
export { default as Modal } from './Modal';
export { default as MultiCascader } from './MultiCascader';
export { default as Nav } from './Nav';
export { default as Notification } from './Notification';
export { default as Pagination } from './Pagination';
export { default as Panel } from './Panel';
export { default as PanelGroup } from './PanelGroup';
export { default as Popover } from './Popover';
export { default as Portal } from './Portal';
export { default as Progress } from './Progress';
export { default as Radio } from './Radio';
export { default as RadioGroup } from './RadioGroup';
export { default as SelectPicker } from './SelectPicker';
export { default as Sidebar } from './Sidebar';
export { default as Sidenav } from './Sidenav';
export { default as Slider } from './Slider';
export { default as Steps } from './Steps';
export { default as Table } from './Table';
export { default as Tag } from './Tag';
export { default as TagGroup } from './TagGroup';
export { default as TagPicker } from './TagPicker';
export { default as Timeline } from './Timeline';
export { default as Toggle } from './Toggle';
export { default as Tooltip } from './Tooltip';
export { default as Tree } from './Tree';
export { default as TreePicker } from './TreePicker';
export { default as Uploader } from './Uploader';
export { default as Whisper } from './Whisper';
export { default as Navbar } from './Navbar';
export { default as Row } from './Row';
export { default as Schema } from './Schema';
