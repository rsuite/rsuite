import { parse } from 'date-fns';
import * as utils from '../disabledDateUtils';

describe('DateRangePicker - disabledDate - utils', () => {
  it('allowedMaxDays', () => {
    const func = utils.allowedMaxDays(5);

    assert.equal(func(parse('2018-12-07'), [parse('2018-12-01'), null], false, 'CALENDAR'), true);
    assert.equal(func(parse('2018-12-04'), [parse('2018-12-01'), null], false, 'CALENDAR'), false);
  });

  it('allowedDays', () => {
    const func = utils.allowedDays(5);

    assert.equal(func(parse('2018-12-06'), [parse('2018-12-01'), null], false, 'CALENDAR'), true);
    assert.equal(func(parse('2018-12-04'), [parse('2018-12-01'), null], false, 'CALENDAR'), true);
    assert.equal(func(parse('2018-12-05'), [parse('2018-12-01'), null], false, 'CALENDAR'), false);
  });

  it('allowedRange', () => {
    const func = utils.allowedRange('2018-12-01', '2018-12-05');
    assert.equal(func(parse('2018-12-02')), false);
    assert.equal(func(parse('2018-11-01')), true);
    assert.equal(func(parse('2018-12-16')), true);
  });

  it('before', () => {
    const func = utils.before('2018-12-01');
    assert.equal(func(parse('2018-12-02')), false);
    assert.equal(func(parse('2018-12-01')), false);
    assert.equal(func(parse('2018-11-30')), true);
  });

  it('after', () => {
    const func = utils.after('2018-12-01');
    assert.equal(func(parse('2018-12-02')), true);
    assert.equal(func(parse('2018-12-01')), false);
    assert.equal(func(parse('2018-11-30')), false);
  });

  it('combine', () => {
    const func = utils.combine(utils.allowedMaxDays(5), utils.after('2018-12-01'));

    assert.equal(func(parse('2018-12-02')), true);
    assert.equal(func(parse('2018-12-01')), false);
    assert.equal(func(parse('2018-11-30')), false);

    assert.equal(func(parse('2018-12-07'), [parse('2018-12-01'), null], false, 'CALENDAR'), true);
    assert.equal(func(parse('2018-11-26'), [parse('2018-12-01'), null], false, 'CALENDAR'), true);
    assert.equal(func(parse('2018-11-27'), [parse('2018-12-01'), null], false, 'CALENDAR'), false);
  });
});
