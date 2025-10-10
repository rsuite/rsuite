import { DATERANGE_DISABLED_TARGET as TARGET } from '../../internals/constants';
import { DisabledDateFunction, SelectedDatesState } from '../types';
interface UseDateDisabledProps {
    shouldDisableDate?: DisabledDateFunction;
    DEPRECATED_disabledDate?: DisabledDateFunction;
}
interface DateDisabledOptions {
    selectDate?: SelectedDatesState;
    selectedDone?: boolean;
    target?: TARGET;
}
/**
 * Returns a function that determines whether a date is disabled and is compatible with the deprecated `disabledDate` prop.
 */
export declare function useDateDisabled(props: UseDateDisabledProps): ((date: Date, options: DateDisabledOptions) => boolean) | undefined;
export default useDateDisabled;
