import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  addDays,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  subDays
} from '../../utils/dateUtils';
import { getDOMNode, getInstance } from '@test/testUtils';

import DateRangePicker from '../DateRangePicker';

describe('DateRangePicker', () => {
  it('Should render a div with "rs-picker-daterange" class', () => {
    const instance = getDOMNode(<DateRangePicker />);

    assert.equal(instance.tagName, 'DIV');
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

    assert.equal(
      instance.overlay.querySelectorAll('.rs-picker-toolbar-ranges .rs-btn-disabled').length,
      4
    );
  });

  it('Should output custom value', () => {
    const instance = getInstance(
      <DateRangePicker
        value={[parseISO('2019-04-01'), parseISO('2019-04-02')]}
        renderValue={value => {
          return `${format(value[0], 'MM/dd/yyyy')}~${format(value[1], 'MM/dd/yyyy')}`;
        }}
      />
    );

    assert.equal(
      instance.target.querySelector('.rs-picker-toggle-value').innerText,
      '04/01/2019~04/02/2019'
    );
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<DateRangePicker onChange={doneOp} defaultOpen oneTap />);

    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    assert.ok(today);

    ReactTestUtils.Simulate.click(today);
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <DateRangePicker defaultValue={[new Date(), new Date()]} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.root.querySelector('.rs-picker-toggle-clean'));
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
    assert.ok(instance.target.tagName === 'BUTTON');
  });

  it('Should be block', () => {
    const instance = getInstance(<DateRangePicker block />);
    const root = instance.root;
    assert.ok(root.className.match(/\bblock\b/));
  });

  it('Should have a custom className', () => {
    const root = getInstance(<DateRangePicker className="custom" />).root;
    assert.include(root.className, 'custom');
  });

  it('Should have a menuClassName in Menu', () => {
    const menu = getInstance(<DateRangePicker menuClassName="custom" open />).overlay;

    assert.include(menu.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';

    const root = getInstance(<DateRangePicker style={{ fontSize }} />).root;
    assert.equal(root.style.fontSize, fontSize);
  });

  it('Should select a whole week', done => {
    const doneOp = values => {
      if (
        isSameDay(startOfWeek(new Date()), values[0]) &&
        isSameDay(endOfWeek(new Date()), values[1])
      ) {
        done();
      }
    };

    const menu = getInstance(<DateRangePicker onOk={doneOp} hoverRange="week" open />).overlay;

    const today = menu?.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(menu.querySelector('.rs-picker-toolbar-right .rs-btn'));
  });

  it('Should select a whole month', done => {
    const doneOp = values => {
      if (
        isSameDay(startOfMonth(new Date()), values[0]) &&
        isSameDay(endOfMonth(new Date()), values[1])
      ) {
        done();
      }
    };

    const menu = getInstance(<DateRangePicker onOk={doneOp} hoverRange="month" open />).overlay;

    const today = menu?.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(menu.querySelector('.rs-picker-toolbar-right .rs-btn'));
  });

  it('Should select a date range by hover', () => {
    const menu = getInstance(
      <DateRangePicker
        hoverRange="week"
        open
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    ).overlay;

    const startCell = menu
      ?.querySelectorAll('.rs-calendar-table-row')[3]
      .querySelector('.rs-calendar-table-cell-content');

    const endCell = menu
      ?.querySelectorAll('.rs-calendar-table-row')[4]
      .querySelector('.rs-calendar-table-cell-content');

    ReactTestUtils.Simulate.click(startCell);
    ReactTestUtils.Simulate.mouseEnter(endCell);

    const allInRangeCells = menu.querySelectorAll(
      '.rs-calendar-table-cell-in-range, .rs-calendar-table-cell-selected-start'
    );

    assert.equal(allInRangeCells[0].innerText, '11');
    assert.equal(allInRangeCells[allInRangeCells.length - 1].innerText, '24');
  });

  it('Should select a date range by click', () => {
    const menu = getInstance(
      <DateRangePicker
        hoverRange="week"
        defaultOpen
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    ).overlay;

    const startCell = menu
      ?.querySelectorAll('.rs-calendar-table-row')[3]
      .querySelector('.rs-calendar-table-cell-content');

    const endCell = menu
      ?.querySelectorAll('.rs-calendar-table-row')[4]
      .querySelector('.rs-calendar-table-cell-content');

    ReactTestUtils.Simulate.click(startCell);
    ReactTestUtils.Simulate.mouseEnter(endCell);
    ReactTestUtils.Simulate.click(endCell);

    const allInRangeCells = menu.querySelectorAll(
      '.rs-calendar-table-cell-in-range, .rs-calendar-table-cell-selected-start'
    );

    assert.equal(allInRangeCells[0].innerText, '11');
    assert.equal(allInRangeCells[allInRangeCells.length - 1].innerText, '24');
  });

  it('Should fire `onChange` if click ok after only select one date in oneTap mode', done => {
    const doneOp = values => {
      if (
        isSameDay(startOfWeek(new Date()), values[0]) &&
        isSameDay(endOfWeek(new Date()), values[1])
      ) {
        done();
      }
    };

    const menu = getInstance(
      <DateRangePicker onChange={doneOp} hoverRange="week" oneTap defaultOpen />
    ).overlay;

    const today = menu.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );
    ReactTestUtils.Simulate.click(today);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DateRangePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should show default calendar value', () => {
    const menu = getInstance(
      <DateRangePicker
        open
        defaultCalendarValue={[new Date('2019-01-01'), new Date('2019-09-01')]}
      />,
      false
    ).overlay;

    assert.ok(menu.querySelector('div[title="01 Feb 2019"]'));
    assert.ok(menu.querySelector('div[title="01 Sep 2019"]'));
  });

  it('Should have only one calendar', () => {
    const menu = getInstance(<DateRangePicker showOneCalendar open />).overlay;

    assert.include(
      menu.querySelector('.rs-picker-daterange-panel').className,
      'rs-picker-daterange-panel-show-one-calendar'
    );

    assert.equal(menu.querySelectorAll('.rs-picker-daterange-calendar-single').length, 1);
  });

  it('Should display the formatted date', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    const input = target.querySelector('.rs-picker-toggle-textbox');

    input.value = '2020010120210707';
    ReactTestUtils.Simulate.change(input);

    assert.equal(input.value, '2020-01-01 ~ 2021-07-07');
  });

  it('Should render an error message', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    const input = target.querySelector('.rs-picker-toggle-textbox');

    input.value = 'ssss';
    ReactTestUtils.Simulate.change(input);
    assert.include(instance.root.className, 'rs-picker-error');

    ReactTestUtils.Simulate.blur(input);
    assert.notInclude(instance.root.className, 'rs-picker-error');
  });

  it('Should update the calendar when clicking on a non-current month', () => {
    const menu = getInstance(
      <DateRangePicker
        defaultOpen
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    ).overlay;

    // Jun 27, 2021
    const unSameMonthCell = menu.querySelector(
      '.rs-calendar-table-cell-un-same-month .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.mouseEnter(unSameMonthCell);
    ReactTestUtils.Simulate.click(unSameMonthCell);

    assert.equal(
      menu
        .querySelector('.rs-calendar-table-cell-un-same-month .rs-calendar-table-cell-content')
        .getAttribute('title'),
      '30 May 2021'
    );
  });
});
