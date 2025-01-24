import React from 'react';
import DateRangePicker from '../DateRangePicker';
import GearIcon from '@rsuite/icons/Gear';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { render, act, fireEvent, waitFor, screen, getByRole, within } from '@testing-library/react';
import {
  testStandardProps,
  testFormControl,
  testControlledUnControlled,
  testPickers
} from '@test/utils';
import { keyPress } from '@test/utils/simulateEvent';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
  subDays,
  addMonths
} from 'date-fns';
import type { DateOptionPreset } from '@/internals/types';
import type { DateRange } from '../types';

function setTimePickerValue(calendarKey: 'start' | 'end', { hours, minutes, seconds }) {
  const calendar = screen.queryByTestId(`calendar-${calendarKey}`) as HTMLDivElement;

  const hourNode = getByRole(calendar, 'option', { name: `${hours} hours` });
  const minuteNode = getByRole(calendar, 'option', { name: `${minutes} minutes` });
  const secondNode = getByRole(calendar, 'option', { name: `${seconds} seconds` });

  fireEvent.click(hourNode);
  fireEvent.click(minuteNode);
  fireEvent.click(secondNode);

  expect(hourNode).to.be.attribute('aria-selected', 'true');
  expect(minuteNode).to.be.attribute('aria-selected', 'true');
  expect(secondNode).to.be.attribute('aria-selected', 'true');
}

afterEach(() => {
  sinon.restore();
});

describe('DateRangePicker', () => {
  testStandardProps(<DateRangePicker />, {
    sizes: ['lg', 'md', 'sm', 'xs'],

    getUIElement: () => {
      return screen.getByRole('textbox').parentElement as HTMLElement;
    }
  });

  testPickers(DateRangePicker, { role: 'textbox', ariaHaspopup: 'dialog' });
  testControlledUnControlled(DateRangePicker, {
    defaultValue: [new Date('2023-11-01'), new Date('2023-11-02')],
    value: [new Date('2023-11-03'), new Date('2023-11-04')],
    changedValue: [new Date('2024-10-01'), new Date('2024-10-02')],
    componentProps: { defaultOpen: true, format: 'yyyy-MM-dd' },

    simulateEvent: {
      changeValue: () => {
        userEvent.click(screen.getByRole('gridcell', { name: '05 Nov 2023' }));
        userEvent.click(screen.getByRole('gridcell', { name: '06 Nov 2023' }));
        userEvent.click(screen.getByRole('button', { name: 'OK' }));
        return { changedValue: [new Date('2023-11-05 00:00:00'), new Date('2023-11-06 00:00:00')] };
      }
    },
    expectedValue: (value: [Date, Date]) => {
      expect(screen.getByRole('textbox')).to.value(
        value.map(v => format(v, 'yyyy-MM-dd')).join(' ~ ')
      );
    }
  });

  testFormControl(DateRangePicker, {
    value: [new Date('2023-10-01'), new Date('2023-10-02')],
    getUIElement: () => screen.getByRole('textbox'),
    componentProps: {
      format: 'yyyy-MM-dd'
    }
  });

  it('Should render a div with "rs-picker-daterange" class', () => {
    const { container } = render(<DateRangePicker />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-picker-daterange');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<DateRangePicker />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should be cleanable by default', () => {
    const { container } = render(<DateRangePicker value={[new Date(), new Date()]} />);

    expect(container.firstChild).to.have.class('rs-picker-cleanable');
  });

  it('Should output custom value with time', () => {
    const value = [new Date(2019, 10, 11, 1, 0, 0), new Date(2019, 10, 12, 1, 0, 0)] as [
      Date,
      Date
    ];
    const template = 'MM/dd/yyyy hh:mm:ss';
    render(<DateRangePicker value={value} format={template} />);

    expect(screen.getByRole('textbox')).to.have.value('11/11/2019 01:00:00 ~ 11/12/2019 01:00:00');
  });

  it('Should select date time successfully', () => {
    const onOk = sinon.spy();

    render(
      <DateRangePicker
        defaultValue={[new Date(2019, 10, 11, 0, 0, 0), new Date(2019, 11, 11, 0, 0, 0)]}
        format={'dd MMM yyyy HH:mm:ss'}
        defaultOpen
        onOk={onOk}
      />
    );

    const startTimeButton = screen.queryAllByLabelText('Select time')[0];
    const endTimeButton = screen.queryAllByLabelText('Select time')[1];

    fireEvent.click(startTimeButton);

    // select time to 6:6:6
    setTimePickerValue('start', { hours: 6, minutes: 6, seconds: 6 });

    fireEvent.click(startTimeButton);

    expect(startTimeButton).to.have.text('06:06:06');

    fireEvent.click(endTimeButton);
    // select time to 9:9:9
    setTimePickerValue('end', { hours: 9, minutes: 9, seconds: 9 });

    fireEvent.click(endTimeButton);

    expect(endTimeButton).to.have.text('09:09:09');

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(onOk).to.be.calledWithMatch([
      new Date(2019, 10, 11, 6, 6, 6),
      new Date(2019, 11, 11, 9, 9, 9)
    ]);

    expect(screen.getByRole('textbox')).to.have.value(
      '11 Nov 2019 06:06:06 ~ 11 Dec 2019 09:09:09'
    );
  });

  it('Should select time successfully', () => {
    const start = new Date(2019, 10, 11, 0, 0, 0);
    // The end calendar default value is after a month from start calendar value
    const end = addMonths(start, 1);
    const onOk = sinon.spy();

    render(
      <DateRangePicker defaultValue={[start, end]} format="hh:mm:ss" defaultOpen onOk={onOk} />
    );

    //const startTimeButton = screen.queryAllByLabelText('Select time')[0];
    //const endTimeButton = screen.queryAllByLabelText('Select time')[1];

    // select time to 6:6:6
    setTimePickerValue('start', { hours: 6, minutes: 6, seconds: 6 });

    //expect(startTimeButton).to.be.text('06:06:06');

    // select time to 9:9:9
    setTimePickerValue('end', { hours: 9, minutes: 9, seconds: 9 });

    //expect(endTimeButton).to.be.text('09:09:09');

    // press ok button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(onOk).to.be.calledWithMatch([
      new Date(2019, 10, 11, 6, 6, 6),
      new Date(2019, 11, 11, 9, 9, 9)
    ]);

    expect(screen.getByRole('textbox')).to.have.value('06:06:06 ~ 09:09:09');
  });

  it('Should call `onChange` callback', () => {
    const onChange = sinon.spy();
    render(
      <DateRangePicker
        onChange={onChange}
        defaultOpen
        oneTap
        defaultCalendarValue={[new Date('2023-10-01'), new Date('2023-10-02')]}
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '01 Oct 2023' }));
    expect(onChange).to.have.been.calledOnce;
  });

  it('Should call onClean callback', () => {
    const onClean = sinon.spy();
    render(<DateRangePicker defaultValue={[new Date(), new Date()]} onClean={onClean} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onClean).to.have.been.calledOnce;
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();
    render(<DateRangePicker onOpen={onOpen} />);

    fireEvent.click(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();
    const ref = React.createRef<any>();
    render(<DateRangePicker onOpen={onOpen} ref={ref} />);

    act(() => {
      ref.current.open();
    });

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();
    const ref = React.createRef<any>();
    render(<DateRangePicker defaultOpen onClose={onClose} ref={ref} />);

    act(() => {
      ref.current.close();
    });

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should select a date range by clicking starting date and ending date', () => {
    render(<DateRangePicker open value={[new Date('2019-09-10'), new Date('2019-10-10')]} />);

    fireEvent.click(screen.getByRole('gridcell', { name: '01 Sep 2019' }));

    expect(screen.getByRole('gridcell', { name: '01 Sep 2019', selected: true })).to.exist;

    expect(screen.getByRole('gridcell', { name: '01 Sep 2019', selected: true })).to.exist;

    fireEvent.click(screen.getByRole('gridcell', { name: '24 Sep 2019' }));

    expect(screen.getByRole('gridcell', { name: '24 Sep 2019', selected: true })).to.exist;
  });

  it('Should select a whole week', () => {
    const onOk = sinon.spy();

    render(
      <DateRangePicker
        defaultValue={[new Date('08/08/2021'), new Date('08/14/2021')]}
        onOk={onOk}
        hoverRange="week"
        open
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '01 Aug 2021' }));
    fireEvent.click(screen.getByRole('gridcell', { name: '01 Aug 2021' }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(isSameDay(startOfWeek(new Date('08/01/2021')), onOk.firstCall.firstArg[0])).to.be.true;
    expect(isSameDay(endOfWeek(new Date('08/07/2021')), onOk.firstCall.firstArg[1])).to.be.true;
  });

  it('Should select a whole month', () => {
    const onOk = sinon.spy();

    render(
      <DateRangePicker
        onOk={onOk}
        hoverRange="month"
        open
        defaultCalendarValue={[new Date('2023-10-01'), new Date('2023-11-01')]}
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '01 Oct 2023' }));
    fireEvent.click(screen.getByRole('gridcell', { name: '01 Oct 2023' }));

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(isSameDay(startOfMonth(new Date('2023-10-01')), onOk.firstCall.firstArg[0])).to.be.true;
    expect(isSameDay(endOfMonth(new Date('2023-10-31')), onOk.firstCall.firstArg[1])).to.be.true;
  });

  it('Should select a date range by hover', () => {
    render(
      <DateRangePicker
        hoverRange="week"
        open
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    );

    const startDate = screen.getByRole('gridcell', { name: '11 Jul 2021' });
    const endDate = screen.getByRole('gridcell', { name: '24 Jul 2021' });

    fireEvent.click(startDate);
    fireEvent.mouseEnter(endDate);

    const [start, end] = screen.getAllByRole('gridcell', { selected: true });

    expect(start).to.have.text('11');
    expect(end).to.have.text('24');
  });

  it('Should select a date range by click', () => {
    render(
      <DateRangePicker
        hoverRange="week"
        defaultOpen
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    );

    const startDate = screen.getByRole('gridcell', { name: '11 Jul 2021' });
    const endDate = screen.getByRole('gridcell', { name: '24 Jul 2021' });

    fireEvent.click(startDate);
    fireEvent.mouseEnter(endDate);
    fireEvent.click(endDate);

    const [start, end] = screen.getAllByRole('gridcell', { selected: true });

    expect(start).to.have.text('11');
    expect(end).to.have.text('24');
  });

  it('Should show default calendar value', () => {
    render(
      <DateRangePicker
        open
        defaultCalendarValue={[parseISO('2019-01-01'), parseISO('2019-09-01')]}
      />
    );

    expect(screen.getByRole('gridcell', { name: '01 Feb 2019' })).to.exist;
    expect(screen.getByRole('gridcell', { name: '01 Sep 2019' })).to.exist;
  });

  it('Should have a error style when date is invalid', () => {
    const { container } = render(<DateRangePicker value={[new Date(''), new Date('')]} />);

    expect(container.firstChild).to.have.class('rs-picker-error');
    expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
  });

  it('Should have a error style when start date is after end date', () => {
    const { container } = render(
      <DateRangePicker value={[new Date('2023-10-02'), new Date('2023-10-01')]} />
    );

    expect(container.firstChild).to.have.class('rs-picker-error');
    expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
  });

  it('Should not have a error style when date is null', () => {
    const { container } = render(<DateRangePicker value={null} />);

    expect(container.firstChild).to.not.have.class('rs-picker-error');
    expect(screen.getByRole('textbox')).to.not.have.attribute('aria-invalid');
  });

  it('Should not have a error style when date is empty array', () => {
    const { container } = render(<DateRangePicker value={[] as any} />);

    expect(container.firstChild).to.not.have.class('rs-picker-error');
    expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'false');
  });

  it('Should update the calendar when clicking on a non-current month', () => {
    render(
      <DateRangePicker
        defaultOpen
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    );

    // Jun 27, 2021
    const unSameMonthCell = screen.getByTitle('27 Jun 2021');

    fireEvent.mouseEnter(unSameMonthCell);
    fireEvent.click(unSameMonthCell);

    expect(screen.getByTitle('30 May 2021')).to.be.exist;
  });

  it('Should update the calendar when calendarSnapping is true', () => {
    render(
      <DateRangePicker
        defaultOpen
        calendarSnapping
        defaultValue={[new Date('08/01/2024'), new Date('09/01/2024')]}
      />
    );

    screen.getAllByRole('button', { name: 'Select month' }).forEach((item, index) => {
      expect(item).to.have.text(['Aug 2024', 'Sep 2024'][index]);
    });

    fireEvent.click(screen.getByTitle('08 Sep 2024'));

    screen.getAllByRole('button', { name: 'Select month' }).forEach((item, index) => {
      expect(item).to.have.text(['Sep 2024', 'Oct 2024'][index]);
    });
  });

  it('Should render a custom caret', () => {
    render(<DateRangePicker caretAs={GearIcon} />);

    expect(screen.getByLabelText('gear')).to.have.class('rs-icon');
  });

  it('Should render a custom calendar title', () => {
    render(
      <DateRangePicker
        value={[new Date(2022, 1, 1), new Date(2022, 2, 2)]}
        open
        renderTitle={date => (
          <span data-testid="calendar-title">
            {date.getMonth()} - {date.getFullYear()}
          </span>
        )}
      />
    );

    const [firstTitle, secondTitle] = screen.getAllByTestId('calendar-title');

    expect(firstTitle).to.have.text('1 - 2022');
    expect(secondTitle).to.have.text('2 - 2022');
  });

  it('Should custom render cell', () => {
    render(
      <DateRangePicker
        open
        value={[new Date('2025-01-01'), new Date('2025-01-02')]}
        renderCell={date => {
          const day = date.getDate();

          return day === 1 ? <span>1🎉</span> : day;
        }}
      />
    );

    expect(screen.getByRole('gridcell', { name: '01 Jan 2025' })).to.have.text('1🎉');
  });

  it('Should cancel the Ok button disable when the shortcut button is clicked', () => {
    render(
      <DateRangePicker
        open
        defaultCalendarValue={[parseISO('2022-05-01'), parseISO('2022-06-01')]}
      />
    );

    const btnOk = screen.getByRole('button', { name: 'OK' });

    fireEvent.click(screen.getByRole('gridcell', { name: '01 May 2022' }));

    expect(btnOk).to.have.property('disabled', true);

    fireEvent.click(screen.getByRole('gridcell', { name: '02 May 2022' }));

    expect(btnOk).to.have.property('disabled', false);
  });

  it('Should close picker after predefined range is clicked', async () => {
    const onClose = sinon.spy();
    const onChange = sinon.spy();

    render(
      <DateRangePicker
        defaultOpen
        ranges={[
          {
            label: 'Yesterday',
            value: [addDays(new Date(), -1), addDays(new Date(), -1)]
          }
        ]}
        onChange={onChange}
        onExit={onClose}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'Yesterday' }));

    await waitFor(() => {
      expect(onClose).to.been.calledOnce;
      expect(onChange).to.been.calledOnce;
    });
  });

  it('Should not close picker', async () => {
    const onClose = sinon.spy();
    const onChange = sinon.spy();
    const yesterday = addDays(new Date(), -1);

    render(
      <DateRangePicker
        defaultOpen
        format="yyyy-MM-dd"
        ranges={[
          {
            label: 'Yesterday',
            value: [yesterday, yesterday],
            closeOverlay: false
          }
        ]}
        onChange={onChange}
        onExit={onClose}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Yesterday' }));

    expect(screen.getByTestId('daterange-header')).to.text(
      `${format(yesterday, 'yyyy-MM-dd')} ~ ${format(yesterday, 'yyyy-MM-dd')}`
    );

    await waitFor(() => {
      expect(onChange).to.be.not.called;
      expect(onClose).to.be.not.called;
    });
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();
    render(<DateRangePicker onFocus={onFocus} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);

    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should render ranges on the left', () => {
    const onClose = sinon.spy();
    const onChange = sinon.spy();
    const yesterday = addDays(new Date(), -1);
    render(
      <DateRangePicker
        defaultOpen
        ranges={[
          {
            label: 'Yesterday',
            value: [yesterday, yesterday],
            placement: 'left'
          }
        ]}
        onChange={onChange}
        onExit={onClose}
      />
    );

    expect(screen.getByTestId('daterange-predefined-side')).to.contain(
      screen.getByRole('button', { name: 'Yesterday' })
    );

    expect(screen.queryByTestId('daterange-predefined-bottom')).to.not.exist;
  });

  it('Should not render the ranges element', () => {
    render(<DateRangePicker open ranges={[]} />);

    expect(screen.queryByTestId('daterange-predefined-bottom')).to.not.exist;
    expect(screen.queryByTestId('daterange-predefined-side')).to.not.exist;
  });

  it('Should focus on the right month', () => {
    const onEnter = sinon.spy();
    const { rerender } = render(
      <DateRangePicker
        value={[new Date(2023, 10, 1), new Date(2023, 11, 1)]}
        onEnter={onEnter}
        open
      />
    );

    const [startMonth, endMonth] = screen.queryAllByRole('button', { name: 'Select month' });

    expect(startMonth).to.have.text('Nov 2023');
    expect(endMonth).to.have.text('Dec 2023');

    rerender(
      <DateRangePicker value={[new Date(2022, 10, 1), new Date(2022, 11, 1)]} onEnter={onEnter} />
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(onEnter).to.be.called;
    expect(startMonth).to.have.text('Nov 2022');
    expect(endMonth).to.have.text('Dec 2022');
  });

  describe('oneTap', () => {
    it('Should select a day by one click', () => {
      const onChange = sinon.spy();
      render(
        <DateRangePicker
          onChange={onChange}
          oneTap
          defaultOpen
          format="yyyy-MM-dd"
          defaultCalendarValue={[new Date('2024-01-01'), new Date('2004-01-01')]}
        />
      );

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Jan 2024' }));
      const [start, end] = onChange.firstCall.firstArg;

      expect(onChange).to.have.been.calledOnce;
      expect(isSameDay(new Date('2024-01-10'), start)).to.be.true;
      expect(isSameDay(new Date('2024-01-10'), end)).to.be.true;
      expect(screen.getByRole('textbox')).to.have.value('2024-01-10 ~ 2024-01-10');
    });

    it('Should select a week by one click', () => {
      const onChange = sinon.spy();
      render(
        <DateRangePicker
          onChange={onChange}
          hoverRange="week"
          oneTap
          defaultOpen
          format="yyyy-MM-dd"
          defaultCalendarValue={[new Date('2024-01-01'), new Date('2004-01-01')]}
        />
      );

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Jan 2024' }));

      const [start, end] = onChange.firstCall.firstArg;

      expect(onChange).to.have.been.calledOnce;
      expect(isSameDay(new Date('2024-01-07'), start)).to.be.true;
      expect(isSameDay(new Date('2024-01-13'), end)).to.be.true;
      expect(screen.getByRole('textbox')).to.have.value('2024-01-07 ~ 2024-01-13');
    });

    it('Should select a month by one click', () => {
      const onChange = sinon.spy();
      render(
        <DateRangePicker
          onChange={onChange}
          hoverRange="month"
          oneTap
          defaultOpen
          format="yyyy-MM-dd"
          defaultCalendarValue={[new Date('2024-01-01'), new Date('2004-01-01')]}
        />
      );

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Jan 2024' }));

      const [start, end] = onChange.firstCall.firstArg;

      expect(onChange).to.have.been.calledOnce;
      expect(isSameDay(new Date('2024-01-01'), start)).to.be.true;
      expect(isSameDay(new Date('2024-01-31'), end)).to.be.true;
      expect(screen.getByRole('textbox')).to.have.value('2024-01-01 ~ 2024-01-31');
    });

    it('Should select a date range by one click when there is a value', () => {
      const onChange = sinon.spy();
      render(
        <DateRangePicker
          onChange={onChange}
          oneTap
          defaultOpen
          format="yyyy-MM-dd"
          defaultCalendarValue={[new Date('2024-01-01'), new Date('2004-01-01')]}
        />
      );

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Jan 2024' }));
      const [start, end] = onChange.firstCall.firstArg;

      expect(onChange).to.have.been.calledOnce;
      expect(isSameDay(new Date('2024-01-10'), start)).to.be.true;
      expect(isSameDay(new Date('2024-01-10'), end)).to.be.true;
      expect(screen.getByRole('textbox')).to.have.value('2024-01-10 ~ 2024-01-10');

      fireEvent.click(screen.getByRole('textbox'));
      fireEvent.click(screen.getByRole('gridcell', { name: '15 Jan 2024' }));

      const [start2, end2] = onChange.secondCall.firstArg;
      expect(onChange).to.have.been.calledTwice;
      expect(isSameDay(new Date('2024-01-15'), start2)).to.be.true;
      expect(isSameDay(new Date('2024-01-15'), end2)).to.be.true;
      expect(screen.getByRole('textbox')).to.have.value('2024-01-15 ~ 2024-01-15');
    });

    it('Should call `onSelect` callback', () => {
      const onSelect = sinon.spy();
      render(
        <DateRangePicker
          onChange={onSelect}
          oneTap
          defaultOpen
          defaultCalendarValue={[new Date('2024-01-01'), new Date('2004-01-01')]}
        />
      );

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Jan 2024' }));

      const [start] = onSelect.firstCall.firstArg;

      expect(onSelect).to.have.been.calledOnce;
      expect(isSameDay(new Date('2024-01-10'), start)).to.be.true;
    });
  });

  describe('Time stability', () => {
    it('Should the end time not change when the start date is clicked when defaultCalendarValue is set', () => {
      const onSelect = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelect}
          defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      const times = screen.queryAllByRole('button', { name: 'Select time' });

      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      fireEvent.click(screen.getByRole('gridcell', { name: '07 Feb 2022' }));

      expect(onSelect).to.have.been.calledOnce;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Feb 2022' }));

      expect(onSelect).to.have.been.calledTwice;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      expect(screen.getByTestId('daterange-header')).to.have.text(
        '2022-02-07 00:00:00 ~ 2022-02-10 23:59:59'
      );
    });

    it('Should the end time not change when the start date is clicked when controlled', () => {
      const onSelect = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelect}
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      const times = screen.queryAllByRole('button', { name: 'Select time' });

      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      fireEvent.click(screen.getByRole('gridcell', { name: '07 Feb 2022' }));

      expect(onSelect).to.have.been.calledOnce;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      fireEvent.click(screen.getByRole('gridcell', { name: '10 Feb 2022' }));

      expect(onSelect).to.have.been.calledTwice;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      expect(screen.getByTestId('daterange-header')).to.have.text(
        '2022-02-07 00:00:00 ~ 2022-02-10 23:59:59'
      );
    });

    it('Should not change the start and end time when the month is changed', () => {
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      const headerDateTitles = screen.queryAllByRole('button', { name: 'Select month' });
      const handerTimeTitles = screen.queryAllByRole('button', { name: 'Select time' });

      const firstCalendarForwardButton = screen.queryAllByRole('button', {
        name: 'Next month'
      })[0];

      const secondCalendarBackwardButton = screen.queryAllByRole('button', {
        name: 'Previous month'
      })[1];

      expect(handerTimeTitles[0]).to.have.text('00:00:00');
      expect(handerTimeTitles[1]).to.have.text('23:59:59');
      expect(headerDateTitles[0]).to.have.text('Feb 2022');
      expect(headerDateTitles[1]).to.have.text('Mar 2022');

      fireEvent.click(firstCalendarForwardButton);

      expect(handerTimeTitles[0]).to.have.text('00:00:00');
      expect(handerTimeTitles[1]).to.have.text('23:59:59');
      expect(headerDateTitles[0]).to.have.text('Mar 2022');
      expect(headerDateTitles[1]).to.have.text('Apr 2022');

      fireEvent.click(secondCalendarBackwardButton);

      expect(handerTimeTitles[0]).to.have.text('00:00:00');
      expect(handerTimeTitles[1]).to.have.text('23:59:59');
      expect(headerDateTitles[0]).to.have.text('Feb 2022');
      expect(headerDateTitles[1]).to.have.text('Mar 2022');
    });

    it('Should not change the start and end time when clicking on the second calendar first', () => {
      const onSelect = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelect}
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      const times = screen.queryAllByRole('button', { name: 'Select time' });

      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      fireEvent.click(screen.getByRole('gridcell', { name: '20 Mar 2022' }));

      expect(onSelect).to.have.been.calledOnce;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      fireEvent.click(screen.getAllByRole('button', { name: 'Next month' })[1]);
      fireEvent.click(screen.getByRole('gridcell', { name: '21 Apr 2022' }));

      expect(onSelect).to.have.been.calledTwice;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');

      expect(screen.getByTestId('daterange-header')).to.have.text(
        '2022-03-20 00:00:00 ~ 2022-04-21 23:59:59'
      );
    });

    it('Should render the default datetime after clicking the clear button', () => {
      const onClean = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onClean={onClean}
          defaultValue={[new Date('2022-02-01 01:01:01'), new Date('2022-03-01 02:02:02')]}
          defaultCalendarValue={[new Date('2022-04-04 00:00:00'), new Date('2022-05-05 23:59:59')]}
        />
      );

      const times = screen.queryAllByRole('button', { name: 'Select time' });

      expect(times[0]).to.have.text('01:01:01');
      expect(times[1]).to.have.text('02:02:02');

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onClean).to.have.been.calledOnce;
      expect(times[0]).to.have.text('00:00:00');
      expect(times[1]).to.have.text('23:59:59');
    });
  });

  it('Should be disable time when date selection is in progress', () => {
    render(
      <DateRangePicker
        format="yyyy-MM-dd hh:mm aa"
        showMeridiem
        open
        defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
      />
    );

    const startCell = screen.getByRole('gridcell', { name: '01 Feb 2022' });
    const endCell = screen.getByRole('gridcell', { name: '02 Feb 2022' });

    const btnAMTime = screen.queryAllByRole('button', { name: 'Select time' })[0];
    const btnPMTime = screen.queryAllByRole('button', { name: 'Select time' })[1];

    expect(btnAMTime).to.not.have.attribute('disabled');
    expect(btnPMTime).to.not.have.attribute('disabled');

    fireEvent.click(startCell);

    expect(btnAMTime).to.have.attribute('disabled');
    expect(btnPMTime).to.have.attribute('disabled');

    fireEvent.click(endCell);

    expect(btnAMTime).to.not.have.attribute('disabled');
    expect(btnPMTime).to.not.have.attribute('disabled');
  });

  it('Should call `onShortcutClick` callback', async () => {
    const onShortcutClick = sinon.spy();

    render(
      <DateRangePicker
        defaultOpen
        ranges={[{ label: 'Yesterday', value: [addDays(new Date(), -1), addDays(new Date(), -1)] }]}
        onShortcutClick={onShortcutClick}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'Yesterday' }));

    await waitFor(() => {
      expect(onShortcutClick).to.calledOnce;
      expect(onShortcutClick.firstCall.firstArg.label).to.equal('Yesterday');
    });
  });

  it('Should render the correct time when the range is clicked', () => {
    render(
      <DateRangePicker
        open
        format="yyyy-MM-dd HH:mm"
        ranges={[
          {
            label: 'custom range',
            value: [new Date('2024-02-27 09:00:00'), new Date('2024-02-28 10:00:00')]
          }
        ]}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'custom range' }));

    const times = screen.queryAllByRole('button', { name: 'Select time' });

    expect(times[0]).to.have.text('09:00');
    expect(times[1]).to.have.text('10:00');
  });

  it('Should reander the correct size', () => {
    const { rerender } = render(<DateRangePicker format="MMMM dd, yyyy" />);

    // MMMM dd, yyyy ~ MMMM dd, yyyy
    expect(screen.getByRole('textbox')).to.have.attribute('size', '33');

    rerender(
      <DateRangePicker
        format="MMMM dd, yyyy"
        value={[new Date('2023-10-01'), new Date('2023-11-01')]}
      />
    );

    // October 01, 2023 ~ November 01, 2023
    expect(screen.getByRole('textbox')).to.have.attribute('size', '40');

    rerender(
      <DateRangePicker
        format="yyyy年MM月dd日"
        character="-"
        value={[new Date('2023-10-01'), new Date('2023-11-01')]}
      />
    );

    // 2023年10月01日-2023年11月01日
    expect(screen.getByRole('textbox')).to.have.attribute('size', '33');
  });

  it('Should cancel the Ok button disable when the shortcut button is clicked', () => {
    render(
      <DateRangePicker
        open
        format="MMM yyyy"
        defaultCalendarValue={[parseISO('2022-05-01'), parseISO('2022-06-01')]}
      />
    );

    const btnOk = screen.getByRole('button', { name: 'OK' });

    expect(btnOk).to.have.property('disabled', true);

    fireEvent.click(screen.getAllByRole('gridcell', { name: 'May 2022' })[0]);

    expect(btnOk).to.have.property('disabled', false);
  });

  it('Should hide the calendar header', () => {
    render(<DateRangePicker open showHeader={false} />);

    expect(screen.queryByTestId('daterange-header')).to.not.exist;
  });

  it('Should update time when entering time via keyboard', () => {
    render(
      <DateRangePicker
        open
        format="HH"
        defaultValue={[new Date('2024-02-27 09:00:00'), new Date('2024-02-28 10:00:00')]}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).to.have.value('09 ~ 10');

    userEvent.type(input, '{arrowdown}{arrowdown}');

    expect(input).to.have.value('07 ~ 10');
    expect(screen.getByTestId('daterange-header')).to.have.text('07 ~ 10');
  });

  // fix: https://github.com/rsuite/rsuite/issues/4038
  it('Should restore the last selected date on the calendar', () => {
    const ref = React.createRef<any>();
    render(
      <DateRangePicker ref={ref} defaultValue={[new Date('2024-11-01'), new Date('2024-12-01')]} />
    );

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('daterange-header')).to.have.text('01/11/2024 ~ 01/12/2024');

    userEvent.click(screen.getByRole('gridcell', { name: '02 Nov 2024' }));

    act(() => {
      ref.current.close();
    });

    userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('daterange-header')).to.have.text('01/11/2024 ~ 01/12/2024');
  });

  describe('Show one calendar', () => {
    it('Should have only one calendar', () => {
      render(<DateRangePicker showOneCalendar open />);

      expect(screen.queryByTestId('calendar-start')).to.be.exist;
      expect(screen.queryByTestId('calendar-end')).to.be.not.exist;
    });

    it('Should allow the start and end dates to be in the same month', () => {
      render(
        <DateRangePicker
          showOneCalendar
          open
          defaultValue={[new Date('2024-01-01'), new Date('2024-01-02')]}
        />
      );

      expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Jan 2024');
      expect(screen.queryByTestId('calendar-start')).to.be.exist;
      expect(screen.queryByTestId('calendar-end')).to.be.not.exist;

      fireEvent.click(screen.getByRole('gridcell', { name: '01 Jan 2024' }));

      expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Jan 2024');
      expect(screen.queryByTestId('calendar-start')).to.be.not.exist;
      expect(screen.queryByTestId('calendar-end')).to.be.exist;
    });

    it('Should be able to switch the calendar by clicking on the date', () => {
      render(
        <DateRangePicker
          showOneCalendar
          open
          format="yyyy-MM-dd HH:mm"
          defaultCalendarValue={[new Date('2024-01-01 01:01'), new Date('2024-01-02 23:59')]}
        />
      );

      expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Jan 2024');
      expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('01:01');
      expect(screen.getByTestId('daterange-header')).to.have.class('rs-picker-tab-active-start');

      fireEvent.click(screen.getByRole('button', { name: 'Select end date' }));

      expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Jan 2024');
      expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('23:59');
      expect(screen.getByTestId('daterange-header')).to.have.class('rs-picker-tab-active-end');

      fireEvent.click(screen.getByRole('button', { name: 'Select start date' }));

      expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Jan 2024');
      expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('01:01');
      expect(screen.getByTestId('daterange-header')).to.have.class('rs-picker-tab-active-start');
    });
  });

  describe('Customize value', () => {
    it('Should render a custom value', () => {
      render(
        <DateRangePicker
          format="yyyy-MM-dd"
          defaultValue={[new Date('2024-05-13'), new Date('2024-05-14')]}
          renderValue={([start, end]) => {
            return format(start, 'EEE, d MMM') + ' ~ ' + format(end, 'EEE, d MMM');
          }}
        />
      );

      expect(screen.getByRole('textbox')).to.have.value('Mon, 13 May ~ Tue, 14 May');
    });

    it('Should render a custom value when a value is entered via the keyboard', async () => {
      render(
        <>
          <div data-testid="outside">Outside</div>
          <DateRangePicker
            format="yyyy-MM-dd"
            renderValue={([start, end]) => {
              return format(start, 'EEE, d MMM') + ' ~ ' + format(end, 'EEE, d MMM');
            }}
          />
        </>
      );

      await keyPress(screen.getByRole('textbox'), '2024051320240514');

      userEvent.click(screen.getByTestId('outside'));

      expect(screen.getByRole('textbox')).to.have.value('Mon, 13 May ~ Tue, 14 May');
    });
  });

  describe('Custom week ', () => {
    it('Should render the correct week numbers', () => {
      render(
        <DateRangePicker
          showOneCalendar
          open
          value={[new Date('2020-12-01'), new Date('2020-12-02')]}
          showWeekNumbers
        />
      );

      expect(screen.queryByRole('rowheader', { name: 'Week 53' })).to.be.exist;
    });

    it('Should render the correct week numbers', () => {
      render(
        <DateRangePicker
          showOneCalendar
          open
          value={[new Date('2022-12-01'), new Date('2022-12-02')]}
          showWeekNumbers
        />
      );

      expect(screen.queryByRole('rowheader', { name: 'Week 53' })).to.not.exist;
    });

    it('Should render the correct week start', () => {
      render(
        <DateRangePicker
          showOneCalendar
          defaultOpen
          value={[new Date('2024-05-21'), new Date('2024-05-22')]}
          weekStart={2}
        />
      );

      const weeks = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo'];
      const rows = screen.getAllByRole('columnheader');
      const gridcells = screen.getAllByRole('gridcell');

      rows.forEach((row, index) => {
        expect(row).to.have.text(weeks[index]);
      });

      expect(gridcells[0]).to.have.attribute('aria-label', '30 Apr 2024');
      expect(gridcells[gridcells.length - 1]).to.have.attribute('aria-label', '10 Jun 2024');
    });

    it('Should render the correct week start with `isoWeek`', () => {
      render(
        <DateRangePicker
          showOneCalendar
          defaultOpen
          value={[new Date('2024-05-21'), new Date('2024-05-22')]}
          isoWeek
        />
      );

      const weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      const rows = screen.getAllByRole('columnheader');
      const gridcells = screen.getAllByRole('gridcell');

      rows.forEach((row, index) => {
        expect(row).to.have.text(weeks[index]);
      });

      expect(gridcells[0]).to.have.attribute('aria-label', '29 Apr 2024');
      expect(gridcells[gridcells.length - 1]).to.have.attribute('aria-label', '09 Jun 2024');
    });
  });

  describe('Custom Month Dropdown', () => {
    it('Should render custom month dropdown', () => {
      render(
        <DateRangePicker
          format="yyyy-MM"
          open
          monthDropdownProps={{
            className: 'custom-dropdown',
            itemClassName: 'custom-item',
            as: 'ul',
            itemAs: 'li'
          }}
        />
      );

      const dropdown = screen.getAllByTestId('calendar-month-dropdown')[0];
      const item = within(dropdown).getAllByRole('row')[0];

      expect(dropdown).to.contain('.custom-dropdown');
      expect(item).to.have.class('custom-item');
      expect(item).to.be.tagName('li');
      expect(item.parentNode).to.be.tagName('ul');
    });

    it('Should render custom month dropdown with custom components', () => {
      const Menu = props => {
        const { className, ...rest } = props;
        return <ul className={`${className} custom-menu`} {...rest} />;
      };

      const Item = props => {
        const { className, ...rest } = props;
        return <li className={`${className} custom-item`} {...rest} />;
      };

      render(
        <DateRangePicker
          format="yyyy-MM"
          open
          monthDropdownProps={{
            as: Menu,
            itemAs: Item
          }}
        />
      );

      const dropdown = screen.getAllByTestId('calendar-month-dropdown')[0];
      const item = within(dropdown).getAllByRole('row')[0];

      expect(dropdown).to.contain('.custom-menu');
      expect(item).to.have.class('custom-item');

      expect(item).to.be.tagName('li');
      expect(item.parentNode).to.be.tagName('ul');
    });
  });

  describe('Error handling', () => {
    let consoleErrorStub;

    beforeEach(() => {
      consoleErrorStub = sinon.stub(console, 'error').callsFake(() => {
        // do nothing
      });
    });

    afterEach(() => {
      consoleErrorStub.restore();
    });

    it('Should render an error message when the format is deprecated', () => {
      expect(() => {
        render(<DateRangePicker format="YY" value={[new Date(), new Date()]} />);
      }).to.not.throw();

      expect(screen.getByRole('textbox')).to.have.value(
        'Error: Invalid date format ~ Error: Invalid date format'
      );
      expect(consoleErrorStub).to.have.been.calledWith(sinon.match(/Error: Invalid date format/));
    });

    it('Should render an error message when the format is incorrect', () => {
      expect(() => {
        render(<DateRangePicker format="_error_" value={[new Date(), new Date()]} />);
      }).to.not.throw();

      expect(screen.getByRole('textbox')).to.have.value(
        'Error: Invalid date format ~ Error: Invalid date format'
      );
      expect(consoleErrorStub).to.have.been.calledWith(sinon.match(/Error: Invalid date format/));
    });
  });

  describe('Hide time', () => {
    it('Should hide hours', () => {
      render(
        <DateRangePicker
          open
          format="HH:mm:ss"
          hideHours={hour => {
            return hour === 1;
          }}
        />
      );

      expect(screen.queryByRole('option', { name: '1 hours' })).to.not.exist;
    });

    it('Should hide minutes', () => {
      render(
        <DateRangePicker
          open
          format="HH:mm:ss"
          hideMinutes={minute => {
            return minute === 1;
          }}
        />
      );

      expect(screen.queryByRole('option', { name: '1 minutes' })).to.not.exist;
    });

    it('Should hide seconds', () => {
      render(
        <DateRangePicker
          open
          format="HH:mm:ss"
          hideSeconds={second => {
            return second === 1;
          }}
        />
      );

      expect(screen.queryByRole('option', { name: '1 seconds' })).to.not.exist;
    });
  });

  describe('Disabled', () => {
    it('[Deprecated] Should disable shortcuts according to `disabledDate`', () => {
      const ranges: DateOptionPreset<DateRange>[] = [
        {
          label: 'Yesterday',
          value: [addDays(new Date(), -1), addDays(new Date(), -1)]
        },
        {
          label: 'Today',
          value: [new Date(), new Date()]
        },
        {
          label: 'Tomorrow',
          value: [addDays(new Date(), 1), addDays(new Date(), 1)]
        },
        {
          label: 'Last 7 days',
          value: [subDays(new Date(), 6), new Date()]
        }
      ];
      render(<DateRangePicker ranges={ranges} disabledDate={() => true} open />);

      ranges.forEach(range => {
        expect(screen.getByRole('button', { name: range.label as string })).to.have.attribute(
          'aria-disabled',
          'true'
        );
      });
    });

    it('Should disable shortcuts according to `shouldDisableDate`', () => {
      const ranges: DateOptionPreset<DateRange>[] = [
        {
          label: 'Yesterday',
          value: [addDays(new Date(), -1), addDays(new Date(), -1)]
        },
        {
          label: 'Today',
          value: [new Date(), new Date()]
        },
        {
          label: 'Tomorrow',
          value: [addDays(new Date(), 1), addDays(new Date(), 1)]
        },
        {
          label: 'Last 7 days',
          value: [subDays(new Date(), 6), new Date()]
        }
      ];
      render(<DateRangePicker ranges={ranges} shouldDisableDate={() => true} open />);

      ranges.forEach(range => {
        expect(screen.getByRole('button', { name: range.label as string })).to.have.attribute(
          'aria-disabled',
          'true'
        );
      });
    });

    it('Should disable dates on the calendar', () => {
      render(<DateRangePicker ranges={[]} shouldDisableDate={() => true} defaultOpen />);

      screen.getAllByRole('gridcell').forEach(cell => {
        expect(cell).to.have.attribute('aria-disabled', 'true');
        expect(cell).to.have.class('rs-calendar-table-cell-disabled');
      });
    });

    it('Should have a error style when date is disabled', () => {
      const { container } = render(
        <DateRangePicker
          value={[new Date('2023-10-01'), new Date('2023-10-02')]}
          shouldDisableDate={date => {
            return date.getDay() === 1;
          }}
        />
      );

      expect(container.firstChild).to.have.class('rs-picker-error');
      expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
    });
  });
});
