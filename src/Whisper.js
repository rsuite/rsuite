
// @flow
import * as React from 'react';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';

const Whisper = ({ triggerRef, ...rest }: any) => (
  <OverlayTrigger
    placement="right"
    ref={triggerRef}  // for test
    {...rest}
  />
);

export default Whisper;
