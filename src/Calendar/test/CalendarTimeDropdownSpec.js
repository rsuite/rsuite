import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import TimeDropdown from '../TimeDropdown';
import CalendarContext from '../CalendarContext';
import { createTestContainer } from '../../../test/testUtils';

describe('Calendar - TimeDropdown', () => {
  it('Should render a div with `time-dropdown` class', () => {
    const instance = getDOMNode(<TimeDropdown />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btime-dropdown\b/));
  });

  it('Should render 3 column', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ format: 'HH:mm:ss' }}>
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    assert.equal(ref.current.querySelectorAll('.rs-calendar-time-dropdown-column').length, 3);
  });

  it('Should render 2 column', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ format: 'HH:mm' }}>
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    assert.equal(ref.current.querySelectorAll('.rs-calendar-time-dropdown-column').length, 2);
  });

  it('Should render 1 column', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ format: 'HH' }}>
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    assert.equal(ref.current.querySelectorAll('.rs-calendar-time-dropdown-column').length, 1);
  });

  it('Should call `onSelect` callback', done => {
    const onChangePageTime = () => {
      done();
    };
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ onChangePageTime, date: new Date(), format: 'HH' }}>
        <TimeDropdown ref={ref} />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    ReactTestUtils.Simulate.click(ref.current.querySelector('[data-key="hours-1"]'));
  });

  it('Should be disabled', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ format: 'HH' }}>
        <TimeDropdown
          disabledHours={h => {
            return h > 10;
          }}
          ref={ref}
        />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    assert.equal(
      ref.current.querySelectorAll('.rs-calendar-time-dropdown-cell-disabled').length,
      23 - 10
    );
  });

  it('Should be hide', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ format: 'HH' }}>
        <TimeDropdown
          hideHours={h => {
            return h > 10;
          }}
          ref={ref}
        />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    assert.equal(ref.current.querySelectorAll('li').length, 11);
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
