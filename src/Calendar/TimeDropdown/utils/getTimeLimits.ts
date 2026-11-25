interface TimeRange {
  start: number;
  end: number;
}

interface TimeLimits {
  hours: TimeRange;
  minutes: TimeRange;
  seconds: TimeRange;
}

export function getTimeLimits(isMeridiem: boolean): TimeLimits {
  const HOURS_24H = { start: 0, end: 23 };
  const HOURS_12H = { start: 0, end: 11 };
  const MINUTES_SECONDS = { start: 0, end: 59 };

  return {
    hours: isMeridiem ? HOURS_12H : HOURS_24H,
    minutes: MINUTES_SECONDS,
    seconds: MINUTES_SECONDS
  };
}
