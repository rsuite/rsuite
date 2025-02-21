import React from 'react';
import pick from 'lodash/pick';
import OverlayTrigger, {
  OverlayTriggerHandle,
  OverlayTriggerProps,
  OverlayTriggerType
} from '@/internals/Overlay/OverlayTrigger';
import { PositionChildProps } from '@/internals/Overlay/Position';
import { useUniqueId } from '@/internals/hooks';
import { placementPolyfill } from '@/internals/utils';
import { useCustom } from '../../CustomProvider';
import type { Placement, AnimationEventProps } from '@/internals/types';

export type { OverlayTriggerHandle, PositionChildProps };

export interface PickerToggleTriggerProps
  extends Omit<AnimationEventProps, 'onEntering' | 'onExiting'>,
    Pick<OverlayTriggerProps, 'speaker' | 'onOpen' | 'onClose'> {
  id?: string;
  /**
   * Identifies the combobox has having a popout, and indicates the type.
   *
   * @see MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
   */
  popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
  multiple?: boolean;
  placement?: Placement;
  pickerProps: any;
  open?: boolean;
  trigger?: OverlayTriggerType | OverlayTriggerType[];
  children: React.ReactElement | ((props: any, ref) => React.ReactElement);
}

export const omitTriggerPropKeys = [
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

export const pickTriggerPropKeys = [
  ...omitTriggerPropKeys,
  'disabled',
  'plaintext',
  'readOnly',
  'loading',
  'label'
];

export interface ComboboxContextProps {
  id?: string;
  multiple?: boolean;
  hasLabel?: boolean;
  popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
}

export const ComboboxContextContext = React.createContext<ComboboxContextProps>({
  popupType: 'listbox'
});

const PickerToggleTrigger = React.forwardRef(
  (props: PickerToggleTriggerProps, ref: React.Ref<any>) => {
    const {
      pickerProps,
      speaker,
      placement,
      trigger = 'click',
      id,
      multiple,
      popupType = 'listbox',
      ...rest
    } = props;
    const pickerTriggerProps = pick(pickerProps, pickTriggerPropKeys);
    const pickerId = useUniqueId('rs-', id);
    const { rtl } = useCustom();

    return (
      <ComboboxContextContext.Provider
        value={{
          id: pickerId,
          hasLabel: typeof pickerTriggerProps.label !== 'undefined',
          multiple,
          popupType
        }}
      >
        <OverlayTrigger
          {...pickerTriggerProps}
          {...rest}
          disabled={pickerTriggerProps.disabled || pickerTriggerProps.loading}
          ref={ref}
          trigger={trigger}
          placement={placementPolyfill(placement, rtl)}
          speaker={speaker}
        />
      </ComboboxContextContext.Provider>
    );
  }
);
PickerToggleTrigger.displayName = 'PickerToggleTrigger';

export default PickerToggleTrigger;
