import React, { useCallback, useMemo, useRef, useState } from 'react';
import OverlayTrigger, { OverlayTriggerProps } from '@/internals/Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, isFragment } from '@/internals/utils';
import { useCustom, useUniqueId, useIsomorphicLayoutEffect } from '@/internals/hooks';
import Tooltip from '../Tooltip';
import { TooltipDescriptionContext } from '@/internals/Overlay/TooltipDescriptionContext';
import type { OverlayTriggerHandle } from '@/internals/Overlay';

export type WhisperProps = OverlayTriggerProps;
export type WhisperInstance = OverlayTriggerHandle;

/**
 * The `Whisper` component is used to display a floating element.
 * It is usually used with the `Tooltip` and `Popover` components.
 *
 * @see https://rsuitejs.com/components/whisper
 */
const Whisper = React.forwardRef((props: WhisperProps, ref: React.Ref<WhisperInstance>) => {
  const { propsWithDefaults, rtl } = useCustom('Whisper', props);
  const {
    onOpen,
    onClose,
    onEntered,
    onExited,
    placement = 'right',
    preventOverflow,
    ...rest
  } = propsWithDefaults;

  const id = useUniqueId('rs-tooltip-');
  const triggerRef = useRef<HTMLElement | null>(null);
  const speakerRef = useRef<HTMLElement | null>(null);
  const [descriptionId, setDescriptionId] = useState<string>();
  const automatic =
    rest.controlId === undefined &&
    !rest.overlayAs &&
    React.isValidElement(rest.speaker) &&
    rest.speaker.type === Tooltip &&
    React.isValidElement(rest.children) &&
    !isFragment(rest.children);
  const automaticRef = useRef(automatic);

  const refresh = useCallback(() => {
    const node = speakerRef.current;
    const trigger = triggerRef.current;
    const nextId =
      automaticRef.current &&
      node?.isConnected &&
      trigger?.isConnected &&
      node.ownerDocument === trigger.ownerDocument &&
      node.getAttribute('role') === 'tooltip' &&
      node.id &&
      !/[ \t\n\r\f]/.test(node.id) &&
      node.ownerDocument.getElementById(node.id) === node
        ? node.id
        : undefined;

    setDescriptionId(previous => (previous === nextId ? previous : nextId));
  }, []);

  const onNodeChange = useCallback(
    (node: HTMLElement | null) => {
      speakerRef.current =
        node?.nodeType === 1 && typeof node.getAttribute === 'function' ? node : null;
      refresh();
    },
    [refresh]
  );
  const description = useMemo(
    () => ({ id, triggerRef, descriptionId, onNodeChange, refresh }),
    [id, descriptionId, onNodeChange, refresh]
  );

  useIsomorphicLayoutEffect(() => {
    automaticRef.current = automatic;
    refresh();
  }, [automatic, refresh]);

  return (
    <TooltipDescriptionContext.Provider value={automatic ? description : undefined}>
      <OverlayTrigger
        {...rest}
        ref={ref}
        preventOverflow={preventOverflow}
        placement={placementPolyfill(placement, rtl)}
        onEntered={createChainedFunction(onOpen, onEntered)}
        onExited={createChainedFunction(onClose as any, onExited)}
      />
    </TooltipDescriptionContext.Provider>
  );
});

Whisper.displayName = 'Whisper';

export default Whisper;
