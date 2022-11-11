import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import MonthDropdownItem from '../MonthDropdownItem';
import { format } from '../../utils/dateUtils';
import CalendarContext from '../CalendarContext';

describe('Calendar-MonthDropdownItem', () => {
  it('Should output a  `1` ', () => {
    const instance = getDOMNode(<MonthDropdownItem month={1} date={new Date()} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.equal(instance.textContent, '1');
  });

  it('Should call `onSelect` callback with correct date', done => {
    const onChangeMonth = date => {
      try {
        assert.equal(format(date, 'yyyy-MM'), '2017-01');
        done();
      } catch (err) {
        done(err);
      }
    };
    const ref = React.createRef();
    render(
      <CalendarContext.Provider value={{ date: new Date(), onChangeMonth }}>
        <MonthDropdownItem month={1} year={2017} ref={ref} />
      </CalendarContext.Provider>
    );

    ReactTestUtils.Simulate.click(ref.current);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MonthDropdownItem className="custom" date={new Date()} />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MonthDropdownItem style={{ fontSize }} date={new Date()} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MonthDropdownItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
