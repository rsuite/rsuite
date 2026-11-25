import type React from 'react';
import type { FormControlBaseProps, PickerBaseProps } from '@/internals/types';
import type { ColorPickerLocale } from '../locales';
import type { ColorFormat } from './colorModel';

export interface ColorPickerPreset {
  /** An sRGB hex, rgb(), hsl(), or transparent color. */
  value: string;
  /** An accessible name for the swatch. Defaults to its color value. */
  label?: string;
}

export interface ColorPickerProps
  extends Omit<PickerBaseProps<ColorPickerLocale>, 'popupAutoWidth'>,
    FormControlBaseProps<string | null> {
  /** Selected sRGB hex, rgb(), hsl(), or transparent color. Null clears the selection. */
  value?: string | null;
  /** Initial color, using the same syntax as value. */
  defaultValue?: string | null;
  /** Output format for subsequent edits (controlled). */
  format?: ColorFormat;
  /** Initial output format. @default 'hex' */
  defaultFormat?: ColorFormat;
  /** Hide opacity controls and produce opaque colors when editing. */
  disableAlpha?: boolean;
  /** Optional labeled color swatches. */
  presets?: readonly (string | ColorPickerPreset)[];
  /** Label displayed before the selected color. */
  label?: React.ReactNode;
  /** ID of the native form associated with the selected value. */
  form?: string;
  /** Called when the value is cleared by the user. */
  onClean?: (event: React.SyntheticEvent) => void;
  /** Called when the user selects a different output format. */
  onFormatChange?: (format: ColorFormat, event: React.SyntheticEvent) => void;
  /** Called before the trigger's built-in keyboard handling. */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}

export type { ColorFormat };
