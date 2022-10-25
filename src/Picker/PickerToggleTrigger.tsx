import React, { useContext } from 'react';
import pick from 'lodash/pick';
import OverlayTrigger, {
  OverlayTriggerHandle,
  OverlayTriggerProps,
  OverlayTriggerType
} from '../Overlay/OverlayTrigger';
import { PositionChildProps } from '../Overlay/Position';
import { placementPolyfill } from '../utils';
import { CustomContext } from '../CustomProvider';
import { TypeAttributes, AnimationEventProps } from '../@types/common';

export type { OverlayTriggerHandle, PositionChildProps };

export interface PickerToggleTriggerProps
  extends Omit<AnimationEventProps, 'onEntering' | 'onExiting'>,
    Pick<OverlayTriggerProps, 'speaker' | 'onClose'> {
  placement?: TypeAttributes.Placement;
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
  'defaultOpen',
  'onHide',
  'container',
  'containerPadding',
  'preventOverflow'
];

export const pickTriggerPropKeys = [
  ...omitTriggerPropKeys,
  'disabled',
  'plaintext',
  'readOnly',
  'loading'
];

const PickerToggleTrigger = React.forwardRef(
  (props: PickerToggleTriggerProps, ref: React.Ref<any>) => {
    const { pickerProps, speaker, placement, trigger = 'click', ...rest } = props;

    const pickerTriggerProps = pick(pickerProps, pickTriggerPropKeys);

    const context = useContext(CustomContext);
    return (
      <OverlayTrigger
        {...rest}
        {...pickerTriggerProps}
        disabled={pickerTriggerProps.disabled || pickerTriggerProps.loading}
        ref={ref}
        trigger={trigger}
        placement={placementPolyfill(placement, context?.rtl)}
        speaker={speaker}
      />
    );
  }
);
PickerToggleTrigger.displayName = 'PickerToggleTrigger';

export default PickerToggleTrigger;
