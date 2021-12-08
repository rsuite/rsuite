import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import getOffset from 'dom-lib/getOffset';
import on from 'dom-lib/on';
import Transition from '../Animation/Transition';
import { mergeRefs, useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';

export interface RippleProps extends WithAsProps {
  onMouseDown?: (position: any, event: React.MouseEvent) => void;
}

const getPosition = (target: HTMLElement, event: React.MouseEvent) => {
  const offset = getOffset(target)!;
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

const Ripple = React.forwardRef((props: RippleProps, ref: React.Ref<HTMLSpanElement>) => {
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
      const position = getPosition(triggerRef.current!, event);
      setRippling(true);
      setPosition(position);
      onMouseDown?.(position, event);
    },
    [onMouseDown]
  );

  useEffect(() => {
    const parentNode = triggerRef.current!.parentNode as HTMLElement;
    const mousedownListener = on(parentNode, 'mousedown', handleMouseDown);
    return () => {
      mousedownListener?.off();
    };
  }, [handleMouseDown]);

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
Ripple.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  onMouseDown: PropTypes.func
};

export default Ripple;
