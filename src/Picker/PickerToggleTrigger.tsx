import React from 'react';
import _ from 'lodash';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import { placementPolyfill } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';

type TriggerType = 'click' | 'hover' | 'focus' | 'active';

export interface PickerToggleTriggerProps {
  placement?: string;
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

const PickerToggleTriggerProps = [
  'onEntered',
  'onExited',
  'open',
  'defaultOpen',
  'disabled',
  'onEnter',
  'onEntering',
  'onExit',
  'onExiting',
  'onHide',
  'container',
  'containerPadding',
  'preventOverflow',
  'positionRef'
];

const PickerToggleTrigger = React.forwardRef(
  (props: PickerToggleTriggerProps, ref: React.RefObject<any>) => {
    const { pickerProps, speaker, trigger = 'click', open, ...rest } = props;
    const placement = pickerProps.placement;

    return (
      <IntlContext.Consumer>
        {context => (
          <OverlayTrigger
            trigger={trigger}
            ref={ref}
            open={open}
            placement={placementPolyfill(placement, context?.rtl)}
            speaker={speaker}
            {..._.pick(pickerProps, PickerToggleTriggerProps)}
            {...rest}
          />
        )}
      </IntlContext.Consumer>
    );
  }
);
PickerToggleTrigger.displayName = 'PickerToggleTrigger';

export default PickerToggleTrigger;
