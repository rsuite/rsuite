import { useState } from 'react';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { formatColor, parseColor, type ColorChannels } from './colorModel';
import type { ColorPickerProps, ColorFormat } from './types';

const emptyColor: ColorChannels = { h: 0, s: 100, v: 100, a: 1 };

export default function useColorPickerState(props: ColorPickerProps) {
  const { disabled, readOnly, plaintext, disableAlpha, onChange, onFormatChange } = props;
  const locked = Boolean(disabled || readOnly || plaintext);
  const [value, setValue] = useControlled(props.value, props.defaultValue ?? null);
  const [format, setFormat] = useControlled(props.format, props.defaultFormat ?? 'hex');
  const [editing, setEditing] = useState(() => ({
    value,
    color: parseColor(value) ?? emptyColor
  }));
  // Keep interaction precision (including hue at black/gray) when a parent echoes our value.
  const color =
    editing.value === value ? editing.color : (parseColor(value, editing.color.h) ?? emptyColor);

  const changeColor = useEventCallback((next: ColorChannels, event: React.SyntheticEvent) => {
    if (locked) return;
    const nextColor = disableAlpha ? { ...next, a: 1 } : next;
    const nextValue = formatColor(nextColor, format);
    setEditing({ value: nextValue, color: nextColor });
    setValue(nextValue);
    if (nextValue !== value) onChange?.(nextValue, event);
  });

  const clear = useEventCallback((event: React.SyntheticEvent) => {
    if (locked || value === null) return;
    setValue(null);
    setEditing({ value: null, color: emptyColor });
    onChange?.(null, event);
    props.onClean?.(event);
  });

  const changeFormat = useEventCallback((next: ColorFormat, event: React.SyntheticEvent) => {
    if (locked || next === format) return;
    setFormat(next);
    onFormatChange?.(next, event);
  });

  const reset = useEventCallback(() => {
    if (props.value !== undefined) return;
    const initial = props.defaultValue ?? null;
    setValue(initial);
    setEditing({ value: initial, color: parseColor(initial) ?? emptyColor });
  });

  return { value, color, format, locked, changeColor, changeFormat, clear, reset };
}
