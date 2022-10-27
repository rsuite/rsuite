import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { parseISO } from '../../utils/dateUtils';
import { testStandardProps } from '@test/commonCases';
import Calendar from '../Calendar';

describe('Calendar', () => {
  testStandardProps(<Calendar />);

  it('Should render a div with `calendar` class', () => {
    const { getByTestId } = render(<Calendar data-testid="calendar" />);

    expect(getByTestId('calendar')).to.have.class('rs-calendar');
  });

  it('Should be compact', () => {
    const { getByTestId } = render(<Calendar compact data-testid="calendar" />);

    expect(getByTestId('calendar')).to.have.class('rs-calendar-compact');
  });

  it('Should be rendered custom elements', () => {
    const { getByTestId } = render(
      <Calendar
        data-testid="calendar"
        defaultValue={parseISO('2018-07-01')}
        renderCell={() => {
          return <i className="text">test</i>;
        }}
      />
    );

    expect(getByTestId('calendar').querySelectorAll('.text')).to.length(42);
  });

  it('Should be bordered', () => {
    const { getByTestId } = render(<Calendar bordered data-testid="calendar" />);

    expect(getByTestId('calendar')).to.have.class('rs-calendar-bordered');
  });

  it('Should output valid one day', () => {
    const { getAllByRole } = render(
      <Calendar format="yyyy-MM-dd" defaultValue={parseISO('2018-07-01')} />
    );

    expect(getAllByRole('row')[1].querySelector('.rs-calendar-table-cell-content')).to.text('1');
  });

  it('Should call `onSelect` callback', () => {
    const onSelectSpy = sinon.spy();
    const { getByTestId } = render(
      <Calendar format="yyyy-MM-dd" onSelect={onSelectSpy} data-testid="calendar" />
    );

    fireEvent.click(
      getByTestId('calendar').querySelector(
        '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
      )
    );

    expect(onSelectSpy).to.have.been.calledOnce;
  });

  it('Should be a controlled value', async () => {
    const ref = React.createRef();
    const App = React.forwardRef((props, ref) => {
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

    const calendar = ref.current.calendar;

    expect(calendar.querySelector('.rs-calendar-header-title')).text('Jun 2021');

    ref.current.setDate(new Date('7/11/2021'));

    await waitFor(() => {
      expect(calendar.querySelector('.rs-calendar-header-title')).text('Jul 2021');
    });
  });
});
