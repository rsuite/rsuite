import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import TimeDropdown from '../TimeDropdown';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';

describe('Calendar - TimeDropdown', () => {
  testStandardProps(<TimeDropdown />);

  it('Should render a div with `time-dropdown` class', () => {
    const { container } = render(<TimeDropdown />);

    expect(container.firstChild).to.match('div.rs-calendar-time-dropdown');
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
      // eslint-disable-next-line testing-library/no-node-access
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
      // eslint-disable-next-line testing-library/no-node-access
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
      // eslint-disable-next-line testing-library/no-node-access
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
      // eslint-disable-next-line testing-library/no-node-access
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
      // eslint-disable-next-line testing-library/no-node-access
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

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal((ref.current as HTMLDivElement).querySelectorAll('li').length, 11);
  });
});
