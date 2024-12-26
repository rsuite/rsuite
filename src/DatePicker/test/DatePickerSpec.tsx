import React from 'react';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { keyPress } from '@test/utils/simulateEvent';
import sinon from 'sinon';
import { enGB } from 'date-fns/locale/en-GB';
import { format, isSameDay, parseISO, isBefore, isValid } from 'date-fns';
import DatePicker from '../DatePicker';
import GearIcon from '@rsuite/icons/Gear';

afterEach(() => {
  sinon.restore();
});

describe('DatePicker', () => {
  testStandardProps(<DatePicker />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('textbox').parentElement as HTMLElement;
    }
  });

  testPickers(DatePicker, { role: 'textbox', ariaHaspopup: 'dialog' });

  testControlledUnControlled(DatePicker, {
    defaultValue: new Date('2023-10-01'),
    value: new Date('2023-10-01'),
    changedValue: new Date('2023-10-02'),
    componentProps: { defaultOpen: true, format: 'yyyy-MM-dd' },
    simulateEvent: {
      changeValue: () => {
        userEvent.click(screen.getByRole('gridcell', { name: '02 Oct 2023' }));
        userEvent.click(screen.getByRole('button', { name: 'OK' }));
        return { changedValue: new Date('2023-10-02') };
      }
    },
    expectedValue: (value: Date) => {
      expect(screen.getByRole('textbox')).to.value(format(value, 'yyyy-MM-dd'));
    }
  });

  testFormControl(DatePicker, {
    value: new Date('2023-10-01'),
    getUIElement: () => screen.getByRole('textbox'),
    componentProps: {
      format: 'yyyy-MM-dd'
    }
  });

  it('Should render a div with "rs-picker-date" class', () => {
    const { container } = render(<DatePicker />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-picker-date');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<DatePicker />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should be cleanable by default', () => {
    const { container } = render(<DatePicker value={new Date()} />);

    expect(container.firstChild).to.have.class('rs-picker-cleanable');
  });

  it('Should be not cleanable', () => {
    render(<DatePicker cleanable={false} value={new Date()} />);

    expect(screen.queryByRole('button', { name: /clear/i })).to.not.exist;
  });

  it('Should output a date', () => {
    render(<DatePicker defaultValue={parseISO('2017-08-14')} format="yyyy-MM-dd" />);

    expect(screen.getByRole('textbox')).to.have.value('2017-08-14');
  });

  it('Should output a date with a custom format', () => {
    render(
      <DatePicker
        defaultValue={new Date('2024-10-08 17:17:00')}
        format="dd.MM.yyyy HH.mm"
        defaultOpen
      />
    );

    expect(screen.getByRole('textbox')).to.have.value('08.10.2024 17.17');
    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Oct 2024');
    expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('17.17');
  });

  it('Should open a dialog containing grid view of dates in a month', () => {
    render(<DatePicker defaultOpen defaultValue={new Date('2023-10-01')} />);
    expect(screen.getByRole('dialog')).to.be.visible;
    expect(screen.getByRole('grid', { name: 'Oct 2023' })).to.be.visible;
  });

  it('Should be possible to specify initial month with `calendarDefaultDate`', () => {
    const date = new Date('12/15/2021');
    render(<DatePicker defaultOpen calendarDefaultDate={date} />);

    // Dec 2021
    const month = format(date, 'MMM yyyy', { locale: enGB });

    expect(screen.getByRole('grid', { name: month })).to.exist;

    Array.from({ length: 31 }).forEach((_, index) => {
      expect(screen.getByRole('grid', { name: month })).to.contain(
        screen.getByRole('gridcell', {
          name: format(new Date(`12/${index + 1}/2021`), 'dd MMM yyyy', { locale: enGB })
        })
      );
    });
  });

  it('Should update value to be `null` when "clear" button is clicked', () => {
    const onChange = sinon.spy();
    render(<DatePicker value={new Date(2021, 0, 4)} onChange={onChange} cleanable />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onChange).to.have.been.calledWith(null);
  });

  it('Should get panel container ref', function () {
    const { container } = render(<DatePicker defaultOpen />);

    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should call `onChange` callback', () => {
    const onChange = sinon.spy();
    render(<DatePicker onChange={onChange} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onChange).to.calledOnce;
  });

  it('Should call `onChange` callback when click shortcut', () => {
    const onChange = sinon.spy();

    render(<DatePicker onChange={onChange} defaultOpen />);
    const today = screen.getByRole('dialog').querySelector('.rs-picker-toolbar button');

    fireEvent.click(today as Element);

    expect(onChange).to.calledOnce;
    expect(isSameDay(onChange.firstCall.firstArg, new Date())).to.true;
  });

  it('Should be prompted for an error date', () => {
    const { container } = render(<DatePicker />);

    const input = screen.getByRole('textbox');

    expect(input).to.not.have.attribute('aria-invalid');
    expect(container.firstChild).to.not.have.class('rs-picker-error');

    userEvent.type(input, '1');

    expect(container.firstChild).to.have.class('rs-picker-error');
    expect(input).to.have.attribute('aria-invalid', 'true');
  });

  it('Should be a correct date with no errors', () => {
    const { container } = render(<DatePicker format="yyyy" />);

    const input = screen.getByRole('textbox');

    userEvent.type(input, '2023');

    expect(container.firstChild).to.not.have.class('rs-picker-error');
    expect(input).to.have.attribute('aria-invalid', 'false');
  });

  it('Should call `onClean` callback', () => {
    const onClean = sinon.spy();
    render(<DatePicker defaultValue={new Date()} onClean={onClean} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onClean).to.calledOnce;
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = sinon.spy();
    render(<DatePicker onSelect={onSelect} defaultOpen defaultValue={new Date('2023-10-01')} />);

    fireEvent.click(screen.getByRole('gridcell', { name: '02 Oct 2023' }));

    expect(onSelect).to.calledOnce;
  });

  it('Should keep the time unchanged when clicking on the date', () => {
    const onChange = sinon.spy();
    const onSelect = sinon.spy();

    render(
      <DatePicker
        onChange={onChange}
        onSelect={onSelect}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
        defaultValue={new Date('2024-10-01 13:30:10')}
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '02 Oct 2024' }));

    expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('13:30:10');
    expect(onSelect).to.be.calledWithMatch(new Date('2024-10-02 13:30:10'));

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onChange).to.be.calledWithMatch(new Date('2024-10-02 13:30:10'));
  });

  it('Should call `onOk` callback', () => {
    const onOk = sinon.spy();
    render(<DatePicker onOk={onOk} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onOk).to.calledOnce;
  });

  it('Should call `onNextMonth` callback', () => {
    const onNextMonth = sinon.spy();
    render(<DatePicker onNextMonth={onNextMonth} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));

    expect(onNextMonth).to.calledOnce;
  });

  it('Should call `onPrevMonth` callback', () => {
    const onPrevMonth = sinon.spy();
    render(<DatePicker onPrevMonth={onPrevMonth} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onPrevMonth).to.calledOnce;
  });

  it('Should call `onToggleMonthDropdown` callback when click title', () => {
    const onToggleMonthDropdown = sinon.spy();
    render(
      <DatePicker
        onToggleMonthDropdown={onToggleMonthDropdown}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
      />
    );

    const month = screen.getByRole('button', { name: 'Select month' });

    fireEvent.click(month);
    expect(onToggleMonthDropdown).to.be.calledOnce;
    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar-month-view');

    fireEvent.click(month);
    expect(onToggleMonthDropdown).to.be.calledTwice;
    expect(screen.getByTestId('calendar')).to.not.have.class('rs-calendar-month-view');
  });

  it('Should call `onToggleTimeDropdown` callback when click time', () => {
    const onToggleTimeDropdown = sinon.spy();
    render(
      <DatePicker
        onToggleTimeDropdown={onToggleTimeDropdown}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
      />
    );
    const time = screen.getByRole('button', { name: 'Select time' });

    fireEvent.click(time);
    expect(onToggleTimeDropdown).to.be.calledOnce;
    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar-time-view');

    fireEvent.click(time);
    expect(onToggleTimeDropdown).to.be.calledTwice;
    expect(screen.getByTestId('calendar')).to.not.have.class('rs-calendar-time-view');
  });

  it('Should call `onChangeCalendarDate` callback when click backward', () => {
    const onChangeCalendarDate = sinon.spy();

    render(<DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click forward', () => {
    const onChangeCalendarDate = sinon.spy();

    render(<DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click day ', () => {
    const onChangeCalendarDate = sinon.spy();

    render(
      <DatePicker
        onChangeCalendarDate={onChangeCalendarDate}
        defaultOpen
        defaultValue={new Date('2032-10-01')}
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '02 Oct 2032' }));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click month ', () => {
    const onChangeCalendarDate = sinon.spy();

    render(<DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    fireEvent.click(screen.getByRole('gridcell', { name: 'Oct 2023' }));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();

    render(<DatePicker onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();

    render(<DatePicker onClose={onClose} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should reset unsaved selected date after closing calendar panel', async () => {
    render(
      <>
        <div data-testid="outside">Outside</div>
        <DatePicker defaultOpen value={new Date(2022, 9, 14)} />
      </>
    );

    // Select a date
    userEvent.click(screen.getByTitle('13 Oct 2022'));
    expect(screen.getByRole('gridcell', { name: '13 Oct 2022' })).to.have.attr(
      'aria-selected',
      'true'
    );

    // Close the calendar panel without clicking "OK"
    userEvent.click(screen.getByTestId('outside'));

    // Open the calendar panel again and the selection should be reset
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('gridcell', { name: '13 Oct 2022' })).not.to.have.attr(
      'aria-selected',
      'true'
    );
  });

  it('Should not reset saved selected date after closing calendar panel', async () => {
    render(<DatePicker defaultOpen value={new Date(2022, 9, 14)} />);

    // Select a date
    userEvent.click(screen.getByTitle('13 Oct 2022'));
    expect(screen.getByRole('gridcell', { name: '13 Oct 2022' })).to.have.attr(
      'aria-selected',
      'true'
    );

    // Close the calendar panel without clicking "OK"
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Open the calendar panel again and the selection should be reset
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('gridcell', { name: '13 Oct 2022' })).to.have.attr(
      'aria-selected',
      'true'
    );
  });

  it('Should not change for the value  when it is controlled', () => {
    const onChange = sinon.spy();

    render(
      <DatePicker
        format="yyyy-MM-dd"
        value={parseISO('2018-01-05')}
        onChange={onChange}
        defaultOpen
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '06 Jan 2018' }));
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onChange).to.have.been.calledOnce;
    expect(screen.getByRole('textbox')).to.have.value('2018-01-05');
  });

  it('Should call `onBlur` callback', () => {
    const onBlur = sinon.spy();
    render(<DatePicker onBlur={onBlur} />);

    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call `onFocus` callback', () => {
    const onFocus = sinon.spy();
    render(<DatePicker onFocus={onFocus} defaultValue={new Date()} />);

    fireEvent.focus(screen.getByRole('textbox'));

    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should call onChange after setting oneTap and clicking date', () => {
    const onChange = sinon.spy();

    render(
      <DatePicker
        onChange={onChange}
        oneTap
        defaultOpen
        defaultValue={new Date('2023-10-01 00:00:00')}
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '01 Oct 2023' }));

    expect(onChange).to.be.calledWithMatch(new Date('2023-10-01 00:00:00'));
  });

  it('Should call onChange after setting oneTap and clicking month', () => {
    const onChange = sinon.spy();
    render(
      <DatePicker
        defaultValue={new Date('2023-10-01')}
        onChange={onChange}
        format="yyyy-MM"
        oneTap
        defaultOpen
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: 'Oct 2023' }));

    expect(onChange).to.be.calledWithMatch(new Date('2023-10-01'));
  });

  it('Should show dates that are not in the same month', () => {
    render(<DatePicker value={new Date('6/10/2021')} open />);

    expect(
      screen
        .getByRole('grid', { name: 'Jun 2021' })

        .querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).to.have.text(['30', '31', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

    userEvent.click(screen.getByRole('button', { name: 'Next month' }));

    expect(
      screen
        .getByRole('grid', { name: 'Jul 2021' })

        .querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).to.have.text(['27', '28', '29', '30', '1', '2', '3', '4', '5', '6', '7']);
  });

  it('Should accept controlled value', () => {
    render(<DatePicker value={new Date('7/11/2021')} open format="yyyy-MM-dd" />);

    expect(screen.getByRole('textbox')).to.have.value('2021-07-11');
    expect(screen.getByRole('grid', { name: 'Jul 2021' })).to.contain(
      screen.getByRole('gridcell', { name: '11 Jul 2021', selected: true })
    );
  });

  it('Should be a controlled value, null is allowed', () => {
    const { rerender } = render(
      <DatePicker value={new Date('6/10/2021')} open format="yyyy-MM-dd" />
    );

    expect(screen.getByRole('textbox')).to.have.value('2021-06-10');

    rerender(<DatePicker value={null} open format="yyyy-MM-dd" />);
    expect(screen.getByRole('textbox')).to.have.value('');
  });

  it('Should render week numbers given `showWeekNumbers=true`', () => {
    render(<DatePicker defaultOpen calendarDefaultDate={new Date('12/15/2021')} showWeekNumbers />);

    [47, 48, 49, 50, 51, 52].forEach(weekOrder => {
      expect(screen.getByRole('grid', { name: 'Dec 2021' })).to.contain(
        screen.getByRole('rowheader', {
          name: `Week ${weekOrder}`
        })
      );
    });
  });

  it('Should render a custom caret', () => {
    render(<DatePicker caretAs={GearIcon} />);

    expect(screen.getByLabelText('gear')).to.have.class('rs-icon');
  });

  it('Should switch to the previous or next element via the tab key', () => {
    render(
      <>
        <DatePicker aria-label="picker-1" value={new Date('2022-01-01')} />
        <DatePicker aria-label="picker-2" value={new Date('2022-01-02')} />
      </>
    );

    userEvent.tab();
    expect(screen.getByRole('textbox', { name: 'picker-1' })).to.be.focus;

    userEvent.tab();
    expect(screen.getByRole('textbox', { name: 'picker-2' })).to.be.focus;

    userEvent.tab({ shift: true });
    expect(screen.getByRole('textbox', { name: 'picker-1' })).to.be.focus;
  });

  it('Should focus on the textbox when clicking the OK button', async () => {
    render(<DatePicker defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => {
      expect(screen.getByRole('textbox')).to.be.focus;
    });
  });

  it('Should focus on the textbox when clicking the day', async () => {
    render(<DatePicker defaultOpen oneTap defaultValue={new Date('2023-10-01')} />);

    fireEvent.click(screen.getByRole('gridcell', { name: '01 Oct 2023' }));

    await waitFor(() => {
      expect(screen.getByRole('textbox')).to.be.focus;
    });
  });

  it('Should focus on the textbox when clicking the month', async () => {
    render(
      <DatePicker defaultOpen oneTap defaultValue={new Date('2023-10-01')} format="yyyy-MM" />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: 'Oct 2023' }));

    await waitFor(() => {
      expect(screen.getByRole('textbox')).to.be.focus;
    });
  });

  it('Should reset to default time after clicking clear button', () => {
    const onChange = sinon.spy();
    render(
      <DatePicker
        open
        calendarDefaultDate={new Date('2022-02-02 00:00:00')}
        onChange={onChange}
        format="yyyy-MM-dd HH:mm:ss"
        ranges={[
          {
            label: 'custom-day',
            value: new Date('2022-02-02 12:00:00')
          }
        ]}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'custom-day' }));

    expect(isSameDay(onChange.getCall(0).args[0], new Date('2022-02-02'))).to.be.true;
    expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('12:00:00');

    userEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onChange).to.have.been.calledWith(null);
    expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('00:00:00');
  });

  it('Should render range buttons for bottom and left placements', () => {
    const onChange = sinon.spy();
    render(
      <DatePicker
        open
        calendarDefaultDate={new Date('2022-02-02 00:00:00')}
        onChange={onChange}
        format="yyyy-MM-dd HH:mm:ss"
        ranges={[
          {
            label: 'Left Placement',
            value: new Date('2022-02-01 12:00:00'),
            placement: 'left'
          },
          {
            label: 'Bottom Placement',
            value: new Date('2022-02-02 12:00:00'),
            placement: 'bottom'
          },
          {
            label: 'Default Placement',
            value: new Date('2022-02-03 12:00:00')
          }
        ]}
      />
    );

    expect(screen.getByRole('button', { name: 'Left Placement' })).to.exist;
    expect(screen.getByRole('button', { name: 'Bottom Placement' })).to.exist;
    expect(screen.getByRole('button', { name: 'Default Placement' })).to.exist;
  });

  it('Should be controllable for keyboard input', () => {
    render(
      <>
        <DatePicker data-testid="picker-1" />
        <DatePicker data-testid="picker-2" editable={false} />
      </>
    );

    expect(screen.queryAllByRole('textbox')[0]).to.not.have.attribute('readonly');
    expect(screen.queryAllByRole('textbox')[1]).to.have.attribute('readonly');
  });

  it('Should change calendar title after clicking on the month', () => {
    render(<DatePicker format="yyyy-MM" defaultValue={new Date('2023-10-01')} open />);

    const title = screen.getByRole('button', { name: 'Select month' });

    expect(title).to.have.text('Oct 2023');

    fireEvent.click(screen.getByRole('gridcell', { name: 'Nov 2023' }));

    expect(title).to.have.text('Nov 2023');
  });

  it('Should the calendar date be reset when the controlled value is cleared', () => {
    const App = () => {
      const [value, setValue] = React.useState<Date | null>();
      return (
        <DatePicker
          value={value}
          onChange={setValue}
          format="yyyy-MM-dd HH:mm:ss"
          calendarDefaultDate={new Date('2022-02-02 00:00:00')}
          ranges={[{ label: 'This day', value: new Date('2023-01-01 10:20:30') }]}
        />
      );
    };

    render(<App />);

    fireEvent.click(screen.getByRole('textbox'));

    const date = screen.getByRole('button', { name: 'Select month' });
    const time = screen.getByRole('button', { name: 'Select time' });

    expect(date).to.have.text('Feb 2022');
    expect(time).to.have.text('00:00:00');

    fireEvent.click(screen.getByRole('button', { name: 'This day' }));

    expect(date).to.have.text('Jan 2023');
    expect(time).to.have.text('10:20:30');
    expect(screen.getByRole('textbox')).to.have.value('2023-01-01 10:20:30');

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    fireEvent.click(screen.getByRole('textbox'));

    expect(date).to.have.text('Feb 2022');
    expect(time).to.have.text('00:00:00');
  });

  it('Should display the default month on the calendar based on the defaultValue', () => {
    render(<DatePicker defaultValue={new Date('2023-04-01')} open />);

    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Apr 2023');
  });

  it('Should call `onShortcutClick` callback', () => {
    const onShortcutClick = sinon.spy();

    render(
      <DatePicker
        defaultOpen
        ranges={[{ label: 'custom-day', value: new Date('2022-02-02 12:00:00') }]}
        onShortcutClick={onShortcutClick}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'custom-day' }));

    expect(onShortcutClick).to.be.calledOnce;
    expect(onShortcutClick).to.be.calledWithMatch({
      label: 'custom-day',
      value: new Date('2022-02-02 12:00:00')
    });
  });

  it('Should be clear the value via the Backspace key', () => {
    const onChange = sinon.spy();

    render(<DatePicker onChange={onChange} format="yyyy" defaultValue={new Date('2023-11-01')} />);

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onChange).to.be.calledOnce;
    expect(onChange).to.be.calledWithMatch(null);
  });

  it('Should call `onChange` callback and return an invalid date', () => {
    const onChange = sinon.spy();

    render(
      <DatePicker onChange={onChange} format="yyyy-MM-dd" defaultValue={new Date('2023-11-01')} />
    );

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onChange).to.be.calledOnce;
    expect(screen.getByRole('textbox')).to.have.value('yyyy-11-01');

    // Invalid date
    expect(isValid(onChange.firstCall.firstArg)).to.be.false;
  });

  it('Should call `onChange` callback and return a valid date', () => {
    const onChange = sinon.spy();

    render(
      <DatePicker
        onChange={onChange}
        format="yyyy-MM-dd"
        defaultValue={new Date('2023-11-01')}
        open
      />
    );

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onChange).to.be.calledOnce;
    expect(screen.getByRole('textbox')).to.have.value('yyyy-11-01');

    // Invalid date
    expect(isValid(onChange.firstCall.firstArg)).to.be.false;

    userEvent.click(screen.getByRole('gridcell', { selected: true }));
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(onChange).to.be.calledTwice;
    expect(format(onChange.secondCall.firstArg, 'yyyy-MM-dd')).to.equal(
      format(new Date(), 'yyyy-MM-dd')
    );
  });

  it('Should custom render cell', () => {
    render(
      <DatePicker
        open
        value={new Date('2023-10-01')}
        renderCell={date => {
          const day = date.getDate();

          return day === 1 ? <span>1🎉</span> : day;
        }}
      />
    );

    expect(screen.getByRole('gridcell', { name: '01 Oct 2023' })).to.have.text('1🎉');
  });

  it('Should allow month input 0', async () => {
    render(<DatePicker format="MM/dd/yyyy" defaultValue={new Date('2024-06-01')} />);

    await keyPress(screen.getByRole('textbox'), '0');

    expect(screen.getByRole('textbox')).to.have.value('00/01/2024');
    expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
  });

  it('Should allow day input 0', async () => {
    render(<DatePicker format="MM/dd/yyyy" defaultValue={new Date('2024-06-01')} />);

    await keyPress(screen.getByRole('textbox'), '010');

    expect(screen.getByRole('textbox')).to.have.value('01/00/2024');
    expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
  });

  it('Should display AM/PM in the correct position', () => {
    const { rerender } = render(
      <DatePicker
        format="yyyy-MM-dd aa HH:mm"
        defaultValue={new Date('2024-10-01 08:00:00')}
        defaultOpen
      />
    );

    expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('AM 08:00');

    rerender(
      <DatePicker
        format="yyyy-MM-dd HH:mm aa"
        defaultValue={new Date('2024-10-01 08:00:00')}
        defaultOpen
      />
    );

    expect(screen.getByRole('button', { name: 'Select time' })).to.have.text('08:00 AM');
  });

  describe('Custom week ', () => {
    it('Should render the correct week numbers', () => {
      const { rerender } = render(
        <DatePicker defaultOpen value={new Date('2020-12-01')} showWeekNumbers />
      );

      expect(screen.queryByRole('rowheader', { name: 'Week 53' })).to.be.exist;

      rerender(<DatePicker defaultOpen value={new Date('2022-12-01')} showWeekNumbers />);

      expect(screen.queryByRole('rowheader', { name: 'Week 53' })).to.not.exist;
    });

    it('Should render the correct week start', () => {
      render(<DatePicker defaultOpen value={new Date('2024-05-21')} weekStart={2} />);

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
      render(<DatePicker defaultOpen value={new Date('2024-05-21')} isoWeek />);

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

  describe('Accessibility', () => {
    it('Should have a aria-label attribute', () => {
      render(<DatePicker aria-label="Custom label" />);

      expect(screen.getByRole('textbox')).to.have.attribute('aria-label', 'Custom label');
    });

    it('Should have a aria-labelledby attribute', () => {
      render(<DatePicker aria-labelledby="custom-label" />);

      expect(screen.getByRole('textbox')).to.have.attribute('aria-labelledby', 'custom-label');
    });

    it('Should associate with aria-labelledby to a corresponding label id.', () => {
      render(<DatePicker label="custom-label" />);

      const labelId = screen.getByTestId('picker-label').getAttribute('id') as string;

      expect(screen.getByRole('textbox')).to.have.attribute('aria-labelledby', labelId);
    });

    it('Should focus on specified date by ArrowDown key', async () => {
      render(<DatePicker defaultValue={new Date('2023-10-01')} editable={false} />);

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '01 Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Oct 2023' }), {
        key: 'ArrowDown'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '08 Oct 2023' })).to.have.focus;
      });
    });

    it('Should focus on specified date by ArrowUp key', async () => {
      render(<DatePicker defaultValue={new Date('2023-10-01')} editable={false} />);

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '01 Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Oct 2023' }), {
        key: 'ArrowUp'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '24 Sep 2023' })).to.have.focus;
      });
    });

    it('Should focus on specified date by ArrowRight key', async () => {
      render(<DatePicker defaultValue={new Date('2023-10-01')} editable={false} />);

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '01 Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Oct 2023' }), {
        key: 'ArrowRight'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '02 Oct 2023' })).to.have.focus;
      });
    });

    it('Should focus on specified date by ArrowLeft key', async () => {
      render(<DatePicker defaultValue={new Date('2023-10-01')} editable={false} />);

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '01 Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Oct 2023' }), {
        key: 'ArrowLeft'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: '30 Sep 2023' })).to.have.focus;
      });
    });

    it('Should focus on specified month by ArrowDown key', async () => {
      render(
        <DatePicker defaultValue={new Date('2023-10-01')} format="yyyy-MM" editable={false} />
      );

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Select month' }), {
        key: 'ArrowDown'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Apr 2024' })).to.have.focus;
      });
    });

    it('Should focus on specified month by ArrowUp key', async () => {
      render(
        <DatePicker defaultValue={new Date('2023-10-01')} format="yyyy-MM" editable={false} />
      );

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Select month' }), {
        key: 'ArrowUp'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Apr 2023' })).to.have.focus;
      });
    });

    it('Should focus on specified month by ArrowRight key', async () => {
      render(
        <DatePicker defaultValue={new Date('2023-10-01')} format="yyyy-MM" editable={false} />
      );

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Select month' }), {
        key: 'ArrowRight'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Nov 2023' })).to.have.focus;
      });
    });

    it('Should focus on specified month by ArrowLeft key', async () => {
      render(
        <DatePicker defaultValue={new Date('2023-10-01')} format="yyyy-MM" editable={false} />
      );

      fireEvent.click(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Oct 2023' })).to.have.focus;
      });

      fireEvent.keyDown(screen.getByRole('grid', { name: 'Select month' }), {
        key: 'ArrowLeft'
      });

      await waitFor(() => {
        expect(screen.getByRole('gridcell', { name: 'Sep 2023' })).to.have.focus;
      });
    });
  });

  describe('Disable Date, Hour, Minute, Second', () => {
    it('[Deprecated] Should disable hour options according to `disabledHours`', () => {
      render(<DatePicker open format="HH" disabledHours={hour => hour === 11} />);

      expect(screen.getByRole('option', { name: '11 hours' })).to.have.attribute(
        'aria-disabled',
        'true'
      );
    });

    it('[Deprecated] Should disable minute options according to `disabledMinutes`', () => {
      render(<DatePicker open format="mm" disabledMinutes={minute => minute === 40} />);

      expect(screen.getByRole('option', { name: '40 minutes' })).to.have.attribute(
        'aria-disabled',
        'true'
      );
    });
    it('[Deprecated] Should disable date cells according to `disabledDate`', () => {
      render(
        <DatePicker
          calendarDefaultDate={new Date(2023, 2, 7)}
          disabledDate={date => isSameDay(date as Date, new Date(2023, 2, 8))}
          open
        />
      );
      expect(screen.getByRole('gridcell', { name: '08 Mar 2023' })).to.have.class(
        'rs-calendar-table-cell-disabled'
      );
    });

    it('[Deprecated] Should disable second options according to `disabledSeconds`', () => {
      render(<DatePicker open format="ss" disabledSeconds={second => second === 40} />);

      expect(screen.getByRole('option', { name: '40 seconds' })).to.have.attribute(
        'aria-disabled',
        'true'
      );
    });

    it('Should disable date cells according to `shouldDisableDate`', () => {
      const onSelect = sinon.spy();
      render(
        <DatePicker
          calendarDefaultDate={new Date(2023, 2, 7)}
          shouldDisableDate={date => isSameDay(date, new Date(2023, 2, 8))}
          onSelect={onSelect}
          open
        />
      );

      const gridcell = screen.getByRole('gridcell', { name: '08 Mar 2023' });

      expect(gridcell).to.have.class('rs-calendar-table-cell-disabled');
      expect(gridcell).to.have.attribute('aria-disabled', 'true');

      fireEvent.click(gridcell);

      expect(onSelect).to.not.have.been.called;
    });

    it('Should disable month options according to `shouldDisableDate`', () => {
      const onSelect = sinon.spy();

      render(
        <DatePicker
          calendarDefaultDate={new Date(2024, 10, 1)}
          shouldDisableDate={date => {
            const month = date.getMonth();
            const year = date.getFullYear();
            return month === 0 && year === 2024;
          }}
          onSelect={onSelect}
          format="yyyy-MM"
          open
        />
      );

      const gridcell = screen.getByRole('gridcell', { name: 'Jan 2024' });

      expect(gridcell).to.have.class('disabled');
      expect(gridcell).to.have.attribute('aria-disabled', 'true');

      fireEvent.click(gridcell);

      expect(onSelect).to.not.have.been.called;
    });

    it('Should disable hour options according to `shouldDisableHour`', () => {
      render(<DatePicker open format="HH" shouldDisableHour={hour => hour === 11} />);

      expect(screen.getByRole('option', { name: '11 hours' })).to.have.attribute('aria-disabled');
    });

    it('Should disable minute options according to `shouldDisableMinute`', () => {
      render(<DatePicker open format="mm" shouldDisableMinute={minute => minute === 40} />);

      expect(screen.getByRole('option', { name: '40 minutes' })).to.have.attribute(
        'aria-disabled',
        'true'
      );
    });

    it('Should disable second options according to `shouldDisableSecond`', () => {
      render(<DatePicker open format="ss" shouldDisableSecond={minute => minute === 40} />);

      expect(screen.getByRole('option', { name: '40 seconds' })).to.have.attribute(
        'aria-disabled',
        'true'
      );
    });

    it('Should warn when time is disabled', () => {
      const App = props => (
        <DatePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          calendarDefaultDate={new Date('2023-01-01 11:22:33')}
          {...props}
        />
      );

      const { rerender } = render(<App />);

      const btnTime = screen.getByRole('button', { name: 'Select time' });
      const btnOk = screen.getByRole('button', { name: 'OK' });

      expect(btnTime).to.not.have.class('rs-calendar-header-error');
      expect(btnOk).to.not.have.attribute('disabled');

      rerender(<App shouldDisableHour={hour => hour === 11} />);
      expect(btnTime).to.have.class('rs-calendar-header-error');
      expect(btnOk).to.have.attribute('disabled');

      rerender(<App shouldDisableMinute={minute => minute === 22} />);
      expect(btnTime).to.have.class('rs-calendar-header-error');
      expect(btnOk).to.have.attribute('disabled');

      rerender(<App shouldDisableSecond={second => second === 33} />);
      expect(btnTime).to.have.class('rs-calendar-header-error');
      expect(btnOk).to.have.attribute('disabled');
    });

    it('Should be consistent whether a month can be selected and whether OK button is enabled when that month is selected', () => {
      // Disable the dates before 2022-12-21
      // Set value to 2022-11-20 (disabled)
      // The month 2022-12 should be enabled because not all dates in that month are disabled
      // The OK button should also be enabled because 2022-12 (currently selected) is selectable
      render(
        <DatePicker
          defaultOpen
          calendarDefaultDate={new Date(2022, 11, 20)}
          shouldDisableDate={date => isBefore(date as Date, new Date(2022, 11, 21))}
          format="yyyy-MM"
          defaultValue={new Date(2022, 11, 20)}
        />
      );

      expect(
        // The currently selected month is 2022-12
        screen.getByRole('gridcell', { selected: true })
      ).not.to.have.class('disabled');

      expect(screen.getByRole('button', { name: 'OK' })).to.not.have.attribute('disabled');
    });

    it('Should disable Ok button and date, and have an error prompt', () => {
      const { container } = render(
        <DatePicker
          defaultValue={new Date('2021-10-01')}
          defaultOpen
          shouldDisableDate={value => {
            return format(value as Date, 'yyyy-MM-dd') === '2021-10-01';
          }}
        />
      );

      expect(container.firstChild).to.have.class('rs-picker-error');
      expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
      expect(screen.getByRole('button', { name: 'OK' })).to.have.attribute('disabled');
    });

    it('Should disable Ok button and month, and have an error prompt', () => {
      const { container } = render(
        <DatePicker
          defaultValue={new Date('2024-01-01')}
          format="yyyy-MM"
          defaultOpen
          shouldDisableDate={date => {
            const month = date.getMonth();
            return month === 0;
          }}
        />
      );

      expect(container.firstChild).to.have.class('rs-picker-error');
      expect(screen.getByRole('textbox')).to.have.attribute('aria-invalid', 'true');
      expect(screen.getByRole('button', { name: 'OK' })).to.have.attribute('disabled');
    });
  });

  describe('Customize value', () => {
    it('Should render a custom value', () => {
      render(
        <DatePicker
          format="yyyy-MM-dd"
          defaultValue={new Date('2024-05-13')}
          renderValue={value => format(value, 'EEE, d MMM')}
        />
      );

      expect(screen.getByRole('textbox')).to.have.value('Mon, 13 May');
    });

    it('Should render a custom value when a value is entered via the keyboard', async () => {
      render(
        <>
          <div data-testid="outside">Outside</div>
          <DatePicker format="yyyy-MM-dd" renderValue={value => format(value, 'EEE, d MMM')} />
        </>
      );

      await keyPress(screen.getByRole('textbox'), '20240513');

      userEvent.click(screen.getByTestId('outside'));

      expect(screen.getByRole('textbox')).to.have.value('Mon, 13 May');
    });
  });

  describe('Custom Month Dropdown', () => {
    it('Should render custom month dropdown', () => {
      render(
        <DatePicker
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

      const dropdown = screen.getByTestId('calendar-month-dropdown');
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
        <DatePicker
          format="yyyy-MM"
          open
          monthDropdownProps={{
            as: Menu,
            itemAs: Item
          }}
        />
      );

      const dropdown = screen.getByTestId('calendar-month-dropdown');
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
        render(<DatePicker format="YY" value={new Date()} />);
      }).to.not.throw();

      expect(screen.getByRole('textbox')).to.have.value('Error: Invalid date format');
      expect(consoleErrorStub).to.have.been.calledWith(sinon.match(/Error: Invalid date format/));
    });

    it('Should render an error message when the format is incorrect', () => {
      expect(() => {
        render(<DatePicker format="_error_" value={new Date()} />);
      }).to.not.throw();

      expect(screen.getByRole('textbox')).to.have.value('Error: Invalid date format');
      expect(consoleErrorStub).to.have.been.calledWith(sinon.match(/Error: Invalid date format/));
    });
  });

  describe('Hide time', () => {
    it('Should hide hours', () => {
      render(
        <DatePicker
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
        <DatePicker
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
        <DatePicker
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
});
