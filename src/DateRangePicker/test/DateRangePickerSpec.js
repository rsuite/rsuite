import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  addDays,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfWeek,
  subDays
} from '../../utils/dateUtils';
import { getDOMNode, getInstance } from '@test/testUtils';

import DateRangePicker from '../DateRangePicker';
import { zonedDate } from '../../utils/timeZone';

describe('DateRangePicker', () => {
  it('Should render a div with "rs-picker-daterange" class', () => {
    const instance = getDOMNode(<DateRangePicker />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-daterange\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DateRangePicker disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be disabled date', () => {
    const instance = getInstance(
      <DateRangePicker
        ranges={[
          {
            label: 'Yesterday',
            value: [addDays(new Date(), -1), addDays(new Date(), -1)]
          },
          {
            label: 'Today',
            value: [new Date(), new Date()]
          },
          {
            label: 'Tomorrow',
            value: [addDays(new Date(), 1), addDays(new Date(), 1)]
          },
          {
            label: 'Last 7 days',
            value: [subDays(new Date(), 6), new Date()]
          }
        ]}
        disabledDate={() => true}
        open
      />
    );

    assert.equal(instance.menu.querySelectorAll('.rs-picker-toolbar-option-disabled').length, 4);
  });

  it('Should output custom value', () => {
    const instance = getDOMNode(
      <DateRangePicker
        value={[parseISO('2019-04-01'), parseISO('2019-04-02')]}
        renderValue={value => {
          return `${format(value[0], 'MM/dd/yyyy')}~${format(value[1], 'MM/dd/yyyy')}`;
        }}
      />
    );

    assert.equal(
      instance.querySelector('.rs-picker-toggle-value').innerText,
      '04/01/2019~04/02/2019'
    );
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DateRangePicker onChange={doneOp} defaultOpen oneTap />);

    ReactTestUtils.Simulate.click(instance.menu.querySelector('.rs-calendar-table-cell-is-today'));
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DateRangePicker defaultValue={[new Date(), new Date()]} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<DateRangePicker onOpen={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<DateRangePicker onOpen={doneOp} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<DateRangePicker defaultOpen onClose={doneOp} />);
    picker.close();
  });

  it('Should output a button', () => {
    const instance = getInstance(<DateRangePicker toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<DateRangePicker block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DateRangePicker className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a menuClassName in Menu', () => {
    const instance = getInstance(<DateRangePicker menuClassName="custom" open />);
    assert.include(instance.menu.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DateRangePicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should select a whole week', done => {
    let today = null;
    const doneOp = values => {
      if (
        isSameDay(startOfWeek(new Date()), values[0]) &&
        isSameDay(endOfWeek(new Date()), values[1])
      ) {
        done();
      }
    };

    const instance = getInstance(<DateRangePicker onOk={doneOp} hoverRange="week" open />);

    today = instance.menu.querySelector('.rs-calendar-table-cell-is-today');

    ReactTestUtils.Simulate.click(today);
    setTimeout(() => {
      ReactTestUtils.Simulate.click(today);
      setTimeout(() => {
        ReactTestUtils.Simulate.click(
          instance.menu.querySelector('.rs-picker-toolbar-right-btn-ok')
        );
      }, 100);
    }, 100);
  });

  it('Should fire onChange if click ok after only select one date in oneTap mode', done => {
    const doneOp = values => {
      if (
        isSameDay(startOfWeek(new Date()), values[0]) &&
        isSameDay(endOfWeek(new Date()), values[1])
      ) {
        done();
      }
    };
    const instance = getInstance(
      <DateRangePicker onChange={doneOp} hoverRange="week" oneTap open />
    );
    const today = instance.menu.querySelector('.rs-calendar-table-cell-is-today');
    ReactTestUtils.Simulate.click(today);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DateRangePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should show default calendar value', () => {
    const instance = getInstance(
      <DateRangePicker
        open
        defaultCalendarValue={[new Date('2019-01-01'), new Date('2019-09-01')]}
      />
    );

    assert.ok(instance.menu.querySelector('div[title="01 Jan 2019"]'));
    assert.ok(instance.menu.querySelector('div[title="01 Sep 2019"]'));
  });

  it('Should have only one calendar', () => {
    const instance = getInstance(<DateRangePicker showOneCalendar open />);

    assert.include(
      instance.menu.querySelector('.rs-picker-daterange-panel').className,
      'rs-picker-daterange-panel-show-one-calendar'
    );

    assert.equal(instance.menu.querySelectorAll('.rs-picker-daterange-calendar-single').length, 1);
  });

  it('Should be zoned date', () => {
    const timeZone = 'Asia/Tokyo';
    const template = 'yyyy-MM-dd HH:mm';
    const instance = getInstance(
      <DateRangePicker
        format={template}
        timeZone={timeZone}
        oneTap
        defaultOpen
        value={[new Date(), new Date()]}
      />
    );

    const ret = instance.root.querySelector('.rs-picker-toggle-value').innerHTML;
    const zonedTodayDate = zonedDate(timeZone);

    assert.equal(ret, `${format(zonedTodayDate, template)} ~ ${format(zonedTodayDate, template)}`);
  });

  it('Should disable from next day with time zone', function () {
    const timeZone = 'Europe/London';
    const template = 'yyyy-MM-dd HH:mm:ss';
    const tomorrow = addDays(new Date(), 1);
    const instance = getInstance(
      <DateRangePicker
        format={template}
        timeZone={timeZone}
        defaultOpen
        disabledDate={date => isAfter(date, tomorrow)}
      />
    );
    const firstDisabledCell = instance.menu.querySelector('.rs-calendar-table-cell-disabled');

    assert.equal(firstDisabledCell.getAttribute('title'), format(tomorrow, 'dd MMM yyyy'));
  });
});
