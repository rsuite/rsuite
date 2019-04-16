// @flow
import * as React from 'react';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import createChainedFunction from './utils/createChainedFunction';
import placementPolyfill from './utils/placementPolyfill';

type Props = {
  triggerRef?: React.ElementRef<*>,
  onOpen?: () => void,
  onClose?: () => void,
  onEntered?: () => void,
  onExited?: () => void,
  placement?: string,
  /**
   * Prevent floating element overflow
   */
  preventOverflow?: boolean
};

class Whisper extends React.Component<Props> {
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
