import React from 'react';
import pick from 'lodash/pick';
import OverlayTrigger, { OverlayTriggerInstance } from '../Overlay/OverlayTrigger';
import { PositionChildProps } from '../Overlay/Position';
import { placementPolyfill } from '../utils';
import { CustomConsumer } from '../CustomProvider';
import { TypeAttributes } from '../@types/common';
type TriggerType = 'click' | 'hover' | 'focus' | 'active';

export type { OverlayTriggerInstance, PositionChildProps };

export interface PickerToggleTriggerProps {
  placement?: TypeAttributes.Placement;
  pickerProps: any;
  open?: boolean;
  trigger?: TriggerType | TriggerType[];
  children: React.ReactElement | ((props: any, ref) => React.ReactElement);
  speaker: React.ReactElement | ((props: any, ref: React.RefObject<any>) => React.ReactElement);
  positionRef?: React.Ref<any>;
  onEnter?: (node: null | Element | Text) => void;
  onEntered?: (node: null | Element | Text) => void;
  onExit?: (node: null | Element | Text) => void;
  onExited?: (node: null | Element | Text) => void;
}

export const pickerToggleTriggerProps = [
  'onEntered',
  'onExited',
  'onEnter',
  'onEntering',
  'onExit',
  'onExiting',
  'open',
  'defaultOpen',
  'disabled',
  'onHide',
  'container',
  'containerPadding',
  'preventOverflow',
  'positionRef'
];

const PickerToggleTrigger = React.forwardRef(
  (props: PickerToggleTriggerProps, ref: React.Ref<any>) => {
    const { pickerProps, speaker, placement, trigger = 'click', ...rest } = props;

    return (
      <CustomConsumer>
        {context => (
          <OverlayTrigger
            {...rest}
            {...pick(pickerProps, pickerToggleTriggerProps)}
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
