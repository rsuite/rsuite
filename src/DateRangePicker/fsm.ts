import { DateUtils } from '../utils';

type DateRangePickerFSMState =
  | { current: 'Empty' }
  | { current: 'HalfDone'; date: Date }
  // The dates only represent which date cells have been selected
  // They aren't "the next value to be emitted via onChange"
  // because they're not time-precise
  // The next value to be emitted is calculated when onChange is about to be called
  | { current: 'Done'; dates: readonly [Date, Date] };

type DateRangePickerFSMAction =
  | { type: 'Initialize'; state: DateRangePickerFSMState }
  | { type: 'SelectDate'; date: Date }
  // Occurs in oneTap mode or user clicking shortcuts
  | { type: 'SelectRange'; dates: readonly [Date, Date] }
  | { type: 'Reset' };

export function reducer(
  state: DateRangePickerFSMState,
  action: DateRangePickerFSMAction
): DateRangePickerFSMState {
  if (action.type === 'Initialize') {
    return action.state;
  }
  if (action.type === 'Reset') {
    return {
      current: 'Empty'
    };
  }

  if (action.type === 'SelectRange') {
    return {
      current: 'Done',
      dates: action.dates
    };
  }

  if (state.current === 'Empty' && action.type === 'SelectDate') {
    return {
      current: 'HalfDone',
      date: action.date
    };
  }

  if (state.current === 'HalfDone' && action.type === 'SelectDate') {
    return {
      current: 'Done',
      dates: DateUtils.isAfter(state.date, action.date)
        ? [action.date, state.date]
        : [state.date, action.date]
    };
  }
  if (state.current === 'Done' && action.type === 'SelectDate') {
    return {
      current: 'HalfDone',
      date: action.date
    };
  }

  return state;
}
