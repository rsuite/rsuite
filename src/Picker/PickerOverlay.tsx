import React, { useRef, useCallback, useEffect } from 'react';
import omit from 'lodash/omit';
import { addStyle, getWidth } from 'dom-lib';
import { getDOMNode, mergeRefs, useElementResize, useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { OverlayTriggerInstance } from '../Picker';

const omitProps = [
  'placement',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop',
  'getPositionInstance',
  'getToggleInstance',
  'autoWidth'
];

const resizePlacement = [
  'topStart',
  'topEnd',
  'leftEnd',
  'rightEnd',
  'auto',
  'autoVerticalStart',
  'autoVerticalEnd',
  'autoHorizontalEnd'
];

export interface PickerOverlayProps extends WithAsProps {
  placement?: string;
  autoWidth?: boolean;
  children?: React.ReactNode;
  target?: React.RefObject<OverlayTriggerInstance>;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const PickerOverlay: RsRefForwardingComponent<'div', PickerOverlayProps> = React.forwardRef(
  (props: PickerOverlayProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'picker-menu',
      autoWidth,
      className,
      placement,
      target,
      ...rest
    } = props;

    const overlayRef = useRef();
    const handleResize = useCallback(() => {
      const instance = target?.current;

      if (instance && resizePlacement.includes(placement)) {
        instance.updatePosition();
      }
    }, [target, placement]);

    useElementResize(
      useCallback(() => overlayRef.current, []),
      handleResize
    );
    useEffect(() => {
      const toggle = target?.current;

      if (autoWidth && toggle.root) {
        // Get the width value of the button,
        // and then set it to the menu to make their width consistent.
        const width = getWidth(getDOMNode(toggle.root));
        addStyle(overlayRef.current, 'min-width', `${width}px`);
      }
    }, [autoWidth, target, overlayRef]);

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component {...omit(rest, omitProps)} ref={mergeRefs(overlayRef, ref)} className={classes} />
    );
  }
);

PickerOverlay.displayName = 'PickerOverlay';

export default PickerOverlay;
