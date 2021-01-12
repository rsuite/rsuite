import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { addDays, subDays, startOfWeek, isSameDay, endOfWeek, parse, format } from 'date-fns';
import { getDOMNode, getInstance } from '@test/testUtils';

import DateRangePicker from '../DateRangePicker';

describe('DateRangePicker', () => {
  it('Should render a div with "rs-picker-daterange" class', () => {
    const instance = getDOMNode(<DateRangePicker />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-daterange\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DateRangePicker disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.equal(instance.querySelector('[role=combobox]').getAttribute('aria-disabled'), 'true');
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
      getDOMNode(instance.menuContainerRef.current).querySelectorAll(
        '.rs-picker-toolbar-option-disabled'
      ).length,
      4
    );
  });

  it('Should output custom value', () => {
    const instance = getDOMNode(
      <DateRangePicker
        value={[parse('2019-04-01'), parse('2019-04-02')]}
        renderValue={value => {
          return `${format(value[0], 'MM/DD/YYYY')}~${format(value[1], 'MM/DD/YYYY')}`;
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

    const instance = getInstance(<DateRangePicker onChange={doneOp} />);
    instance.updateValue([new Date(), new Date()]);
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
    const instance = getInstance(<DateRangePicker toggleComponentClass="button" />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
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
    assert.include(getDOMNode(instance.menuContainerRef.current).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DateRangePicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should select a whole week', done => {
    let count = 0;
    let instance = null;
    let today = null;
    const doneOp = values => {
      if (
        isSameDay(startOfWeek(new Date()), values[0]) &&
        isSameDay(endOfWeek(new Date()), values[1])
      ) {
        done();
      }
    };

    const handleSelect = () => {
      if (count === 0) {
        ReactTestUtils.Simulate.click(today);
      } else if (count === 1) {
        ReactTestUtils.Simulate.click(
          getDOMNode(instance.menuContainerRef.current).querySelector(
            '.rs-picker-toolbar-right-btn-ok'
          )
        );
      }
      count += 1;
    };

    instance = getInstance(
      <DateRangePicker onSelect={handleSelect} onOk={doneOp} hoverRange="week" open />
    );

    today = getDOMNode(instance.menuContainerRef.current).querySelector(
      '.rs-calendar-table-cell-is-today'
    );
    ReactTestUtils.Simulate.click(today);
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
    const today = getDOMNode(instance.menuContainerRef.current).querySelector(
      '.rs-calendar-table-cell-is-today'
    );
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
    const picker = getDOMNode(instance.menuContainerRef.current);

    assert.ok(picker.querySelector('div[title="2019-01-01"]'));
    assert.ok(picker.querySelector('div[title="2019-09-01"]'));
  });

  it('Should have only one calendar', () => {
    const instance = getInstance(<DateRangePicker showOneCalendar open />);
    const menuContainer = getDOMNode(instance.menuContainerRef.current);

    assert.ok(
      menuContainer
        .querySelector('.rs-picker-daterange-panel')
        .className.match(/\brs-picker-daterange-panel-show-one-calendar\b/)
    );

    assert.equal(menuContainer.querySelectorAll('.rs-picker-daterange-calendar-single').length, 1);
  });
});
