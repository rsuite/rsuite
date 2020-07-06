import * as React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, refType, mergeRefs } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';
import { WhisperProps } from './Whisper.d';

export const overlayProps = [
  'placement',
  'shouldUpdatePosition',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop'
];

const Whisper = React.forwardRef((props: WhisperProps, ref) => {
  const {
    triggerRef,
    onOpen,
    onClose,
    onEntered,
    onExited,
    placement = 'right',
    preventOverflow,
    ...rest
  } = props;
  return (
    <IntlContext.Consumer>
      {context => (
        <OverlayTrigger
          preventOverflow={preventOverflow}
          placement={placementPolyfill(placement, context?.rtl)}
          onEntered={createChainedFunction(onOpen, onEntered)}
          onExited={createChainedFunction(onClose, onExited)}
          ref={mergeRefs(ref, triggerRef)} // for test
          {...rest}
        />
      )}
    </IntlContext.Consumer>
  );
});

Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  triggerRef: refType,
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

export default Whisper;
