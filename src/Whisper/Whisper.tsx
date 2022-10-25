import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger, { OverlayTriggerHandle } from '../Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, PLACEMENT } from '../utils';
import { CustomContext } from '../CustomProvider';
import { OverlayTriggerProps } from '../Overlay/OverlayTrigger';

export type WhisperProps = OverlayTriggerProps;

export type WhisperInstance = OverlayTriggerHandle;

const Whisper = React.forwardRef((props: WhisperProps, ref: React.Ref<WhisperInstance>) => {
  const {
    onOpen,
    onClose,
    onEntered,
    onExited,
    placement = 'right',
    preventOverflow,
    ...rest
  } = props;

  const context = useContext(CustomContext);
  return (
    <OverlayTrigger
      {...rest}
      ref={ref}
      preventOverflow={preventOverflow}
      placement={placementPolyfill(placement, context?.rtl)}
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
  placement: PropTypes.oneOf(PLACEMENT),
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
