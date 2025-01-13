import React, { useRef, useCallback, useEffect } from 'react';
import omit from 'lodash/omit';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import { useElementResize, useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { getDOMNode } from '../utils';
import type { WithAsProps } from '@/internals/types';
import type { OverlayTriggerHandle } from './PickerToggleTrigger';

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

export interface PickerPopupProps extends WithAsProps {
  placement?: string;
  autoWidth?: boolean;
  children?: React.ReactNode;
  target?: React.RefObject<OverlayTriggerHandle>;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const PickerPopup = forwardRef<'div', PickerPopupProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'picker-popup',
    autoWidth,
    className,
    placement = 'bottomStart',
    target,
    ...rest
  } = props;

  const overlayRef = useRef(null);
  const handleResize = useEventCallback(() => {
    const instance = target?.current;

    if (instance && resizePlacement.includes(placement)) {
      instance.updatePosition();
    }
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

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <Component
      data-testid="picker-popup"
      {...omit(rest, omitProps)}
      ref={mergeRefs(overlayRef, ref)}
      className={classes}
    />
  );
});

PickerPopup.displayName = 'PickerPopup';

export default PickerPopup;
