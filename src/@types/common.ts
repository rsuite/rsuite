import React from 'react';
import { ReplaceProps } from './utils';

export interface StandardProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Additional style */
  style?: React.CSSProperties;
}

export interface WithAsProps<As extends React.ElementType | string = React.ElementType>
  extends StandardProps {
  /** You can use a custom element for this component */
  as?: As;
}

export interface RsRefForwardingComponent<T extends React.ElementType, P = unknown> {
  <As extends React.ElementType = T>(
    props: React.PropsWithChildren<ReplaceProps<As, WithAsProps<As> & P>>,
    context?: any
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  displayName?: string;
}

export interface AnimationEventProps {
  /** Callback fired before the Modal transitions in */
  onEnter?: (node: HTMLElement) => void;

  /** Callback fired as the Modal begins to transition in */
  onEntering?: (node: HTMLElement) => void;

  /** Callback fired after the Modal finishes transitioning in */
  onEntered?: (node: HTMLElement) => void;

  /** Callback fired right before the Modal transitions out */
  onExit?: (node: HTMLElement) => void;

  /** Callback fired as the Modal begins to transition out */
  onExiting?: (node: HTMLElement) => void;

  /** Callback fired after the Modal finishes transitioning out */
  onExited?: (node: HTMLElement) => void;
}

export type PickerAppearance = 'default' | 'subtle';

export interface PickerBaseProps<LocaleType = any> extends WithAsProps, AnimationEventProps {
  id?: string;

  /** Custom locale */
  locale?: Partial<LocaleType>;

  /** A picker can have different appearances. */
  appearance?: PickerAppearance;

  /** Format picker to appear inside a content block */
  block?: boolean;

  /** Set the padding of the container. */
  containerPadding?: number;

  /** Sets the rendering container */
  container?: HTMLElement | (() => HTMLElement);

  /** A picker can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** You can use a custom element for this component */
  toggleAs?: React.ElementType;

  /** A CSS class to apply to the Menu DOM node. */
  menuClassName?: string;

  /** A style to apply to the Menu DOM node. */
  menuStyle?: React.CSSProperties;

  /** Picker menu auto width */
  menuAutoWidth?: boolean;

  /** Picker menu max Height */
  menuMaxHeight?: number;

  /** Placeholder text */
  placeholder?: React.ReactNode;

  /** The placement of picker */
  placement?: TypeAttributes.Placement;

  /** Prevent floating element overflow */
  preventOverflow?: boolean;

  /** Open the menu and control it */
  open?: boolean;

  /** Initial open menu */
  defaultOpen?: boolean;

  /** A picker that can clear values */
  cleanable?: boolean;

  /** A picker can have different sizes */
  size?: TypeAttributes.Size;

  /** Called when Modal is displayed */
  onOpen?: () => void;

  /** Called when Modal is closed */
  onClose?: () => void;

  /** Custom render extra footer */
  renderExtraFooter?: () => React.ReactNode;
}

export interface FormControlBaseProps<
  ValueType = React.InputHTMLAttributes<HTMLInputElement>['value']
> {
  /** Name of the form field */
  name?: string;

  /** Initial value */
  defaultValue?: ValueType;

  /** Current value of the component. Creates a controlled component */
  value?: ValueType;

  /**
   * Called after the value has been changed
   * todo Override event as React.ChangeEvent in components where onChange is delegated
   *      to an underlying <input> element
   */
  onChange?: (value: ValueType, event: React.SyntheticEvent) => void;

  /** Set the component to be disabled and cannot be entered */
  disabled?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Make the control readonly */
  readOnly?: boolean;
}

type ToArray<V> = V extends any[] ? V : V[];

export interface FormControlPickerProps<
  ValueType = any,
  LocaleType = any,
  DataType = Record<string, any>
> extends PickerBaseProps<LocaleType>,
    FormControlBaseProps<ValueType> {
  /** The data of component */
  data: DataType[];

  /** Set option value 'key' in 'data' */
  valueKey?: string;

  /** Set options to display the 'key' in 'data' */
  labelKey?: string;

  /** Set children key in data */
  childrenKey?: string;

  /** Disabled items */
  disabledItemValues?: ToArray<NonNullable<ValueType>>;

  /** Initial value */
  defaultValue?: ValueType;

  /** Current value of the component. Creates a controlled component */
  value?: ValueType;

  /** Called after the value has been changed */
  onChange?: (value: ValueType, event: React.SyntheticEvent) => void;
}

export declare namespace TypeAttributes {
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
    | 'autoVertical'
    | 'autoVerticalStart'
    | 'autoVerticalEnd'
    | 'autoHorizontal'
    | 'autoHorizontalStart'
    | 'autoHorizontalEnd';

  type Placement = Placement4 | Placement8 | PlacementAuto;
  type CheckTrigger = 'change' | 'blur' | 'none';
}

export interface SVGIcon {
  viewBox: string;
  id: string;
}

export interface ItemDataType<T = number | string> extends Record<string, any> {
  label?: string | React.ReactNode;
  value?: T;
  groupBy?: string;
  parent?: ItemDataType<T>;
  children?: ItemDataType<T>[];
  loading?: boolean;
}

export interface Offset {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type OnChangeCallback<T, E = React.SyntheticEvent> = (value: T, event: E) => void;

export type CursorPosition = {
  top: number;
  left: number;
  clientTop: number;
  clientLeft: number;
};
