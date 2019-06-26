import * as React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill } from '../utils';

import { WhisperProps } from './Whisper.d';

class Whisper extends React.Component<WhisperProps> {
  static propTypes = {
    triggerRef: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    placement: PropTypes.string,
    /**
     * Prevent floating element overflow
     */
    preventOverflow: PropTypes.bool
  };
  render() {
    const {
      triggerRef,
      onOpen,
      onClose,
      onEntered,
      onExited,
      placement = 'right',
      preventOverflow,
      ...rest
    } = this.props;

    return (
      <OverlayTrigger
        preventOverflow={preventOverflow}
        placement={placementPolyfill(placement)}
        onEntered={createChainedFunction(onOpen, onEntered)}
        onExited={createChainedFunction(onClose, onExited)}
        ref={triggerRef} // for test
        {...rest}
      />
    );
  }
}

export default Whisper;
