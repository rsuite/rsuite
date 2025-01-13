import { parseISO } from 'date-fns';
import { DATERANGE_DISABLED_TARGET } from '@/internals/constants';
import * as utils from '../disabledDateUtils';

describe('DateRangePicker - disabledDate - utils', () => {
  it('allowedMaxDays', () => {
    const func = utils.allowedMaxDays(5);

    expect(
      func(
        parseISO('2018-12-07'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.true;

    expect(
      func(
        parseISO('2018-12-04'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.false;
  });

  it('allowedDays', () => {
    const func = utils.allowedDays(5);

    expect(
      func(
        parseISO('2018-12-06'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.true;

    expect(
      func(
        parseISO('2018-12-04'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.true;

    expect(
      func(
        parseISO('2018-12-05'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.false;
  });

  it('allowedRange', () => {
    const func = utils.allowedRange('2018-12-01', '2018-12-05');
    expect(func(parseISO('2018-12-02'))).to.be.false;
    expect(func(parseISO('2018-11-01'))).to.be.true;
    expect(func(parseISO('2018-12-16'))).to.be.true;
  });

  it('before', () => {
    const func = utils.before('2018-12-01');
    expect(func(parseISO('2018-12-02'))).to.be.false;
    expect(func(parseISO('2018-12-01'))).to.be.false;
    expect(func(parseISO('2018-11-30'))).to.be.true;
  });

  it('after', () => {
    const func = utils.after('2018-12-01');
    expect(func(parseISO('2018-12-02'))).to.be.true;
    expect(func(parseISO('2018-12-01'))).to.be.false;
    expect(func(parseISO('2018-11-30'))).to.be.false;
  });

  it('combine', () => {
    const func = utils.combine(utils.allowedMaxDays(5), utils.after('2018-12-01'));
    expect(func(parseISO('2018-12-02'))).to.be.true;
    expect(func(parseISO('2018-12-01'))).to.be.false;
    expect(func(parseISO('2018-11-30'))).to.be.false;

    expect(
      func(
        parseISO('2018-12-07'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.true;

    expect(
      func(
        parseISO('2018-11-26'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.true;

    expect(
      func(
        parseISO('2018-11-27'),
        [parseISO('2018-12-01'), null as Date | null as Date],
        false,
        DATERANGE_DISABLED_TARGET.CALENDAR
      )
    ).to.be.false;
  });
});
