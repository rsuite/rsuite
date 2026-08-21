import getWeekStartDates from '../getWeekStartDates';
import { describe, expect, it } from 'vitest';

describe('internals/utils/date/getWeekStartDates', () => {
  it('Sunday is the first day of the week.', () => {
    const weeks = getWeekStartDates({ year: 2017, month: 12 }, { weekStart: 0 });
    const dates = [
      { year: 2017, month: 11, day: 26 },
      { year: 2017, month: 12, day: 3 },
      { year: 2017, month: 12, day: 10 },
      { year: 2017, month: 12, day: 17 },
      { year: 2017, month: 12, day: 24 },
      { year: 2017, month: 12, day: 31 }
    ];

    expect(weeks).to.deep.equal(dates);
  });

  it('Monday is the first day of the week.', () => {
    const weeks = getWeekStartDates({ year: 2017, month: 12 }, { weekStart: 1 });
    const dates = [
      { year: 2017, month: 11, day: 27 },
      { year: 2017, month: 12, day: 4 },
      { year: 2017, month: 12, day: 11 },
      { year: 2017, month: 12, day: 18 },
      { year: 2017, month: 12, day: 25 },
      { year: 2018, month: 1, day: 1 }
    ];

    expect(weeks).to.deep.equal(dates);
  });

  it('Should be tuesday as the first day of the week.', () => {
    const weeks = getWeekStartDates({ year: 2017, month: 12 }, { weekStart: 2 });
    const dates = [
      { year: 2017, month: 11, day: 28 },
      { year: 2017, month: 12, day: 5 },
      { year: 2017, month: 12, day: 12 },
      { year: 2017, month: 12, day: 19 },
      { year: 2017, month: 12, day: 26 },
      { year: 2018, month: 1, day: 2 }
    ];

    expect(weeks).to.deep.equal(dates);
  });

  it('Should be saturday as the first day of the week.', () => {
    const weeks = getWeekStartDates({ year: 2017, month: 12 }, { weekStart: 6 });
    const dates = [
      { year: 2017, month: 11, day: 25 },
      { year: 2017, month: 12, day: 2 },
      { year: 2017, month: 12, day: 9 },
      { year: 2017, month: 12, day: 16 },
      { year: 2017, month: 12, day: 23 },
      { year: 2017, month: 12, day: 30 }
    ];

    expect(weeks).to.deep.equal(dates);
  });

  describe('Jalali calendar system', () => {
    it('Should return Gregorian week start dates for a Jalali month (Saturday start)', () => {
      // Jalali 1402/07 (Mehr) starts on Sep 23, 2023 (Saturday)
      const weeks = getWeekStartDates(
        { year: 1402, month: 7 },
        { calendarSystem: 'jalali', weekStart: 6 }
      );

      expect(weeks[0]).to.deep.equal({ year: 2023, month: 9, day: 23 });
      expect(weeks).to.have.length(6);
    });

    it('Should default to Saturday as week start for Jalali calendar', () => {
      const weeks = getWeekStartDates({ year: 1402, month: 7 }, { calendarSystem: 'jalali' });
      const weeksWithSat = getWeekStartDates(
        { year: 1402, month: 7 },
        { calendarSystem: 'jalali', weekStart: 6 }
      );
      expect(weeks).to.deep.equal(weeksWithSat);
    });
  });
});
