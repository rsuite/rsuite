import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Header from '../CalendarHeader';
import CalendarContext from '../CalendarContext';

describe('Calendar-Header', () => {
  it('Should render a div with "calendar-header" class', () => {
    const instance = getDOMNode(<Header date={new Date()} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar-header\b/));
  });

  it('Should call `onMoveForward` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<Header showMonth onMoveForward={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-forward'));
  });

  it('Should call `onMoveBackward` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Header showMonth onMoveBackward={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-backward'));
  });

  it('Should call `onToggleMonthDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<Header showMonth onToggleMonthDropdown={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-title-date'));
  });

  it('Should call `onToggleTimeDropdown` callback', done => {
    const doneOp = () => {
      done();
    };
    const ref = React.createRef();

    render(
      <CalendarContext.Provider value={{ date: new Date(), format: 'HH:mm:ss' }}>
        <Header showTime onToggleTimeDropdown={doneOp} ref={ref} />
      </CalendarContext.Provider>
    );

    ReactTestUtils.Simulate.click(ref.current.querySelector('.rs-calendar-header-title-time'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Header className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Header style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Header classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
