import React, { useState } from 'react';
import Input from '../Input';
import { parseColor, type ColorChannels } from './colorModel';
import { useUniqueId } from '@/internals/hooks';

interface ColorValueInputProps {
  value: string;
  hue: number;
  disabled: boolean;
  label: string;
  invalidMessage: string;
  onChange: (color: ColorChannels, event: React.SyntheticEvent) => void;
}

export default function ColorValueInput(props: ColorValueInputProps) {
  const { value, hue, disabled, label, invalidMessage, onChange } = props;
  const id = useUniqueId('rs-color-value-');
  const [draft, setDraft] = useState<{ source: string; text: string; invalid: boolean } | null>(
    null
  );
  const current = draft?.source === value ? draft : null;
  const text = current?.text ?? value;
  const commit = (event: React.SyntheticEvent) => {
    if (!current || disabled) return;
    const color = parseColor(text, hue);
    if (!color) {
      setDraft({ source: value, text, invalid: true });
      return;
    }
    setDraft(null);
    onChange(color, event);
  };

  return (
    <div className="rs-color-picker-value-input">
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        value={text}
        disabled={disabled}
        spellCheck={false}
        dir="ltr"
        autoComplete="off"
        aria-invalid={current?.invalid || undefined}
        aria-describedby={current?.invalid ? `${id}-error` : undefined}
        onChange={text => setDraft({ source: value, text, invalid: false })}
        onBlur={commit}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit(event);
          }
        }}
      />
      {current?.invalid && (
        <span id={`${id}-error`} role="alert">
          {invalidMessage}
        </span>
      )}
    </div>
  );
}
