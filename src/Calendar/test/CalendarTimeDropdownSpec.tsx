import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import TimeDropdown from '../TimeDropdown';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';

describe('Calendar - TimeDropdown', () => {
  it('Should render a div with `time-dropdown` class', () => {
    const instance = getDOMNode(<TimeDropdown />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btime-dropdown\b/));
  });

  it('Should render 3 column', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ format: 'HH:mm:ss', date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>
    );

    assert.equal(
      (ref.current as HTMLDivElement).querySelectorAll('.rs-calendar-time-dropdown-column').length,
      3
    );
  });

  it('Should render 2 column', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ format: 'HH:mm', date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>
    );

    assert.equal(
      (ref.current as HTMLDivElement).querySelectorAll('.rs-calendar-time-dropdown-column').length,
      2
    );
  });

  it('Should render 1 column', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ format: 'HH', date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>
    );

    assert.equal(
      (ref.current as HTMLDivElement).querySelectorAll('.rs-calendar-time-dropdown-column').length,
      1
    );
  });

  it('Should call `onChangeTime` callback', () => {
    const onChangeTime = Sinon.spy();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ onChangeTime, date: new Date(), format: 'HH', locale: {}, isoWeek: false }}
      >
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>
    );

    ReactTestUtils.Simulate.click(
      (ref.current as HTMLDivElement).querySelector('[data-key="hours-1"]') as HTMLElement
    );

    expect(onChangeTime).to.have.been.calledOnce;
  });

  it('Should be disabled', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ format: 'HH', date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TimeDropdown
          disabledHours={h => {
            return h > 10;
          }}
          ref={ref}
        />
      </CalendarContext.Provider>
    );

    assert.equal(
      (ref.current as HTMLDivElement).querySelectorAll('.rs-calendar-time-dropdown-cell-disabled')
        .length,
      23 - 10
    );
  });

  it('Should be hide', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ format: 'HH', date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TimeDropdown
          hideHours={h => {
            return h > 10;
          }}
          ref={ref}
        />
      </CalendarContext.Provider>
    );

    assert.equal((ref.current as HTMLDivElement).querySelectorAll('li').length, 11);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TimeDropdown className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TimeDropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TimeDropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
