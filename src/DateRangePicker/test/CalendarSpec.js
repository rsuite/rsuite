import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Calendar from '../Calendar';

describe('DateRangePicker - Calendar', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = getDOMNode(
      <Calendar format="yyyy-MM-dd" calendarDate={[new Date(), new Date()]} />
    );

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar\b/));
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(
      <Calendar format="yyyy-MM-dd" calendarDate={[new Date(), new Date()]} onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-table-cell-is-today'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Calendar format="yyyy-MM-dd" className="custom" calendarDate={[new Date(), new Date()]} />
    );
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Calendar format="yyyy-MM-dd" style={{ fontSize }} calendarDate={[new Date(), new Date()]} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Calendar format="yyyy-MM-dd" classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
