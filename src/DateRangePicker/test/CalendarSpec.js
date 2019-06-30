import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Calendar from '../Calendar';

describe('DateRangePicker - Calendar', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = getDOMNode(
      <Calendar format="YYYY-MM-DD" calendarDate={[new Date(), new Date()]} />
    );

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar\b/));
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(
      <Calendar format="YYYY-MM-DD" calendarDate={[new Date(), new Date()]} onSelect={doneOp} />
    );
    const instanceDOM = instance;
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-table-cell-is-today'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Calendar format="YYYY-MM-DD" className="custom" calendarDate={[new Date(), new Date()]} />
    );
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Calendar format="YYYY-MM-DD" style={{ fontSize }} calendarDate={[new Date(), new Date()]} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Calendar format="YYYY-MM-DD" classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
