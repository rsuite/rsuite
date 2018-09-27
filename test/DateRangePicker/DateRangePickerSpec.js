import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react-dom/test-utils';

import DateRangePicker from '../../src/DateRangePicker/DateRangePicker';

describe('DateRangePicker', () => {
  it('Should render a div with "rs-picker-daterange" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DateRangePicker />);

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\brs-picker-daterange\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DateRangePicker disabled />);
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should be disabled date', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker
        ranges={[
          {
            label: 'Yesterday',
            value: [moment().add(-1, 'd'), moment().add(-1, 'd')]
          },
          {
            label: 'Today',
            value: [moment(), moment()]
          },
          {
            label: 'Tomorrow',
            value: [moment().add(1, 'd'), moment().add(1, 'd')]
          },
          {
            label: 'Last 7 days',
            value: [moment().subtract(6, 'days'), moment()]
          }
        ]}
        disabledDate={() => true}
        open
      />
    );

    assert.equal(
      findDOMNode(instance.menuContainer).querySelectorAll('.rs-picker-toolbar-option-disabled')
        .length,
      4
    );
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    let demo;
    const instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker onChange={doneOp} ref={ref => (demo = ref)} />
    );
    demo.updateValue([moment(), moment()]);
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(<DateRangePicker onOpen={doneOp} />);
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-picker-toggle'));
  });

  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker toggleComponentClass="button" />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be block', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DateRangePicker block />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DateRangePicker className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a menuClassName in Menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker menuClassName="custom" open />
    );
    assert.include(findDOMNode(instance.menuContainer).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DateRangePicker style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should select a whole week', done => {
    let count = 0;
    let instance = null;
    let today = null;
    const doneOp = values => {
      if (
        moment()
          .startOf('week')
          .isSame(values[0], 'date') &&
        moment()
          .endOf('week')
          .isSame(values[1], 'date')
      ) {
        done();
      }
    };

    const handleSelect = () => {
      if (count === 0) {
        ReactTestUtils.Simulate.click(today);
      } else if (count === 1) {
        ReactTestUtils.Simulate.click(
          findDOMNode(instance.menuContainer).querySelector('.rs-picker-toolbar-right-btn-ok')
        );
      }
      count += 1;
    };

    instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker onSelect={handleSelect} onOk={doneOp} hoverRange="week" open />
    );

    today = findDOMNode(instance.menuContainer).querySelector('.rs-calendar-table-cell-is-today');
    ReactTestUtils.Simulate.click(today);
  });

  it('Should fire onChange if click ok after only select one date in oneTap mode', done => {
    const doneOp = values => {
      if (
        moment()
          .startOf('week')
          .isSame(values[0], 'date') &&
        moment()
          .endOf('week')
          .isSame(values[1], 'date')
      ) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker
        onSelect={() => {
          ReactTestUtils.Simulate.click(
            findDOMNode(instance.menuContainer).querySelector('.rs-picker-toolbar-right-btn-ok')
          );
        }}
        onOk={doneOp}
        hoverRange="week"
        oneTap
        open
      />
    );
    const today = findDOMNode(instance.menuContainer).querySelector(
      '.rs-calendar-table-cell-is-today'
    );
    ReactTestUtils.Simulate.click(today);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateRangePicker classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
