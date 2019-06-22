import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Calendar from '../Calendar';

describe('DateRangePicker - Calendar', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar format="YYYY-MM-DD" calendarDate={[new Date(), new Date()]} />
    );

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bcalendar\b/));
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar format="YYYY-MM-DD" calendarDate={[new Date(), new Date()]} onSelect={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-table-cell-is-today'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar format="YYYY-MM-DD" className="custom" calendarDate={[new Date(), new Date()]} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar format="YYYY-MM-DD" style={{ fontSize }} calendarDate={[new Date(), new Date()]} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar format="YYYY-MM-DD" classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
