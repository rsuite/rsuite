import React from 'react';
import Drawer, { DrawerProps } from '../../Drawer';
import type { OverlayTriggerProps } from '../Overlay/OverlayTrigger';

export interface PickerDrawerProps extends DrawerProps {
  speaker: OverlayTriggerProps['speaker'];
}

const speakerRef = () => {
  // This is just a no-op callback to satisfy the type requirements
};

export const PickerDrawer = React.forwardRef((props: PickerDrawerProps, ref: React.Ref<any>) => {
  const { placement = 'bottom', speaker, onClose, open, ...rest } = props;

  return (
    <Drawer placement={placement} onClose={onClose} open={open} ref={ref} {...rest}>
      {typeof speaker === 'function' ? speaker({ placement }, speakerRef) : speaker}
    </Drawer>
  );
});

PickerDrawer.displayName = 'PickerDrawer';

export default PickerDrawer;
