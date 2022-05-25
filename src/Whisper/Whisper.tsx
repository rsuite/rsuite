import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger, { OverlayTriggerInstance } from '../Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, PLACEMENT } from '../utils';
import { CustomConsumer } from '../CustomProvider';
import { OverlayTriggerProps } from '../Overlay/OverlayTrigger';

export type WhisperProps = OverlayTriggerProps;

export type WhisperInstance = OverlayTriggerInstance;

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
  return (
    <CustomConsumer>
      {context => (
        <OverlayTrigger
          {...rest}
          ref={ref}
          preventOverflow={preventOverflow}
          placement={placementPolyfill(placement, context?.rtl)}
          onEntered={createChainedFunction(onOpen, onEntered)}
          onExited={createChainedFunction(onClose, onExited)}
        />
      )}
    </CustomConsumer>
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
  preventOverflow: PropTypes.bool
};

export default Whisper;
