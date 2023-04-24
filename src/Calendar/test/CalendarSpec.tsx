import React from 'react';
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react';
import sinon from 'sinon';
import { parseISO } from '../../utils/dateUtils';
import { testStandardProps } from '@test/commonCases';
import Calendar from '../Calendar';

describe('Calendar', () => {
  testStandardProps(<Calendar />);

  it('Should render a div with `calendar` class', () => {
    render(<Calendar data-testid="calendar" />);

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar');
  });

  it('Should be compact', () => {
    render(<Calendar compact data-testid="calendar" />);

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar-compact');
  });

  it('Should be rendered custom elements', () => {
    render(
      <Calendar
        defaultValue={parseISO('2018-07-01')}
        renderCell={() => {
          return <i data-testid="custom-content">test</i>;
        }}
      />
    );

    expect(screen.getAllByTestId('custom-content')).to.have.lengthOf(42);
  });

  it('Should be bordered', () => {
    render(<Calendar bordered data-testid="calendar" />);

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar-bordered');
  });

  it('Should output valid one day', () => {
    render(<Calendar format="yyyy-MM-dd" defaultValue={parseISO('2018-07-01')} />);

    expect(within(screen.getAllByRole('row')[1]).getAllByRole('gridcell')[0]).to.have.text('1');
  });

  it('Should call `onSelect` callback', () => {
    const onSelectSpy = sinon.spy();
    render(<Calendar format="yyyy-MM-dd" onSelect={onSelectSpy} data-testid="calendar" />);

    fireEvent.click(screen.getByTitle(/today/i));

    expect(onSelectSpy).to.have.been.calledOnce;
  });

  it('Should be a controlled value', async () => {
    type AppInstance = {
      calendar: HTMLDivElement;
      setDate: (date: Date) => void;
    };
    const ref = React.createRef<AppInstance>();
    const App = React.forwardRef((_props, ref) => {
      const [value, setValue] = React.useState(new Date('6/10/2021'));
      const calendarRef = React.useRef();

      React.useImperativeHandle(ref, () => ({
        calendar: calendarRef.current,
        setDate: date => {
          setValue(date);
        }
      }));
      return <Calendar value={value} ref={calendarRef} format="yyyy-MM-dd" />;
    });

    render(<App ref={ref} />);

    const calendar = (ref.current as AppInstance).calendar;

    // eslint-disable-next-line testing-library/no-node-access
    expect(calendar.querySelector('.rs-calendar-header-title')).text('Jun 2021');

    (ref.current as AppInstance).setDate(new Date('7/11/2021'));

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(calendar.querySelector('.rs-calendar-header-title')).text('Jul 2021');
    });
  });

  it('Should be to not highlight dates that are not in this month', () => {
    render(<Calendar defaultValue={new Date('2023-04-01')} />);

    const cells = Array.from(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByRole('grid').querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).map(cell => (cell as HTMLDivElement).innerText);

    expect(cells).to.deep.equal(['26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);
  });

  it('Should call `onMonthChange` callback', () => {
    const onMonthChangeSpy = sinon.spy();

    render(<Calendar defaultValue={new Date('2023-01-01')} onMonthChange={onMonthChangeSpy} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMonthChangeSpy).to.have.been.calledOnce;

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onMonthChangeSpy).to.have.been.calledTwice;

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    fireEvent.click(
      screen
        .getByRole('menu')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelector('.rs-calendar-month-dropdown-cell-active + div') as HTMLElement
    );

    expect(onMonthChangeSpy).to.have.been.calledThrice;
  });

  it('Should  not call `onMonthChange` callback when same month is clicked', () => {
    const onMonthChangeSpy = sinon.spy();
    const onToggleMonthDropdownSpy = sinon.spy();

    render(
      <Calendar
        defaultValue={new Date('2023-01-01')}
        onMonthChange={onMonthChangeSpy}
        onToggleMonthDropdown={onToggleMonthDropdownSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    fireEvent.click(
      screen
        .getByRole('menu')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelector('.rs-calendar-month-dropdown-cell-active') as HTMLElement
    );

    expect(onMonthChangeSpy).to.have.been.not.called;
    expect(onToggleMonthDropdownSpy).to.have.been.called;
  });
});
