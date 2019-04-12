import React from 'react';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import placementPolyfill from '../utils/placementPolyfill';

type Props = {
  innerRef?: React.ElementRef<*>,
  placement?: string
};

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
  'containerPadding'
];

class PickerToggleTrigger extends React.Component<Props, State> {
  render() {
    const { innerRef, pickerProps, ...rest } = this.props;
    const placement = placementPolyfill(pickerProps.placement);

    return (
      <OverlayTrigger
        trigger="click"
        ref={innerRef}
        placement={placement}
        {..._.pick(pickerProps, PickerToggleTriggerProps)}
        {...rest}
      />
    );
  }
}

export default PickerToggleTrigger;
