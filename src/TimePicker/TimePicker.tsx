import React, { useMemo } from 'react';
import DatePicker from '../DatePicker';
import { forwardRef } from '@/internals/utils';
import { useCustom } from '@/internals/hooks';
import type { DateOptionPreset, FormControlBaseProps, PickerBaseProps } from '@/internals/types';
import type { DatePickerLocale } from '../locales';

export interface TimePickerProps
  extends PickerBaseProps<DatePickerLocale>,
    FormControlBaseProps<Date | null> {
  /**
   * Custom caret component
   */
  caretAs?: React.ElementType | null;

  /**
   * Calendar panel default presentation date and time
   */
  calendarDefaultDate?: Date;

  /**
   * Whether disabled the component
   */
  disabled?: boolean;

  /**
   * Rendered as an input, the date can be entered via the keyboard
   */
  editable?: boolean;

  /**
   * Open the popup when the input is clicked. Set to false to use a separate open button.
   * Keyboard and imperative opening remain available. `caretAs={null}` hides the button.
   * @default true
   */
  openOnInputClick?: boolean;

  /**
   * Format date string
   */
  format?: string;

  /**
   * A label displayed at the beginning of toggle button
   */
  label?: React.ReactNode;

  /**
   * Whether to display a loading state indicator
   */
  loading?: boolean;

  /**
   * Whether plaintext the component
   */
  plaintext?: boolean;

  /**
   * Whether read only the component
   */
  readOnly?: boolean;

  /** Predefined time shortcuts */
  ranges?: DateOptionPreset<Date | null>[];

  /**
   * Meridiem format for 12-hour time
   */
  showMeridiem?: boolean;

  /** Disable specific hour options */
  shouldDisableHour?: (hour: number, date: Date) => boolean;

  /** Disable specific minute options */
  shouldDisableMinute?: (minute: number, date: Date) => boolean;

  /** Disable specific second options */
  shouldDisableSecond?: (second: number, date: Date) => boolean;

  /**
   * Hide specific hour options
   */
  hideHours?: (hour: number, date: Date) => boolean;

  /**
   * Hide specific minute options
   */
  hideMinutes?: (minute: number, date: Date) => boolean;

  /**
   * Hide specific second options
   */
  hideSeconds?: (second: number, date: Date) => boolean;

  /**
   * Called when the option is selected
   */
  onSelect?: (date: Date, event?: React.SyntheticEvent) => void;

  /**
   * Called after clicking the OK button
   */
  onOk?: (date: Date, event: React.SyntheticEvent) => void;

  /**
   * Called after clicking the shortcut button
   */
  onShortcutClick?: (range: DateOptionPreset<Date>, event: React.MouseEvent) => void;

  /**
   * Called when clean
   */
  onClean?: (event: React.MouseEvent) => void;

  /**
   * Custom rendering of the selected date.
   */
  renderValue?: (value: Date, format: string) => string;
}

const TimePicker = forwardRef<'div', TimePickerProps>((props, ref) => {
  const { propsWithDefaults, getLocale } = useCustom('TimePicker', props);
  const locale = getLocale('DateTimeFormats');

  const defaultRanges: DateOptionPreset<Date | null>[] = useMemo(
    () => [{ label: locale?.now, value: () => new Date() }],
    [locale]
  );

  return (
    <DatePicker
      ref={ref}
      format={locale?.shortTimeFormat}
      ranges={defaultRanges}
      {...propsWithDefaults}
    />
  );
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;
