import React from 'react';
import Drawer, { DrawerProps } from '../../Drawer';
import type { OverlayTriggerProps } from '../Overlay/OverlayTrigger';
import useCombobox from './hooks/useCombobox';
import { useCustom } from '../hooks';

export interface PickerDrawerProps extends DrawerProps {
  speaker: OverlayTriggerProps['speaker'];
}

const speakerRef = () => {
  // This is just a no-op callback to satisfy the type requirements
};

export const PickerDrawer = React.forwardRef((props: PickerDrawerProps, ref: React.Ref<any>) => {
  const { placement = 'bottom', speaker, onClose, open, ...rest } = props;
  const { id, inputCombobox, popupType, labelId, ariaLabel, ariaLabelledby } = useCombobox();
  const namedDialog = inputCombobox || popupType === 'dialog';
  const { getLocale } = useCustom();
  const dialogLabelId = `${id}-dialog-label`;
  const useDialogLabel = !(ariaLabelledby || labelId);

  return (
    <Drawer
      placement={placement}
      onClose={onClose}
      open={open}
      ref={ref}
      // These pickers manage their input focus and restore it after closing.
      autoFocus={namedDialog ? false : undefined}
      enforceFocus={namedDialog ? !!open : undefined}
      {...(popupType === 'dialog' ? { size: 'lg' as const, style: { maxHeight: '100dvh' } } : {})}
      {...rest}
      id={namedDialog ? `${id}-dialog` : rest.id}
      aria-labelledby={
        namedDialog
          ? useDialogLabel
            ? dialogLabelId
            : ariaLabelledby || labelId
          : rest['aria-labelledby']
      }
    >
      {namedDialog && useDialogLabel && (
        <span id={dialogLabelId} hidden>
          {ariaLabel || getLocale('Combobox').placeholder}
        </span>
      )}
      {typeof speaker === 'function' ? speaker({ placement }, speakerRef) : speaker}
    </Drawer>
  );
});

PickerDrawer.displayName = 'PickerDrawer';

export default PickerDrawer;
