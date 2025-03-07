import React, { useRef, useCallback, useEffect } from 'react';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import { useElementResize, useStyles, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { getDOMNode } from '../utils';
import type { WithAsProps } from '@/internals/types';
import type { OverlayTriggerHandle } from '@/internals/Overlay';

export interface PickerPopupProps extends WithAsProps {
  placement?: string;
  autoWidth?: boolean;
  children?: React.ReactNode;
  target?: React.RefObject<OverlayTriggerHandle | null>;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const PickerPopup = forwardRef<'div', PickerPopupProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'picker-popup',
    autoWidth,
    className,
    target,
    ...rest
  } = props;

  const overlayRef = useRef(null);

  const handleResize = useEventCallback(() => {
    target?.current?.updatePosition?.();
  });

  useElementResize(
    useCallback(() => overlayRef.current, []),
    handleResize
  );

  useEffect(() => {
    const toggle = target?.current;

    if (autoWidth && toggle?.root) {
      // Get the width value of the button,
      // and then set it to the menu to make their width consistent.
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
