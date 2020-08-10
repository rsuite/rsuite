import React from 'react';
import pick from 'lodash/pick';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import { placementPolyfill } from '../utils';
import { CustomConsumer } from '../CustomProvider';
import { TypeAttributes } from '../@types/common';
type TriggerType = 'click' | 'hover' | 'focus' | 'active';

export interface PickerToggleTriggerProps {
  placement?: TypeAttributes.Placement;
  pickerProps: any;
  open?: boolean;
  trigger?: TriggerType | TriggerType[];
  children: React.ReactNode;
  speaker: React.ReactElement<any>;
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
    const { pickerProps, speaker, placement, trigger = 'click', open, ...rest } = props;

    return (
      <CustomConsumer>
        {context => (
          <OverlayTrigger
            ref={ref}
            trigger={trigger}
            open={open}
            placement={placementPolyfill(placement, context?.rtl)}
            speaker={speaker}
            {...pick(pickerProps, pickerToggleTriggerProps)}
            {...rest}
          />
        )}
      </CustomConsumer>
    );
  }
);
PickerToggleTrigger.displayName = 'PickerToggleTrigger';

export default PickerToggleTrigger;
