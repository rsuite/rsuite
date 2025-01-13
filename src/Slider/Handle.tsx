import React from 'react';
import Tooltip from '../Tooltip';
import Input from './Input';
import useDrag from './useDrag';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface HandleProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  vertical?: boolean;
  tooltip?: boolean;
  rtl?: boolean;
  position?: number;
  value?: number;
  renderTooltip?: (value: number | undefined) => React.ReactNode;
  onDragMove?: (event: React.DragEvent, dataset?: DOMStringMap) => void;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragEnd?: (event: React.MouseEvent, dataset?: DOMStringMap) => void;
  'data-range'?: number[];
  'data-key'?: string;
}

const Handle = forwardRef<'div', HandleProps>((props, ref) => {
  const {
    as: Component = 'div',
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
    renderTooltip,
    onDragStart,
    onDragMove,
    onDragEnd,
    onKeyDown,
    'data-range': dataRange,
    'data-key': dateKey,
    ...rest
  } = props;

  const horizontalKey = rtl ? 'right' : 'left';
  const direction = vertical ? 'bottom' : horizontalKey;
  const styles = { ...style, [direction]: `${position}%` };
  const { merge, prefix } = useClassNames(classPrefix);

  const { active, onMoveStart, onMouseEnter, rootRef, tooltipRef } = useDrag({
    tooltip,
    disabled,
    onDragStart,
    onDragMove,
    onDragEnd
  });

  const handleClasses = merge(className, prefix('handle'), { active });

  return (
    <Component
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
      {tooltip && (
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
    </Component>
  );
});

Handle.displayName = 'Handle';

export default Handle;
