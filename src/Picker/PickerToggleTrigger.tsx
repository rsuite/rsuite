import React from 'react';
import pick from 'lodash/pick';
import OverlayTrigger, {
  OverlayTriggerInstance,
  OverlayTriggerType
} from '../Overlay/OverlayTrigger';
import { PositionChildProps } from '../Overlay/Position';
import { placementPolyfill } from '../utils';
import { CustomConsumer } from '../CustomProvider';
import { TypeAttributes, AnimationEventProps } from '../@types/common';

export type { OverlayTriggerInstance, PositionChildProps };

export interface PickerToggleTriggerProps
  extends Omit<AnimationEventProps, 'onEntering' | 'onExiting'> {
  placement?: TypeAttributes.Placement;
  pickerProps: any;
  open?: boolean;
  trigger?: OverlayTriggerType | OverlayTriggerType[];
  children: React.ReactElement | ((props: any, ref) => React.ReactElement);
  speaker: React.ReactElement | ((props: any, ref: React.RefObject<any>) => React.ReactElement);
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

export const pickTriggerPropKeys = [...omitTriggerPropKeys, 'disabled', 'plaintext', 'readOnly'];

const PickerToggleTrigger = React.forwardRef(
  (props: PickerToggleTriggerProps, ref: React.Ref<any>) => {
    const { pickerProps, speaker, placement, trigger = 'click', ...rest } = props;

    return (
      <CustomConsumer>
        {context => (
          <OverlayTrigger
            {...rest}
            {...pick(pickerProps, pickTriggerPropKeys)}
            ref={ref}
            trigger={trigger}
            placement={placementPolyfill(placement, context?.rtl)}
            speaker={speaker}
          />
        )}
      </CustomConsumer>
    );
  }
);
PickerToggleTrigger.displayName = 'PickerToggleTrigger';

export default PickerToggleTrigger;
