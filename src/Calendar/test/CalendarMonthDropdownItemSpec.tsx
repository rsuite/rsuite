import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import MonthDropdownItem from '../MonthDropdownItem';
import { format } from '../../utils/dateUtils';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';

describe('Calendar-MonthDropdownItem', () => {
  testStandardProps(<MonthDropdownItem />);

  it('Should output a  `1` ', () => {
    const { container } = render(<MonthDropdownItem month={1} />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.text('1');
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
});
