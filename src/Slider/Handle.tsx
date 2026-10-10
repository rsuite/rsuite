import React, { useRef } from 'react';
import Tooltip from '../Tooltip';
import Input from './Input';
import useDrag from './useDrag';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeRefs, mergeStyles } from '@/internals/utils';
import { useStyles, useEventCallback } from '@/internals/hooks';

export interface HandleProps
  extends Omit<BoxProps, 'color' | 'position' | 'height' | 'width'>,
    React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  vertical?: boolean;
  tooltip?: boolean;
  position?: number;
  value?: number;
  keepTooltipOpen?: boolean;
  renderTooltip?: (value: number | undefined) => React.ReactNode;
  onDragMove?: (event: React.DragEvent, dataset?: DOMStringMap) => void;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragEnd?: (event: React.MouseEvent, dataset?: DOMStringMap) => void;
  'data-range'?: number[];
  'data-key'?: string;
}

const Handle = forwardRef<'div', HandleProps>((props, ref) => {
  const {
    as,
    classPrefix = 'slider',
    className,
    disabled,
    readOnly,
    min,
    max,
    step,
    onInputChange,
    style,
    children,
    position,
    vertical,
    tooltip,
    value,
    role,
    tabIndex,
    keepTooltipOpen,
    renderTooltip,
    onDragStart,
    onDragMove,
    onDragEnd,
    onKeyDown,
    'data-range': dataRange,
    'data-key': dateKey,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const handleDragStart = useEventCallback((event: React.MouseEvent) => {
    inputRef.current?.focus();
    onDragStart?.(event);
  });

  const actualTooltip = tooltip || keepTooltipOpen;
  const { merge, prefix, cssVar } = useStyles(classPrefix);
  const styles = mergeStyles(style, cssVar('offset', `${position}%`));

  const { active, onMoveStart, onMouseEnter, rootRef, tooltipRef } = useDrag({
    tooltip: actualTooltip,
    disabled,
    onDragStart: handleDragStart,
    onDragMove,
    onDragEnd,
    keepTooltipOpen
  });

  const handleClasses = merge(className, prefix('handle'), { active: active || keepTooltipOpen });

  return (
    <Box
      as={as}
      role={role}
      ref={mergeRefs(ref, rootRef)}
      className={handleClasses}
      onMouseDown={onMoveStart}
      onMouseEnter={onMouseEnter}
      onTouchStart={onMoveStart}
      onKeyDown={onKeyDown}
      style={styles}
      data-range={dataRange}
      data-key={dateKey}
      data-testid="slider-handle"
    >
      {actualTooltip && (
        <Tooltip
          aria-hidden="true"
          ref={tooltipRef}
          className={prefix('tooltip')}
          data-placement={vertical ? 'left' : 'top'}
        >
          {renderTooltip ? renderTooltip(value) : value}
        </Tooltip>
      )}
      <Input
        {...rest}
        ref={inputRef}
        tabIndex={tabIndex ?? -1}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readOnly || !onInputChange}
        onChange={onInputChange}
      />
      {children}
    </Box>
  );
});

Handle.displayName = 'Handle';

export default Handle;
