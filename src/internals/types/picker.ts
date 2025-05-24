import type {
  CSSProperties,
  ReactNode,
  ElementType,
  SyntheticEvent,
  FocusEventHandler
} from 'react';

import type { Placement } from './placement';
import type { ToArray } from './utils';
import type { FormControlBaseProps } from './form';
import type { AnimationEventProps } from './animation';
import type { BoxProps } from '@/internals/Box';
import type { BasicSize } from './sizes';
import type { PickerHandle } from '@/internals/Picker/types';

export interface Option<T = number | string> extends Record<string, any> {
  label?: string | ReactNode;
  value?: T;
  groupBy?: string;
  parent?: Option<T>;
  children?: Option<T>[];
  loading?: boolean;
}

export type OptionValue = number | string | null;

export type OnChangeCallback<T, E = SyntheticEvent> = (value: T, event: E) => void;

export interface DeprecatedMenuProps {
  /**
   * Custom menu class name
   * @deprecated Use `popupClassName` instead
   */
  menuClassName?: string;

  /**
   * Custom menu style
   * @deprecated Use `popupStyle` instead
   */
  menuStyle?: CSSProperties;

  /**
   * Picker menu auto width
   *
   * @deprecated Use `popupAutoWidth` instead
   */
  menuAutoWidth?: boolean;

  /**
   * Set the width of the menu
   *
   * @deprecated Use columnWidth instead
   */
  menuWidth?: number;

  /**
   * Set the height of the menu
   * @deprecated Use columnHeight instead
   */
  menuHeight?: number;

  /**
   * Set the max height of the menu
   * @deprecated Use `listboxMaxHeight` instead
   */
  menuMaxHeight?: number;

  /**
   * Custom render menu
   * @deprecated For TreePicker and CheckTreePicker, use `renderTree` instead. For Cascader and MultiCascader, use `renderColumn` instead.
   */
  renderMenu?: any;

  /**
   * Custom render menu item
   * @deprecated Use renderTreeNode or renderOption instead
   */
  renderMenuItem?: any;

  /**
   * Custom render menu group
   * @deprecated Use renderOptionGroup instead
   */
  renderMenuGroup?: any;
}

export type PickerAppearance = 'default' | 'subtle';

/**
 * Represents the data properties for a component.
 */
export interface DataProps<TData> {
  /**
   * The data of the component.
   */
  data: TData[];

  /**
   * The key to use for setting the option value in the data.
   * @default value
   */
  valueKey?: string;

  /**
   * The key to use for displaying the options in the data.
   * @default label
   */
  labelKey?: string;

  /**
   * The key to use for setting the children in the data.
   * @default children
   */
  childrenKey?: string;
}

export interface PickerBaseProps<L = any> extends PopupProps, BoxProps, AnimationEventProps {
  id?: string;

  /**
   * Custom Ref for the picker
   */
  ref?: React.Ref<PickerHandle | undefined>;

  /** Custom locale */
  locale?: Partial<L>;

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
  toggleAs?: ElementType;

  /** Placeholder text */
  placeholder?: ReactNode;

  /** The placement of picker */
  placement?: Placement;

  /** Prevent floating element overflow */
  preventOverflow?: boolean;

  /** Open the menu and control it */
  open?: boolean;

  /** Initial open menu */
  defaultOpen?: boolean;

  /** A picker that can clear values */
  cleanable?: boolean;

  /** A picker can have different sizes */
  size?: BasicSize;

  /** Called when Modal is displayed */
  onOpen?: () => void;

  /** Called when Modal is closed */
  onClose?: () => void;

  /**
   * Called when the component is focused.
   */
  onFocus?: FocusEventHandler<any>;

  /**
   * Called when the component is blurred.
   */
  onBlur?: FocusEventHandler<any>;

  /** Custom render extra footer */
  renderExtraFooter?: () => ReactNode;
}

export interface FormControlPickerProps<T = any, L = any, D = Record<string, any>, I = T>
  extends PickerBaseProps<L>,
    FormControlBaseProps<T>,
    DataProps<D> {
  /**
   * Disabled items
   */
  disabledItemValues?: ToArray<NonNullable<I>>;
}

export interface PopupProps {
  /** Custom CSS class for the popup */
  popupClassName?: string;

  /** Custom inline styles for the popup */
  popupStyle?: React.CSSProperties;

  /** Whether the popup should automatically adjust its width */
  popupAutoWidth?: boolean;
}

/**
 * Properties for the Listbox component.
 */
export interface ListboxProps {
  /** Maximum height of the listbox */
  listboxMaxHeight?: number;

  /** Custom render function for the entire listbox */
  renderListbox?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render function for individual options */
  renderOption?: (label: React.ReactNode, item: Option) => React.ReactNode;

  /** Custom render function for option groups */
  renderOptionGroup?: (title: React.ReactNode, item: Option) => React.ReactNode;
}
