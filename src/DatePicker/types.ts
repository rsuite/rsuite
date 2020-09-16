import { CalendarLocale } from '../Calendar/types';
import { ReactNode } from 'react';

export type DatePickerLocale = CalendarLocale;

export type ToolbarValue = Date | [Date?, Date?];

export interface RangeType {
  label: ReactNode;
  closeOverlay?: boolean;
  value: ToolbarValue | ((value: ToolbarValue) => ToolbarValue);
}

export interface InnerRange extends Omit<RangeType, 'value'> {
  value: ToolbarValue;
}
