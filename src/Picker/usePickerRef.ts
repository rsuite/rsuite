import { useCallback, useImperativeHandle, useRef } from 'react';
import type { OverlayTriggerHandle } from './PickerToggleTrigger';
import type { ListHandle } from '../Windowing';

export interface PickerDependentParameters {
  inline?: boolean;
}

import type { PickerHandle } from './types';

/**
 * A hook of the exposed method of Picker
 */
function usePickerRef(ref, parmas?: PickerDependentParameters) {
  const trigger = useRef<OverlayTriggerHandle>(null);
  const root = useRef<HTMLElement>(null);
  const target = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLElement>(null);
  const list = useRef<ListHandle>(null);

  const { inline } = parmas || {};

  const handleOpen = useCallback(() => {
    trigger?.current?.open();
  }, [trigger]);

  const handleClose = useCallback(() => {
    trigger?.current?.close();
  }, [trigger]);

  const handleUpdatePosition = useCallback(() => {
    trigger?.current?.updatePosition();
  }, [trigger]);

  useImperativeHandle(ref, (): PickerHandle => {
    // Tree and CheckTree
    if (inline) {
      return {
        get root() {
          return root?.current ? root?.current : trigger?.current?.root ?? null;
        },
        get list() {
          if (!list?.current) {
            throw new Error('The list is not found, please set `virtualized` for the component.');
          }
          return list?.current;
        }
      };
    }

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
    list
  };
}

export default usePickerRef;
