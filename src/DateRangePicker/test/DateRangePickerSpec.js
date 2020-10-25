import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
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
import { createTestContainer } from '../../../test/testUtils';
import { setTimingMargin } from '../utils';

describe('DateRangePicker', () => {
  it('Should render a div with "rs-picker-daterange" class', () => {
    const container = createTestContainer();
    ReactDOM.render(<DateRangePicker />, container);
    const instance = container.querySelector('.rs-picker');

    assert.equal(instance.tagName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-daterange\b/));
  });

  it('Should be disabled', () => {
    const container = createTestContainer();
    ReactDOM.render(<DateRangePicker disabled />, container);
    const instance = container.querySelector('.rs-picker');

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be disabled date', () => {
    const ref = createRef();
    ReactDOM.render(
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
        ref={ref}
      />,
      createTestContainer()
    );

    assert.equal(ref.current.menu.querySelectorAll('.rs-picker-toolbar-option-disabled').length, 4);
  });

  it('Should output custom value', () => {
    const ref = React.createRef();

    ReactDOM.render(
      <DateRangePicker
        value={[parseISO('2019-04-01'), parseISO('2019-04-02')]}
        renderValue={value => {
          return `${format(value[0], 'MM/dd/yyyy')}~${format(value[1], 'MM/dd/yyyy')}`;
        }}
        ref={ref}
      />,
      createTestContainer()
    );

    assert.equal(
      ref.current.toggle.querySelector('.rs-picker-toggle-value').innerText,
      '04/01/2019~04/02/2019'
    );
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const ref = createRef();

    ReactDOM.render(
      <DateRangePicker onChange={doneOp} ref={ref} defaultOpen oneTap />,
      createTestContainer()
    );

    const menu = ref.current.menu;
    const today = menu.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    assert.ok(menu);
    assert.ok(today);

    ReactTestUtils.Simulate.click(today);
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const ref = createRef();
    ReactDOM.render(
      <DateRangePicker defaultValue={[new Date(), new Date()]} onClean={doneOp} ref={ref} />,
      createTestContainer()
    );

    ReactTestUtils.Simulate.click(ref.current.root.querySelector('.rs-picker-toggle-clean'));
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
    const ref = createRef();
    ReactDOM.render(<DateRangePicker toggleAs="button" ref={ref} />, createTestContainer());
    assert.ok(ref.current.toggle.tagName === 'BUTTON');
  });

  it('Should be block', () => {
    const ref = createRef();

    ReactDOM.render(<DateRangePicker block ref={ref} />, createTestContainer());
    assert.ok(ref.current.root.className.match(/\bblock\b/));
  });

  it('Should have a custom className', () => {
    const ref = createRef();
    ReactDOM.render(<DateRangePicker className="custom" ref={ref} />, createTestContainer());
    assert.include(ref.current.root.className, 'custom');
  });

  it('Should have a menuClassName in Menu', () => {
    const ref = createRef();
    ReactDOM.render(
      <DateRangePicker menuClassName="custom" open ref={ref} />,
      createTestContainer()
    );

    assert.include(ref.current.menu.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const ref = createRef();
    ReactDOM.render(<DateRangePicker style={{ fontSize }} ref={ref} />, createTestContainer());
    assert.equal(ref.current.root.style.fontSize, fontSize);
  });

  it('Should select a whole week', done => {
    const ref = createRef();

    const doneOp = values => {
      if (
        isSameDay(startOfWeek(new Date()), values[0]) &&
        isSameDay(endOfWeek(new Date()), values[1])
      ) {
        done();
      }
    };

    ReactDOM.render(
      <DateRangePicker onOk={doneOp} hoverRange="week" defaultOpen ref={ref} />,
      createTestContainer()
    );

    const menu = ref.current?.menu;
    const today = menu?.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );
    ReactTestUtils.Simulate.mouseEnter(today);
    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(menu.querySelector('.rs-picker-toolbar-right-btn-ok'));
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
    const ref = createRef();
    ReactDOM.render(
      <DateRangePicker onChange={doneOp} hoverRange="week" oneTap ref={ref} defaultOpen />,
      createTestContainer()
    );

    const today = ref.current.menu.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );
    ReactTestUtils.Simulate.click(today);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DateRangePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should show default calendar value', () => {
    const ref = createRef();
    ReactDOM.render(
      <DateRangePicker
        open
        defaultCalendarValue={[new Date('2019-01-01'), new Date('2019-09-01')]}
        ref={ref}
      />,
      createTestContainer()
    );

    const picker = ref.current.menu;

    assert.ok(picker.querySelector('div[title="01 Feb 2019"]'));
    assert.ok(picker.querySelector('div[title="01 Sep 2019"]'));
  });

  it('Should have only one calendar', () => {
    const ref = createRef();

    ReactDOM.render(<DateRangePicker showOneCalendar open ref={ref} />, createTestContainer());
    const menu = ref.current.menu;

    assert.include(
      menu.querySelector('.rs-picker-daterange-panel').className,
      'rs-picker-daterange-panel-show-one-calendar'
    );

    assert.equal(menu.querySelectorAll('.rs-picker-daterange-calendar-single').length, 1);
  });

  it('Should be zoned date', () => {
    const timeZone = new Date().getTimezoneOffset() === -480 ? 'Europe/London' : 'Asia/Shanghai';
    const template = 'yyyy-MM-dd HH:mm:ss';
    const ref = createRef();

    ReactDOM.render(
      <DateRangePicker format={template} timeZone={timeZone} defaultOpen ref={ref} oneTap />,
      createTestContainer()
    );
    const menuContainer = ref.current.menu;
    const today = menuContainer.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.mouseEnter(today);
    ReactTestUtils.Simulate.click(today);

    const ret = ref.current.toggle.querySelector('.rs-picker-toggle-value').innerHTML;
    const zonedTodayDate = zonedDate(timeZone);

    assert.equal(
      ret,
      `${format(setTimingMargin(zonedTodayDate), template)} ~ ${format(
        setTimingMargin(zonedTodayDate, 'right'),
        template
      )}`
    );
  });

  it('Should disable from next day with time zone', function () {
    const timeZone = 'Europe/London';
    const template = 'yyyy-MM-dd HH:mm:ss';
    const tomorrow = addDays(new Date(), 1);
    const ref = createRef();

    ReactDOM.render(
      <DateRangePicker
        format={template}
        timeZone={timeZone}
        defaultOpen
        disabledDate={date => isAfter(date, tomorrow)}
        ref={ref}
      />,
      createTestContainer()
    );
    const menuContainer = ref.current.menu;
    const firstDisabledCell = menuContainer.querySelector(
      '.rs-calendar-table-cell-disabled .rs-calendar-table-cell-content'
    );

    assert.equal(firstDisabledCell.getAttribute('title'), format(tomorrow, 'dd MMM yyyy'));
  });
});
