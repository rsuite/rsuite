export enum TimeProp {
  // @deprecated
  DisabledHours = 'disabledHours',
  // @deprecated
  DisabledMinutes = 'disabledMinutes',
  // @deprecated
  DisabledSeconds = 'disabledSeconds',
  ShouldDisableHour = 'shouldDisableHour',
  ShouldDisableMinute = 'shouldDisableMinute',
  ShouldDisableSecond = 'shouldDisableSecond',
  HideHours = 'hideHours',
  HideMinutes = 'hideMinutes',
  HideSeconds = 'hideSeconds'
}

export type CalendarOnlyPropsType = TimeProp;

export const calendarOnlyProps = [
  TimeProp.DisabledHours,
  TimeProp.DisabledMinutes,
  TimeProp.DisabledSeconds,
  TimeProp.HideHours,
  TimeProp.HideMinutes,
  TimeProp.HideSeconds
] as const;
