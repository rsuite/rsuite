import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DOMMouseMoveTracker, addStyle, getWidth } from 'dom-lib';

import Tooltip from '../Tooltip';
import { useClassNames, mergeRefs } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

interface HandleProps extends WithAsProps {
  disabled?: boolean;
  vertical?: boolean;
  tooltip?: boolean;
  rtl?: boolean;
  position?: number;
  value?: number;
  eventKey?: string;
  renderTooltip?: (value: number) => React.ReactNode;
  onDragMove?: (event: React.DragEvent, dataset: DOMStringMap) => void;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragEnd?: (event: React.MouseEvent) => void;
}

interface MoveTracker {
  captureMouseMoves(event): void;
  releaseMouseMoves(): void;
  isDragging(): boolean;
  onMouseMove(event): void;
  didMouseMove(): void;
  onMouseUp(): void;
}

const defaultProps: Partial<HandleProps> = {
  as: 'div',
  classPrefix: 'slider'
};

const Handle: RsRefForwardingComponent<'div', HandleProps> = React.forwardRef(
  (props: HandleProps, ref) => {
    const {
      as: Component,
      classPrefix,
      className,
      disabled,
      style,
      children,
      position,
      vertical,
      tooltip,
      rtl,
      value,
      eventKey,
      renderTooltip,
      onDragStart,
      onDragMove,
      onDragEnd,
      ...rest
    } = props;
    const [active, setActive] = useState(false);

    const rootRef = useRef<HTMLDivElement>();
    const horizontalKey = rtl ? 'right' : 'left';
    const direction = vertical ? 'top' : horizontalKey;
    const styles = { ...style, [direction]: `${position}%` };
    const { merge, prefix } = useClassNames(classPrefix);
    const handleClasses = merge(className, prefix('handle'), { active });

    const tooltipRef = useRef();
    const mouseMoveTracker = useRef<MoveTracker>();

    const releaseMouseMoves = useCallback(() => {
      mouseMoveTracker.current?.releaseMouseMoves();
      mouseMoveTracker.current = null;
    }, []);

    const setTooltipPosition = useCallback(() => {
      const tooltipElement = tooltipRef.current;

      if (tooltip && tooltipElement) {
        const width = getWidth(tooltipElement);
        addStyle(tooltipElement, 'left', `-${width / 2}px`);
      }
    }, [tooltip]);

    const handleDragMove = useCallback(
      (_deltaX: number, _deltaY: number, event: React.DragEvent) => {
        if (mouseMoveTracker.current?.isDragging()) {
          onDragMove?.(event, rootRef.current.dataset);
          setTooltipPosition();
        }
      },
      [onDragMove, setTooltipPosition]
    );

    const handleDragEnd = useCallback(
      (event: React.MouseEvent) => {
        setActive(false);
        releaseMouseMoves();
        onDragEnd?.(event);
      },
      [onDragEnd, releaseMouseMoves]
    );

    const getMouseMoveTracker = useCallback(() => {
      return (
        mouseMoveTracker.current ||
        new DOMMouseMoveTracker(handleDragMove, handleDragEnd, document.body)
      );
    }, [handleDragEnd, handleDragMove]);

    const handleMouseDown = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) {
          return;
        }
        mouseMoveTracker.current = getMouseMoveTracker();
        mouseMoveTracker.current?.captureMouseMoves(event);

        setActive(true);
        onDragStart?.(event);
      },
      [disabled, getMouseMoveTracker, onDragStart]
    );

    const handleMouseEnter = useCallback(() => {
      setTooltipPosition();
    }, [setTooltipPosition]);

    useEffect(() => {
      return () => {
        releaseMouseMoves();
      };
    }, [releaseMouseMoves]);

    return (
      <Component
        role="slider"
        tabIndex={disabled ? null : 0}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        aria-valuenow={value}
        aria-disabled={disabled}
        {...rest}
        ref={mergeRefs(ref, rootRef)}
        data-key={eventKey}
        className={handleClasses}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        style={styles}
      >
        {tooltip && (
          <Tooltip ref={tooltipRef} className={merge(prefix('tooltip'), 'placement-top')}>
            {renderTooltip ? renderTooltip(value) : value}
          </Tooltip>
        )}
        {children}
      </Component>
    );
  }
);

Handle.displayName = 'Handle';
Handle.defaultProps = defaultProps;
Handle.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  tooltip: PropTypes.bool,
  rtl: PropTypes.bool,
  position: PropTypes.number,
  value: PropTypes.number,
  renderTooltip: PropTypes.func,
  style: PropTypes.object,
  onDragMove: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default Handle;
