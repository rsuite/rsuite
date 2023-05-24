import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';

import Header from '../CalendarHeader';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';

describe('Calendar-Header', () => {
  testStandardProps(<Header />);

  it('Should render a div with "calendar-header" class', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).to.match('div.rs-calendar-header');
  });

  it('Should call `onMoveForward` callback', () => {
    const onMoveForward = Sinon.spy();

    render(<Header showMonth onMoveForward={onMoveForward} />);

    ReactTestUtils.Simulate.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMoveForward).to.have.been.calledOnce;
  });

  it('Should call `onMoveBackward` callback', () => {
    const onMoveBackward = Sinon.spy();

    render(<Header showMonth onMoveBackward={onMoveBackward} />);

    ReactTestUtils.Simulate.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onMoveBackward).to.have.been.calledOnce;
  });

  it('Should call `onToggleMonthDropdown` callback', () => {
    const onToggleMonthDropdown = Sinon.spy();

    render(<Header showMonth onToggleMonthDropdown={onToggleMonthDropdown} />);

    ReactTestUtils.Simulate.click(screen.getByRole('button', { name: 'Select month' }));
    expect(onToggleMonthDropdown).to.have.been.calledOnce;
  });

  it('Should call `onToggleTimeDropdown` callback', () => {
    const onToggleTimeDropdown = Sinon.spy();
    const ref = React.createRef<HTMLDivElement>();

    render(
      <CalendarContext.Provider
        value={{ date: new Date(), format: 'HH:mm:ss', locale: {}, isoWeek: false }}
      >
        <Header showTime onToggleTimeDropdown={onToggleTimeDropdown} ref={ref} />
      </CalendarContext.Provider>
    );

    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-node-access
      (ref.current as HTMLDivElement).querySelector('.rs-calendar-header-title-time') as HTMLElement
    );
    expect(onToggleTimeDropdown).to.have.been.calledOnce;
  });
});
