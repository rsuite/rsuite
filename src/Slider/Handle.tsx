import React from 'react';
import Tooltip from '../Tooltip';
import Input from './Input';
import useDrag from './useDrag';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeRefs, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface HandleProps extends BoxProps, React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  vertical?: boolean;
  tooltip?: boolean;
  rtl?: boolean;
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
    style,
    children,
    position,
    vertical,
    tooltip,
    rtl,
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

  const actualTooltip = tooltip || keepTooltipOpen;
  const horizontalKey = rtl ? 'right' : 'left';
  const direction = vertical ? 'bottom' : horizontalKey;
  const styles = mergeStyles(style, { [direction]: `${position}%` });
  const { merge, prefix } = useStyles(classPrefix);

  const { active, onMoveStart, onMouseEnter, rootRef, tooltipRef } = useDrag({
    tooltip: actualTooltip,
    disabled,
    onDragStart,
    onDragMove,
    onDragEnd,
    keepTooltipOpen
  });

  const handleClasses = merge(className, prefix('handle'), { active: active || keepTooltipOpen });

  return (
    <Box
      as={as}
      role={role}
      tabIndex={tabIndex}
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
          className={merge(prefix('tooltip'), 'placement-top')}
        >
          {renderTooltip ? renderTooltip(value) : value}
        </Tooltip>
      )}
      <Input tabIndex={-1} value={value} {...rest} />
      {children}
    </Box>
  );
});

Handle.displayName = 'Handle';

export default Handle;
