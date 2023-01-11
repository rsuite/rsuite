import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import MonthDropdownItem from '../MonthDropdownItem';
import { format } from '../../utils/dateUtils';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';

describe('Calendar-MonthDropdownItem', () => {
  it('Should output a  `1` ', () => {
    const instance = getDOMNode(<MonthDropdownItem month={1} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.equal(instance.textContent, '1');
  });

  it('Should call `onSelect` callback with correct date', () => {
    const onChangeMonth = Sinon.spy();

    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ date: new Date(), onChangeMonth, locale: {}, isoWeek: false }}
      >
        <MonthDropdownItem month={1} year={2017} ref={ref} />
      </CalendarContext.Provider>
    );

    ReactTestUtils.Simulate.click(ref.current as HTMLDivElement);

    expect(onChangeMonth).to.have.been.calledOnce;
    expect(format(onChangeMonth.firstCall.args[0], 'yyyy-MM')).to.equal('2017-01');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MonthDropdownItem className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MonthDropdownItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MonthDropdownItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
