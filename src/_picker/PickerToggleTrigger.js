import React from 'react';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';

type Props = {
  innerRef?: React.ElementRef<*>
};

const PickerToggleTriggerProps = [
  'onEntered',
  'onExited',
  'open',
  'defaultOpen',
  'disabled',
  'placement',
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

    return (
      <OverlayTrigger
        trigger="click"
        ref={innerRef}
        {..._.pick(pickerProps, PickerToggleTriggerProps)}
        {...rest}
      />
    );
  }
}

export default PickerToggleTrigger;
