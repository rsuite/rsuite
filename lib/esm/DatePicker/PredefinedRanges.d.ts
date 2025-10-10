import React from 'react';
import { StackProps } from '../Stack';
import { InnerRange, RangeType } from './types';
import { CalendarLocale } from '../locales';
export interface PredefinedRangesProps<T = any, Shortcut = T> extends StackProps {
    ranges?: RangeType<Shortcut>[];
    calendarDate: T;
    locale?: CalendarLocale;
    disableShortcut?: (value: T) => boolean;
    onShortcutClick?: (range: InnerRange<Shortcut>, closeOverlay: boolean, event: React.MouseEvent) => void;
}
declare const PredefinedRanges: React.ForwardRefExoticComponent<PredefinedRangesProps<any, any> & React.RefAttributes<HTMLDivElement>>;
export default PredefinedRanges;
