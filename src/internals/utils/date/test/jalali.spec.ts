import {
  getJalaliYear,
  getJalaliMonth,
  getJalaliDay,
  addJalaliMonths,
  getJalaliYearMonth,
  jalaliYearMonthToGregorianDate,
  getJalaliWeekStartDates,
  isEveryJalaliDayInMonth
} from '../jalali';
import { describe, expect, it } from 'vitest';

describe('internals/utils/date/jalali', () => {
  // Jan 15, 2024 = Jalali 1402/10/25 (Dey 25, 1402)
  const gregorianDate = new Date(2024, 0, 15);

  describe('getJalaliYear', () => {
    it('Should return the Jalali year for a Gregorian date', () => {
      expect(getJalaliYear(gregorianDate)).to.equal(1402);
    });
  });

  describe('getJalaliMonth', () => {
    it('Should return the Jalali month (1-indexed) for a Gregorian date', () => {
      expect(getJalaliMonth(gregorianDate)).to.equal(10); // Dey = month 10
    });
  });

  describe('getJalaliDay', () => {
    it('Should return the Jalali day for a Gregorian date', () => {
      expect(getJalaliDay(gregorianDate)).to.equal(25);
    });
  });

  describe('getJalaliYearMonth', () => {
    it('Should return Jalali year and month for a Gregorian date', () => {
      expect(getJalaliYearMonth(gregorianDate)).to.deep.equal({ year: 1402, month: 10 });
    });
  });

  describe('addJalaliMonths', () => {
    it('Should add Jalali months correctly', () => {
      const next = addJalaliMonths(gregorianDate, 1);
      // Jan 15, 2024 = 1402/10/25, +1 Jalali month = 1402/11/25
      expect(getJalaliMonth(next)).to.equal(11);
      expect(getJalaliYear(next)).to.equal(1402);
    });

    it('Should navigate across Jalali year boundary', () => {
      // Esfand 25, 1402 (month 12) + 1 = Farvardin 25, 1403 (month 1 of next year)
      const esfandDate = new Date(2024, 2, 15); // ~Esfand 1402
      const next = addJalaliMonths(esfandDate, 1);
      expect(getJalaliYear(next)).to.equal(1403);
      expect(getJalaliMonth(next)).to.equal(1); // Farvardin
    });
  });

  describe('jalaliYearMonthToGregorianDate', () => {
    it('Should return the first day of a Jalali month as Gregorian date', () => {
      // Jalali 1402/10/01 = Dec 22, 2023
      const result = jalaliYearMonthToGregorianDate({ year: 1402, month: 10 });
      expect(result.getFullYear()).to.equal(2023);
      expect(result.getMonth()).to.equal(11); // December (0-indexed)
      expect(result.getDate()).to.equal(22);
    });

    it('Should return the first day of Farvardin (Jalali New Year)', () => {
      // Jalali 1402/01/01 = March 21, 2023
      const result = jalaliYearMonthToGregorianDate({ year: 1402, month: 1 });
      expect(result.getFullYear()).to.equal(2023);
      expect(result.getMonth()).to.equal(2); // March (0-indexed)
      expect(result.getDate()).to.equal(21);
    });
  });

  describe('getJalaliWeekStartDates', () => {
    it('Should return week start dates for a Jalali month (Saturday start)', () => {
      // Jalali 1402/07 (Mehr) - starts on Sep 23, 2023 (Saturday)
      const weeks = getJalaliWeekStartDates({ year: 1402, month: 7 }, 6);

      // First week should start on Sep 23 (which is Jalali 1402/7/1, a Saturday)
      expect(weeks[0]).to.deep.equal({ year: 2023, month: 9, day: 23 });
      // All 6 rows
      expect(weeks).to.have.length(6);
      // Each row starts 7 days after the previous
      for (let i = 1; i < weeks.length; i++) {
        const prev = new Date(weeks[i - 1].year, weeks[i - 1].month - 1, weeks[i - 1].day);
        const curr = new Date(weeks[i].year, weeks[i].month - 1, weeks[i].day);
        expect(curr.getTime() - prev.getTime()).to.equal(7 * 24 * 60 * 60 * 1000);
      }
    });
  });

  describe('isEveryJalaliDayInMonth', () => {
    it('Should return true if all days in the Jalali month satisfy the predicate', () => {
      // All days should pass a "always true" predicate
      const result = isEveryJalaliDayInMonth({ year: 1402, month: 7 }, () => true);
      expect(result).to.be.true;
    });

    it('Should return false if any day in the Jalali month does not satisfy the predicate', () => {
      const result = isEveryJalaliDayInMonth({ year: 1402, month: 7 }, () => false);
      expect(result).to.be.false;
    });

    it('Should iterate all days in a 31-day Jalali month', () => {
      // First 6 months of Jalali calendar have 31 days
      const days: Date[] = [];
      isEveryJalaliDayInMonth({ year: 1402, month: 1 }, date => {
        days.push(new Date(date.year, date.month - 1, date.day));
        return true;
      });
      expect(days).to.have.length(31);
    });

    it('Should iterate all days in a 29-day Jalali month (Esfand in non-leap year)', () => {
      // Esfand 1402 is 29 days (non-leap year)
      const days: Date[] = [];
      isEveryJalaliDayInMonth({ year: 1402, month: 12 }, date => {
        days.push(new Date(date.year, date.month - 1, date.day));
        return true;
      });
      expect(days).to.have.length(29);
    });
  });
});
