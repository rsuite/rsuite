import * as React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, refType, mergeRefs } from '../utils';
import { CustomConsumer } from '../CustomProvider';
import { PLACEMENT } from '../constants';
import { TriggerProps } from '../Overlay/OverlayTrigger.d';
import { TooltipProps } from '../Tooltip/Tooltip.d';
import { PopoverProps } from '../Popover/Popover.d';

export const overlayProps = [
  'placement',
  'shouldUpdatePosition',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop'
];

export interface WhisperProps extends TriggerProps {
  /** display element */
  speaker?:
    | React.ReactElement<TooltipProps | PopoverProps>
    | ((props: any, ref: React.RefObject<any>) => React.ReactElement);

  /** @deprecated Use `ref` instead */
  triggerRef?: React.Ref<any>;
}

export interface WhisperInstance extends React.Component<WhisperProps> {
  open: (delay?: number) => void;
  close: (delay?: number) => void;
}

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
    <CustomConsumer>
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
    </CustomConsumer>
  );
});

Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  triggerRef: refType,
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
