import React, { useMemo } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Box from '@/internals/Box';
import OverlayTrigger, {
  OverlayTriggerProps,
  OverlayTriggerType
} from '@/internals/Overlay/OverlayTrigger';
import { useUniqueId } from '@/internals/hooks';
import { useStyles } from '@/internals/hooks';
import type { Placement, Size, AnimationEventProps } from '@/internals/types';

export interface PickerToggleTriggerProps
  /**
   * Interface representing the properties for the PickerToggleTrigger component.
   * Extends AnimationEventProps and OverlayTriggerProps with specific pick/omit logic.
   */
  extends Omit<AnimationEventProps, 'onEntering' | 'onExiting'>,
    Pick<OverlayTriggerProps, 'onClose' | 'onOpen' | 'speaker'> {
  /** Appearance style for the component, default or subtle */
  appearance?: 'default' | 'subtle';
  /** Element type to render as */
  as?: React.ElementType;
  /** If true, the component will occupy the full width of its container */
  block?: boolean;
  /** The child element to be rendered */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom class prefix */
  classPrefix?: string;
  /** Disable the component */
  disabled?: boolean;
  /** Unique identifier */
  id?: string;
  /** If true, multiple selection is allowed */
  multiple?: boolean;
  /** Name attribute for the component */
  name?: string;
  /** Controls the open state of the picker */
  open?: boolean;
  /** Additional properties for the picker */
  triggerProps: any;
  /** Placement of the component */
  placement?: Placement;
  /**
   * Identifies the combobox as having a popout, and indicates the type.
   *
   * @see MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
   */
  popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
  /** Reference to the root element */
  rootRef?: React.Ref<any>;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Trigger type for the overlay */
  trigger?: OverlayTriggerType | OverlayTriggerType[];

  size?: Size;

  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
}

export const overlayPropKeys = [
  'onEntered',
  'onExited',
  'onEnter',
  'onEntering',
  'onExit',
  'onExiting',
  'open',
  'onOpen',
  'defaultOpen',
  'onClose',
  'container',
  'containerPadding',
  'preventOverflow'
];
export const pickerCommonPropKeys = ['disabled', 'plaintext', 'readOnly', 'loading', 'label'];
export const triggerPropKeys = [...overlayPropKeys, ...pickerCommonPropKeys];

export interface ComboboxContextProps {
  id?: string;
  multiple?: boolean;
  hasLabel?: boolean;
  placement?: Placement;
  popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
}

export const ComboboxContext = React.createContext<ComboboxContextProps>({
  popupType: 'listbox'
});

export const PickerToggleTrigger = React.forwardRef(
  (props: PickerToggleTriggerProps, ref: React.Ref<any>) => {
    const {
      appearance,
      as,
      block,
      children,
      className,
      classPrefix = 'picker',
      disabled,
      id,
      multiple,
      name,
      triggerProps,
      placement,
      popupType = 'listbox',
      rootRef,
      speaker,
      style,
      size,
      trigger = 'click',
      onKeyDown,
      onClick,
      ...rest
    } = props;
    const pickerTriggerProps = pick(triggerProps, triggerPropKeys);
    const pickerId = useUniqueId('rs-', id);

    const comboboxContext = useMemo(
      () => ({
        id: pickerId,
        hasLabel: typeof pickerTriggerProps.label !== 'undefined',
        multiple,
        placement,
        popupType
      }),
      [pickerId, multiple, placement, popupType]
    );

    const { withPrefix, merge } = useStyles(classPrefix);
    const classes = merge(className, withPrefix());

    return (
      <ComboboxContext.Provider value={comboboxContext}>
        <OverlayTrigger
          {...pickerTriggerProps}
          disabled={pickerTriggerProps.disabled || pickerTriggerProps.loading}
          ref={ref}
          trigger={trigger}
          placement={placement}
          speaker={speaker}
        >
          <Box
            as={as}
            className={classes}
            style={style}
            ref={rootRef}
            data-picker={name}
            data-variant={appearance}
            data-size={size}
            data-disabled={disabled || undefined}
            data-block={block || undefined}
            data-testid="picker"
            onKeyDown={onKeyDown}
            onClick={onClick}
            {...omit(rest, [...triggerPropKeys])}
          >
            {children}
          </Box>
        </OverlayTrigger>
      </ComboboxContext.Provider>
    );
  }
);
PickerToggleTrigger.displayName = 'PickerToggleTrigger';

export default PickerToggleTrigger;
