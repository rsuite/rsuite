import React, { useMemo, useRef } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Box from '@/internals/Box';
import PickerDrawer from './PickerDrawer';
import OverlayTrigger, {
  OverlayTriggerProps,
  OverlayTriggerType
} from '@/internals/Overlay/OverlayTrigger';
import { useUniqueId, useEventCallback } from '@/internals/hooks';
import { createChainedFunction, mergeRefs } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useBreakpointValue } from '../../useBreakpointValue';
import type { Placement, Size, AnimationEventProps, PickerBaseProps } from '@/internals/types';

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
  /** Picker type identifier for data-picker attribute */
  pickerType?: string;
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
  /** Size of the component */
  size?: Size;

  /** Controls when the popup adapts to a full-width Drawer */
  responsive?: PickerBaseProps['responsive'];

  /** Whether this picker has an editable combobox input. */
  inputCombobox?: boolean;
  /** Editable pickers manage their own input focus after closing. */
  focusOnClose?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;

  /** Handler for keydown events */
  onKeyDown?: (event: React.KeyboardEvent) => void;

  /** Handler for click events */
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
  breakpoint?: string;
  popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
  inputCombobox?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
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
      pickerType,
      triggerProps,
      placement,
      popupType = 'listbox',
      rootRef,
      speaker,
      style,
      size,
      trigger = 'click',
      responsive = true,
      inputCombobox,
      focusOnClose = true,
      ariaLabel,
      ariaLabelledby,
      onKeyDown,
      onClick,
      ...rest
    } = props;
    const pickerTriggerProps = pick(triggerProps, triggerPropKeys);
    const pickerId = useUniqueId('rs-', id);
    const responsiveQuery = typeof responsive === 'string' ? responsive : 'xsOnly';
    const breakpoint = useBreakpointValue({ [responsiveQuery]: 'xs' }, { enabled: !!responsive });
    // Only use the breakpoint value if not disabled
    const effectiveBreakpoint = disabled ? undefined : breakpoint;

    const comboboxContext = useMemo(
      () => ({
        id: pickerId,
        hasLabel: typeof pickerTriggerProps.label !== 'undefined',
        multiple,
        placement,
        breakpoint: effectiveBreakpoint,
        popupType,
        inputCombobox,
        ariaLabel,
        ariaLabelledby
      }),
      [
        pickerId,
        multiple,
        placement,
        effectiveBreakpoint,
        popupType,
        inputCombobox,
        ariaLabel,
        ariaLabelledby,
        pickerTriggerProps.label
      ]
    );

    const pickerRoot = useRef<HTMLElement>(null);
    const closingFocusScope = useRef<HTMLElement | null>(null);
    const focusToggle = useEventCallback(() => {
      pickerRoot.current?.querySelector<HTMLElement>('[role="combobox"]')?.focus();
    });

    const handleEnter = useEventCallback(() => {
      closingFocusScope.current = null;
    });

    const handleExit = useEventCallback((node: HTMLElement) => {
      // Drawer focus enforcement includes the wrapper around the animated dialog.
      const scope = effectiveBreakpoint === 'xs' ? (node.parentElement ?? node) : node;
      closingFocusScope.current =
        focusOnClose && scope.contains(node.ownerDocument.activeElement) ? scope : null;
      if (closingFocusScope.current) focusToggle();
    });

    const handleExited = useEventCallback(() => {
      const scope = closingFocusScope.current;
      closingFocusScope.current = null;
      const root = pickerRoot.current;
      const focused = root?.ownerDocument.activeElement;
      // The Drawer may have held focus until it finished closing. Respect any
      // destination already chosen by a Tab, pointer action or consumer callback.
      if (
        scope &&
        root?.isConnected &&
        (focused === root.ownerDocument.body || scope.contains(focused ?? null))
      ) {
        focusToggle();
      }
    });

    const { withPrefix, merge } = useStyles(classPrefix);
    const classes = merge(className, withPrefix());

    return (
      <ComboboxContext.Provider value={comboboxContext}>
        <OverlayTrigger
          {...pickerTriggerProps}
          onEnter={createChainedFunction(handleEnter, pickerTriggerProps.onEnter)}
          onExit={createChainedFunction(handleExit, pickerTriggerProps.onExit)}
          onExited={createChainedFunction(handleExited, pickerTriggerProps.onExited)}
          disabled={pickerTriggerProps.disabled || pickerTriggerProps.loading}
          ref={ref}
          trigger={trigger}
          placement={placement}
          speaker={speaker}
          overlayAs={effectiveBreakpoint === 'xs' ? PickerDrawer : undefined}
        >
          <Box
            as={as}
            className={classes}
            style={style}
            ref={mergeRefs(pickerRoot, rootRef)}
            name={name}
            data-picker={pickerType}
            data-appearance={appearance}
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
