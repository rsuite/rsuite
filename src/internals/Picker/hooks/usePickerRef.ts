import { useImperativeHandle, useRef } from 'react';
import { useEventCallback } from '../../hooks';
import { RSUITE_PICKER_TYPE } from '../../symbols';
import type { OverlayTriggerHandle } from '../PickerToggleTrigger';
import type { ListHandle } from '../../Windowing';
import type { PickerHandle } from '../types';

/**
 * A hook of the exposed method of Picker
 */
function usePickerRef(ref) {
  const trigger = useRef<OverlayTriggerHandle>(null);
  const root = useRef<any>(null);
  const target = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLElement>(null);
  const list = useRef<ListHandle>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const treeView = useRef<HTMLDivElement>(null);

  const handleOpen = useEventCallback(() => {
    trigger?.current?.open();
  });

  const handleClose = useEventCallback(() => {
    trigger?.current?.close();
  });

  const handleUpdatePosition = useEventCallback(() => {
    trigger?.current?.updatePosition();
  });

  useImperativeHandle(ref, (): PickerHandle => {
    return {
      get root() {
        return (root?.current || trigger?.current?.root) ?? null;
      },
      get overlay() {
        if (!overlay?.current) {
          throw new Error('The overlay is not found. Please confirm whether the picker is open.');
        }

        return overlay?.current ?? null;
      },
      get target() {
        return target?.current ?? null;
      },
      get list() {
        if (!list?.current) {
          throw new Error(`
            The list is not found.
            1.Please set virtualized for the component.
            2.Please confirm whether the picker is open.
          `);
        }
        return list?.current;
      },
      type: RSUITE_PICKER_TYPE,
      updatePosition: handleUpdatePosition,
      open: handleOpen,
      close: handleClose
    };
  });

  return {
    trigger,
    root,
    overlay,
    target,
    list,
    searchInput,
    treeView
  };
}

export default usePickerRef;
