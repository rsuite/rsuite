import React, { useRef, useState, useEffect, useCallback } from 'react';
import getOffset from 'dom-lib/getOffset';
import on from 'dom-lib/on';
import Transition from '../../Animation/Transition';
import { useClassNames } from '@/internals/hooks';
import { mergeRefs, forwardRef } from '@/internals/utils';
import { useCustom } from '../../CustomProvider';
import type { Offset, WithAsProps } from '@/internals/types';

export interface RippleProps extends WithAsProps {
  onMouseDown?: (position: any, event: React.MouseEvent) => void;
}

const getPosition = (target: HTMLElement, event: React.MouseEvent) => {
  const offset = getOffset(target) as Offset;
  const offsetX = (event.pageX || 0) - offset.left;
  const offsetY = (event.pageY || 0) - offset.top;

  const radiusX = Math.max(offset.width - offsetX, offsetX);
  const radiusY = Math.max(offset.height - offsetY, offsetY);
  const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));

  return {
    width: radius * 2,
    height: radius * 2,
    left: offsetX - radius,
    top: offsetY - radius
  };
};

/**
 * The `Ripple` component is used to implement the ripple effect.
 * @private
 */
const Ripple = forwardRef<'span', RippleProps>((props, ref) => {
  const { disableRipple } = useCustom();
  const { as: Component = 'span', className, classPrefix = 'ripple', onMouseDown, ...rest } = props;
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, prefix('pond'));
  const triggerRef = useRef<HTMLElement>(null);
  const [rippling, setRippling] = useState(false);
  const [position, setPosition] = useState<React.CSSProperties>();

  const handleRippled = () => {
    setRippling(false);
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (triggerRef.current) {
        const position = getPosition(triggerRef.current, event);
        setRippling(true);
        setPosition(position);
        onMouseDown?.(position, event);
      }
    },
    [onMouseDown]
  );

  useEffect(() => {
    const parentNode = triggerRef.current?.parentNode;
    if (parentNode) {
      const mousedownListener = on(parentNode, 'mousedown', handleMouseDown);
      return () => {
        mousedownListener?.off();
      };
    }
  }, [handleMouseDown]);

  if (disableRipple) {
    return null;
  }

  return (
    <Component {...rest} className={classes} ref={mergeRefs(triggerRef, ref)}>
      <Transition in={rippling} enteringClassName={prefix('rippling')} onEntered={handleRippled}>
        {(props, ref) => {
          const { className, ...transitionRest } = props;
          return (
            <span
              {...transitionRest}
              ref={ref}
              className={merge(withClassPrefix(), className)}
              style={position}
            />
          );
        }}
      </Transition>
    </Component>
  );
});

Ripple.displayName = 'Ripple';

export default Ripple;
