import React, { useRef } from 'react';
import { useStyles } from '@/internals/hooks';
import type { ColorChannels } from './colorModel';

interface ColorAreaProps {
  color: ColorChannels;
  disabled?: boolean;
  rtl?: boolean;
  onChange: (color: ColorChannels, event: React.SyntheticEvent) => void;
}

export default function ColorArea({ color, disabled, rtl, onChange }: ColorAreaProps) {
  const pointer = useRef<number | null>(null);
  const { prefix } = useStyles('color-picker');
  const update = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    onChange({ ...color, s: (rtl ? 1 - x : x) * 100, v: (1 - y) * 100 }, event);
  };
  const cancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointer.current === event.pointerId) pointer.current = null;
  };

  return (
    <div
      className={prefix('area')}
      aria-hidden="true"
      data-disabled={disabled || undefined}
      data-rtl={rtl || undefined}
      style={{ backgroundColor: `hsl(${color.h}, 100%, 50%)` }}
      onPointerDown={event => {
        if (disabled || event.button !== 0 || event.isPrimary === false) return;
        event.preventDefault();
        pointer.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        update(event);
      }}
      onPointerMove={event => {
        if (pointer.current === event.pointerId) update(event);
      }}
      onPointerUp={event => {
        if (pointer.current !== event.pointerId) return;
        update(event);
        pointer.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={cancel}
      onLostPointerCapture={cancel}
    >
      <span
        className={prefix('area-thumb')}
        style={{ insetInlineStart: `${color.s}%`, top: `${100 - color.v}%` }}
      />
    </div>
  );
}
