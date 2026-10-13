import React from 'react';
import Button from '../Button';
import ColorArea from './ColorArea';
import ColorValueInput from './ColorValueInput';
import ColorSwatch from './ColorSwatch';
import { formatColor, parseColor, type ColorChannels, type ColorFormat } from './colorModel';
import { useStyles } from '@/internals/hooks';
import { useCombobox } from '@/internals/Picker';
import type { ColorPickerPreset } from './types';
import type enGB from '../locales/en_GB';

interface ColorPickerPanelProps {
  color: ColorChannels;
  value: string | null;
  format: ColorFormat;
  disableAlpha?: boolean;
  disabled: boolean;
  cleanable: boolean;
  rtl?: boolean;
  presets?: readonly (string | ColorPickerPreset)[];
  locale: typeof enGB.ColorPicker;
  onChange: (color: ColorChannels, event: React.SyntheticEvent) => void;
  onFormatChange: (format: ColorFormat, event: React.SyntheticEvent) => void;
  onClear: (event: React.SyntheticEvent) => void;
  onClose: () => void;
}

export default function ColorPickerPanel(props: ColorPickerPanelProps) {
  const {
    color,
    value,
    format,
    disableAlpha,
    disabled,
    cleanable,
    rtl,
    presets,
    locale,
    onChange,
    onFormatChange,
    onClear,
    onClose
  } = props;
  const { prefix } = useStyles('color-picker');
  const { id, labelId, ariaLabel, ariaLabelledby, breakpoint } = useCombobox();
  const inDrawer = breakpoint === 'xs';
  const channels = [
    { key: 'h', label: locale.hue, max: 360, value: color.h },
    { key: 's', label: locale.saturation, max: 100, value: color.s },
    { key: 'v', label: locale.brightness, max: 100, value: color.v },
    ...(!disableAlpha ? [{ key: 'a', label: locale.opacity, max: 100, value: color.a * 100 }] : [])
  ];
  const display = value && !parseColor(value) ? value : value ? formatColor(color, format) : '';
  const selected = value && parseColor(value) ? formatColor(parseColor(value)!) : null;

  return (
    <div
      className={prefix('panel')}
      dir={rtl ? 'rtl' : undefined}
      role={inDrawer ? undefined : 'dialog'}
      id={inDrawer ? undefined : `${id}-dialog`}
      aria-labelledby={inDrawer ? undefined : ariaLabelledby || labelId}
      aria-label={
        inDrawer || ariaLabelledby || labelId ? undefined : ariaLabel || locale.dialogTitle
      }
    >
      <ColorArea color={color} disabled={disabled} rtl={rtl} onChange={onChange} />
      <div className={prefix('channels')}>
        {channels.map(channel => (
          <label key={channel.key} className={prefix('channel')}>
            <span>{channel.label}</span>
            <input
              type="range"
              min={0}
              max={channel.max}
              step={1}
              value={channel.value}
              disabled={disabled}
              aria-valuetext={`${Math.round(channel.value)}${channel.key === 'h' ? '°' : '%'}`}
              data-channel={channel.key}
              onChange={event =>
                onChange(
                  {
                    ...color,
                    [channel.key]: Number(event.target.value) / (channel.key === 'a' ? 100 : 1)
                  },
                  event
                )
              }
            />
            <output aria-hidden="true">
              {Math.round(channel.value)}
              {channel.key === 'h' ? '°' : '%'}
            </output>
          </label>
        ))}
      </div>
      <div className={prefix('entry')}>
        <label className={prefix('format')}>
          <span>{locale.format}</span>
          <select
            value={format}
            disabled={disabled}
            onChange={event => onFormatChange(event.target.value as ColorFormat, event)}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>
        </label>
        <ColorValueInput
          value={display}
          hue={color.h}
          disabled={disabled}
          label={locale.value}
          invalidMessage={locale.invalidColor}
          onChange={onChange}
        />
      </div>
      {!!presets?.length && (
        <div role="group" aria-label={locale.presets} className={prefix('presets')}>
          {presets.map((preset, index) => {
            const { value, label = value } =
              typeof preset === 'string' ? { value: preset } : preset;
            const parsed = parseColor(value);
            if (!parsed) return null;
            const hex = formatColor(parsed);
            return (
              <button
                key={`${value}-${index}`}
                type="button"
                className={prefix('preset')}
                aria-label={label}
                title={label}
                aria-pressed={selected === hex}
                disabled={disabled}
                onClick={event => onChange(parsed, event)}
              >
                <ColorSwatch color={hex} />
              </button>
            );
          })}
        </div>
      )}
      <div className={prefix('actions')}>
        {cleanable && (
          <Button size="sm" disabled={disabled || value === null} onClick={onClear}>
            {locale.clear}
          </Button>
        )}
        <Button size="sm" appearance="primary" onClick={onClose}>
          {locale.done}
        </Button>
      </div>
    </div>
  );
}
