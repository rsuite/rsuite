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
import type { SizeType, WithAsProps } from './shared';
import type { PickerHandle } from '@/internals/Picker/types';

export interface ItemDataType<T = number | string> extends Record<string, any> {
  label?: string | ReactNode;
  value?: T;
  groupBy?: string;
  parent?: ItemDataType<T>;
  children?: ItemDataType<T>[];
  loading?: boolean;
}

export type DataItemValue = number | string | null;

export type OnChangeCallback<T, E = SyntheticEvent> = (value: T, event: E) => void;

export interface DeprecatedPickerProps {
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
   * Custom render tree
   * @deprecated Use `renderTree` instead
   */
  renderMenu?: (menu: ReactNode) => ReactNode;
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

export interface PickerBaseProps<L = any> extends WithAsProps, AnimationEventProps {
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

  /** A CSS class to apply to the Menu DOM node. */
  menuClassName?: string;

  /** A style to apply to the Menu DOM node. */
  menuStyle?: CSSProperties;

  /** Picker menu auto width */
  menuAutoWidth?: boolean;

  /** Picker menu max Height */
  menuMaxHeight?: number;

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
  size?: SizeType;

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
