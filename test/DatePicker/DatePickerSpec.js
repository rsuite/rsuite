import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import DatePicker from '../../src/DatePicker';
import { parse } from 'date-fns';

describe('DatePicker', () => {
  it('Should render a div with "rs-picker-date" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker />);

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\brs-picker-date\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker disabled />);

    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should be not cleanable', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker cleanable={false} value={new Date()} />
    );

    assert.ok(!findDOMNode(instance).querySelector('.rs-picker-toggle-clean'));
  });

  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker toggleComponentClass="button" />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be block', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker block />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should be inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker inline />);

    assert.ok(!findDOMNode(instance).querySelector('.rs-picker-toggle'));
  });

  it('Should output a date', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker defaultValue={parse('2017-08-14')} />
    );
    assert.equal(
      findDOMNode(instance).querySelector('.rs-picker-toggle-value').innerText,
      '2017-08-14'
    );
  });

  it('Should output a date', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker value={parse('2017-08-14')} />);
    assert.equal(
      findDOMNode(instance).querySelector('.rs-picker-toggle-value').innerText,
      '2017-08-14'
    );
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    let picker = null;
    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onChange={doneOp} defaultOpen />
    );

    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-picker-toolbar-right-btn-ok')
    );
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };
    let picker = null;
    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onSelect={doneOp} defaultOpen />
    );
    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-calendar-table-cell-is-today')
    );
  });

  it('Should call `onOk` callback', done => {
    const doneOp = () => {
      done();
    };
    let picker = null;
    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onOk={doneOp} defaultOpen />
    );
    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-picker-toolbar-right-btn-ok')
    );
  });

  it('Should call `onNextMonth` callback', done => {
    const doneOp = () => {
      done();
    };

    let picker = null;
    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onNextMonth={doneOp} defaultOpen />
    );
    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-calendar-header-forward')
    );
  });

  it('Should call `onPrevMonth` callback', done => {
    const doneOp = () => {
      done();
    };
    let picker = null;
    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onPrevMonth={doneOp} defaultOpen />
    );
    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-calendar-header-backward')
    );
  });

  it('Should call `onToggleMonthDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onToggleMonthDropdown={doneOp} inline format="YYYY-MM-DD HH:mm:ss" />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-calendar-header-title'));
  });

  it('Should call `onToggleTimeDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onToggleTimeDropdown={doneOp} inline format="YYYY-MM-DD HH:mm:ss" />
    );
    ReactTestUtils.Simulate.click(
      findDOMNode(instance).querySelector('.rs-calendar-header-title-time')
    );
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should call `onChangeCalendarDate` callback when click backward', done => {
    const doneOp = () => {
      done();
    };
    let picker = null;

    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onChangeCalendarDate={doneOp} defaultOpen />
    );

    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-calendar-header-backward')
    );
  });

  it('Should call `onChangeCalendarDate` callback when click forward', done => {
    const doneOp = () => {
      done();
    };

    let picker = null;

    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onChangeCalendarDate={doneOp} defaultOpen />
    );
    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-calendar-header-forward')
    );
  });

  it('Should call `onChangeCalendarDate` callback when click today ', done => {
    const doneOp = () => {
      done();
    };

    let picker = null;

    ReactTestUtils.renderIntoDocument(
      <DatePicker innerRef={ref => (picker = ref)} onChangeCalendarDate={doneOp} defaultOpen />
    );
    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-calendar-table-cell-is-today')
    );
  });

  it('Should not change for the value  when it is controlled', done => {
    const doneOp = date => {
      if (findDOMNode(picker).querySelector('.rs-picker-toggle-value').innerText === '2018-01-05') {
        done();
      }
    };

    let picker = null;

    let instance = ReactTestUtils.renderIntoDocument(
      <DatePicker
        innerRef={ref => (picker = ref)}
        value={parse('2018-01-05')}
        onChange={doneOp}
        defaultOpen
      />
    );

    let allCell = picker.menuContainer.querySelectorAll('.rs-calendar-table-cell');
    ReactTestUtils.Simulate.click(allCell[allCell.length - 1]);

    ReactTestUtils.Simulate.click(
      picker.menuContainer.querySelector('.rs-picker-toolbar-right-btn-ok')
    );
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
