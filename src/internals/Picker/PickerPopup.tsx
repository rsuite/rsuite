import React, { useRef, useCallback, useEffect } from 'react';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import { useElementResize, useStyles, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { getDOMNode } from '../utils';
import { useCombobox } from '@/internals/Picker';
import type { WithAsProps } from '@/internals/types';
import type { OverlayTriggerHandle } from '@/internals/Overlay';

export interface PickerPopupProps extends WithAsProps {
  placement?: string;
  autoWidth?: boolean;
  children?: React.ReactNode;
  target?: React.RefObject<OverlayTriggerHandle | null>;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Define an array of placements that require resizing
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

const PickerPopup = forwardRef<'div', PickerPopupProps>((props, ref) => {
  const { placement } = useCombobox();
  const {
    as: Component = 'div',
    autoWidth,
    className,
    classPrefix = 'picker-popup',
    target,
    ...rest
  } = props;

  const overlayRef = useRef(null);

  const handleResize = useEventCallback(() => {
    const instance = target?.current;

    if (instance && placement && resizePlacement.includes(placement)) {
      instance.updatePosition?.();
    }
  });

  // Use useElementResize hook to listen for element size changes
  useElementResize(
    useCallback(() => overlayRef.current, []),
    handleResize
  );

  useEffect(() => {
    const toggle = target?.current;

    if (autoWidth && toggle?.root) {
      // Get the width of the button and set it to the menu to make them consistent
      const width = getWidth(getDOMNode(toggle.root));

      if (overlayRef.current) {
        addStyle(overlayRef.current, 'min-width', `${width}px`);
      }
    }
  }, [autoWidth, target, overlayRef]);

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Component
      data-testid="picker-popup"
      ref={mergeRefs(overlayRef, ref)}
      className={classes}
      {...rest}
    />
  );
});

PickerPopup.displayName = 'PickerPopup';

export default PickerPopup;
