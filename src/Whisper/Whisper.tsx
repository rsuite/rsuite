import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger, {
  OverlayTriggerHandle,
  OverlayTriggerProps
} from '@/internals/Overlay/OverlayTrigger';
import { PLACEMENT } from '@/internals/constants';
import { oneOf } from '@/internals/propTypes';
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
Whisper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
  placement: oneOf(PLACEMENT),
  /**
   * Prevent floating element overflow
   */
  preventOverflow: PropTypes.bool,
  /**
   * Whether enable speaker follow cursor
   */
  followCursor: PropTypes.bool
};

export default Whisper;
