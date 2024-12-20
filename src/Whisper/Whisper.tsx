import React from 'react';
import OverlayTrigger, {
  OverlayTriggerHandle,
  OverlayTriggerProps
} from '@/internals/Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill } from '@/internals/utils';
import { useCustom } from '../CustomProvider';

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

  return (
    <OverlayTrigger
      {...rest}
      ref={ref}
      preventOverflow={preventOverflow}
      placement={placementPolyfill(placement, rtl)}
      onEntered={createChainedFunction(onOpen, onEntered)}
      onExited={createChainedFunction(onClose as any, onExited)}
    />
  );
});

Whisper.displayName = 'Whisper';

export default Whisper;
