import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { parseISO } from '../../utils/dateUtils';
import { getDOMNode } from '@test/testUtils';
import Calendar from '../Calendar';

describe('Calendar', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = getDOMNode(<Calendar calendarDate={new Date(2021, 11, 24)} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar\b/));
  });

  it('Should output valid one day', () => {
    const instance = getDOMNode(
      <Calendar format="yyyy-MM-dd" calendarDate={parseISO('2018-07-01')} />
    );
    assert.equal(
      instance
        .querySelectorAll('.rs-calendar-table-row')[1]
        .querySelector('.rs-calendar-table-cell-content').textContent,
      '1'
    );
  });

  it('Should call `onSelect` callback with the date being clicked', () => {
    const onSelect = sinon.spy();

    const { getByRole } = render(
      <Calendar format="yyyy-MM-dd" calendarDate={new Date(2021, 11, 24)} onSelect={onSelect} />
    );

    fireEvent.click(getByRole('button', { name: '24 Dec 2021' }));
    expect(onSelect).to.have.been.calledWith(new Date(2021, 11, 24));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Calendar className="custom" calendarDate={new Date(2021, 11, 24)} />
    );
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Calendar style={{ fontSize }} calendarDate={new Date(2021, 11, 24)} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Calendar classPrefix="custom-prefix" calendarDate={new Date(2021, 11, 24)} />
    );
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
