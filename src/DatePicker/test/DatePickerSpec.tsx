import React from 'react';
import { testStandardProps } from '@test/commonCases';
import { render, fireEvent, act, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import enGB from 'date-fns/locale/en-GB';
import ReactTestUtils from 'react-dom/test-utils';
import { format, isSameDay, parseISO, addMonths, isBefore } from '../../utils/dateUtils';
import { getInstance } from '@test/testUtils';
import DatePicker from '../DatePicker';
import { DateUtils } from '../../utils';

import GearIcon from '@rsuite/icons/Gear';
import { PickerHandle } from '../../Picker';

afterEach(() => {
  sinon.restore();
});

describe('DatePicker', () => {
  testStandardProps(<DatePicker />);

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

  it('Should be disabled', () => {
    const { container } = render(<DatePicker disabled />);

    expect(container.firstChild).to.have.class('rs-picker-disabled');
  });

  it('Should be not cleanable', () => {
    render(<DatePicker cleanable={false} value={new Date()} />);

    expect(screen.queryByRole('button', { name: /clear/i })).to.not.exist;
  });

  it('Should output a button', () => {
    render(<DatePicker toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be block', () => {
    const { container } = render(<DatePicker block />);

    expect(container.firstChild).to.have.class('rs-picker-block');
  });

  it('Should output a date', () => {
    render(<DatePicker defaultValue={parseISO('2017-08-14')} />);

    expect(screen.getByRole('combobox')).to.have.text('2017-08-14');
  });

  it('Should output custom value', () => {
    render(
      <DatePicker
        value={parseISO('2017-08-14')}
        renderValue={value => {
          return format(value, 'MM/dd/yyyy');
        }}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('08/14/2017');
  });

  it('Should output a date', () => {
    render(<DatePicker value={parseISO('2017-08-14')} />);

    expect(screen.getByRole('combobox')).to.have.text('2017-08-14');
  });

  it('Should open a dialog containing grid view of dates in a month', () => {
    render(<DatePicker defaultOpen />);
    expect(screen.getByRole('dialog')).to.be.visible.and.to.contain(screen.getByRole('grid'));
  });

  it('Should be possible to specify initial month with `calendarDefaultDate`', () => {
    const date = new Date('12/15/2021');
    render(<DatePicker defaultOpen calendarDefaultDate={date} />);

    // Dec 2021
    const month = DateUtils.format(date, 'MMM yyyy', { locale: enGB });

    expect(screen.getByRole('grid', { name: month })).to.exist;

    Array.from({ length: 31 }).forEach((_, index) => {
      expect(screen.getByRole('grid', { name: month })).to.contain(
        screen.getByRole('gridcell', {
          name: DateUtils.format(new Date(`12/${index + 1}/2021`), 'dd MMM yyyy', { locale: enGB })
        })
      );
    });
  });

  it('Should update value to be `null` when "clear" button is clicked', () => {
    const onChangeSpy = sinon.spy();
    render(<DatePicker value={new Date(2021, 0, 4)} onChange={onChangeSpy} cleanable />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onChangeSpy).to.have.been.calledWith(null);
  });

  it('Should get panel container ref', function () {
    const { container } = render(<DatePicker defaultOpen />);

    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    render(<DatePicker onChange={onChangeSpy} defaultOpen />);

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onChangeSpy).to.calledOnce;
  });

  it('Should call `onChange` callback when click shortcut', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} defaultOpen />);
    // eslint-disable-next-line testing-library/no-node-access
    const today = instance.overlay.querySelector('.rs-picker-toolbar button');

    fireEvent.click(today);

    expect(onChangeSpy).to.calledOnce;
    expect(isSameDay(onChangeSpy.firstCall.firstArg, new Date())).to.true;
  });

  it('Should call `onChange` callback when input change and blur', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '01102021' } });

    fireEvent.blur(input);

    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(format(onChangeSpy.firstCall.firstArg, 'dd/MM/yyyy'), '01/10/2021');
  });

  it('Should call `onChange` callback when input change and Enter key', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '01/10/2021' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChangeSpy).to.calledOnce;
    expect(format(onChangeSpy.firstCall.firstArg, 'dd/MM/yyyy')).to.equal('01/10/2021');
  });

  it('Should be prompted for an error date', () => {
    const instance = getInstance(<DatePicker />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: 'abc' } });

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.root.querySelector('.rs-picker-error')).to.exist;
  });

  it('Should be prompted for an error date by isValid', () => {
    const instance = getInstance(<DatePicker />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '2021-00-00' } });

    // eslint-disable-next-line testing-library/no-node-access
    assert.isNotNull(instance.root.querySelector('.rs-picker-error'));
  });

  it('Should be prompted for an error date by disabledDate', () => {
    const instance = getInstance(
      <DatePicker
        disabledDate={value => {
          return format(value as Date, 'yyyy-MM-dd') === '2021-10-01';
        }}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '2021-10-02' } });

    // eslint-disable-next-line testing-library/no-node-access
    assert.isNull(instance.root.querySelector('.rs-picker-error'));

    fireEvent.change(input, { target: { value: '2021-10-01' } });

    // eslint-disable-next-line testing-library/no-node-access
    assert.isNotNull(instance.root.querySelector('.rs-picker-error'));
  });

  it('[Deprecated] Should disable date cells according to `disabledDate`', () => {
    sinon.spy(console, 'warn');
    render(
      <DatePicker
        calendarDefaultDate={new Date(2023, 2, 7)}
        disabledDate={date => isSameDay(date as Date, new Date(2023, 2, 8))}
        open
      />
    );

    // TODO use more accurate matchers
    expect(screen.getByRole('gridcell', { name: '08 Mar 2023' })).to.have.class(
      'rs-calendar-table-cell-disabled'
    );
    expect(console.warn).to.have.been.calledWith(
      '[rsuite] "disabledDate" property of DatePicker component has been deprecated.\nUse "shouldDisableDate" property instead.'
    );
  });

  it('Should disable date cells according to `shouldDisableDate`', () => {
    render(
      <DatePicker
        calendarDefaultDate={new Date(2023, 2, 7)}
        shouldDisableDate={date => isSameDay(date, new Date(2023, 2, 8))}
        open
      />
    );

    // TODO use more accurate matchers
    expect(screen.getByRole('gridcell', { name: '08 Mar 2023' })).to.have.class(
      'rs-calendar-table-cell-disabled'
    );
  });

  it('Should disable hour options according to `shouldDisableHour`', () => {
    render(<DatePicker open format="HH" shouldDisableHour={hour => hour === 11} />);

    // TODO Use "listbox" and "option" role
    // TODO Add accessible name to listbox
    expect(within(screen.getByRole('menu')).getByRole('button', { name: '11' })).to.have.class(
      /disabled/
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
    const btnTime = screen.getByRole('button', { name: '11:22:33' });

    expect(btnTime).to.not.have.class('rs-calendar-header-error');

    rerender(<App shouldDisableHour={hour => hour === 11} />);
    expect(btnTime).to.have.class('rs-calendar-header-error');

    rerender(<App shouldDisableMinute={minute => minute === 22} />);
    expect(btnTime).to.have.class('rs-calendar-header-error');

    rerender(<App shouldDisableSecond={second => second === 33} />);
    expect(btnTime).to.have.class('rs-calendar-header-error');
  });

  it('[Deprecated] Should disable hour options according to `disabledHours`', () => {
    sinon.spy(console, 'warn');
    render(<DatePicker open format="HH" disabledHours={hour => hour === 11} />);

    // TODO Use "listbox" and "option" role
    // TODO Add accessible name to listbox
    expect(within(screen.getByRole('menu')).getByRole('button', { name: '11' })).to.have.class(
      /disabled/
    );
    expect(console.warn).to.have.been.calledWith(
      '[rsuite] "disabledHours" property of DatePicker component has been deprecated.\nUse "shouldDisableHour" property instead.'
    );
  });

  it('Should disable minute options according to `shouldDisableMinute`', () => {
    render(<DatePicker open format="mm" shouldDisableMinute={minute => minute === 40} />);

    // TODO Use "listbox" and "option" role
    // TODO Add accessible name to listbox
    expect(within(screen.getByRole('menu')).getByRole('button', { name: '40' })).to.have.class(
      /disabled/
    );
  });

  it('[Deprecated] Should disable minute options according to `disabledMinutes`', () => {
    sinon.spy(console, 'warn');
    render(<DatePicker open format="mm" disabledMinutes={minute => minute === 40} />);

    // TODO Use "listbox" and "option" role
    // TODO Add accessible name to listbox
    expect(within(screen.getByRole('menu')).getByRole('button', { name: '40' })).to.have.class(
      /disabled/
    );
    expect(console.warn).to.have.been.calledWith(
      '[rsuite] "disabledMinutes" property of DatePicker component has been deprecated.\nUse "shouldDisableMinute" property instead.'
    );
  });

  it('Should disable second options according to `shouldDisableSecond`', () => {
    render(<DatePicker open format="ss" shouldDisableSecond={minute => minute === 40} />);

    // TODO Use "listbox" and "option" role
    // TODO Add accessible name to listbox
    expect(within(screen.getByRole('menu')).getByRole('button', { name: '40' })).to.have.class(
      /disabled/
    );
  });

  it('[Deprecated] Should disable second options according to `disabledSeconds`', () => {
    sinon.spy(console, 'warn');
    render(<DatePicker open format="ss" disabledSeconds={second => second === 40} />);

    // TODO Use "listbox" and "option" role
    // TODO Add accessible name to listbox
    expect(within(screen.getByRole('menu')).getByRole('button', { name: '40' })).to.have.class(
      /disabled/
    );
    expect(console.warn).to.have.been.calledWith(
      '[rsuite] "disabledSeconds" property of DatePicker component has been deprecated.\nUse "shouldDisableSecond" property instead.'
    );
  });

  it('Should allow only time', () => {
    const instance = getInstance(<DatePicker format="HH:mm:ss" />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '10:00:00' } });

    fireEvent.blur(input);

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').textContent, '10:00:00');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<DatePicker defaultValue={new Date()} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should remain active after clearing the value', () => {
    const onCleanSpy = sinon.spy();
    render(<DatePicker defaultValue={new Date()} onClean={onCleanSpy} />);

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
    expect(screen.getByRole('combobox')).to.have.class('rs-picker-toggle-active');
  });

  it('Should call `onSelect` callback', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(<DatePicker onSelect={onSelectSpy} defaultOpen />);
    fireEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelector(
        '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
      )
    );
    expect(onSelectSpy).to.calledOnce;
  });

  it('Should call `onOk` callback', () => {
    const onOkSpy = sinon.spy();
    render(<DatePicker onOk={onOkSpy} defaultOpen />);
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onOkSpy).to.calledOnce;
  });

  it('Should call `onNextMonth` callback', () => {
    const onNextMonthSpy = sinon.spy();
    const instance = getInstance(<DatePicker onNextMonth={onNextMonthSpy} defaultOpen />);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelector('.rs-calendar-header-forward'));

    expect(onNextMonthSpy).to.calledOnce;
  });

  it('Should call `onPrevMonth` callback', () => {
    const onPrevMonthSpy = sinon.spy();
    const instance = getInstance(<DatePicker onPrevMonth={onPrevMonthSpy} defaultOpen />);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelector('.rs-calendar-header-backward'));

    expect(onPrevMonthSpy).to.calledOnce;
  });

  it('Should call `onToggleMonthDropdown` callback when click title', () => {
    const onToggleMonthDropdownSpy = sinon.spy();
    const instance = getInstance(
      <DatePicker
        onToggleMonthDropdown={onToggleMonthDropdownSpy}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const month = instance.overlay.querySelector('.rs-calendar-header-title-date');

    fireEvent.click(month);

    // eslint-disable-next-line testing-library/no-node-access
    assert.isNotNull(instance.overlay.querySelector('.rs-calendar-month-dropdown.show'));
    assert.isTrue(onToggleMonthDropdownSpy.calledOnce);

    fireEvent.click(month);

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-calendar-month-dropdown.show')).to.not.exist;
    expect(onToggleMonthDropdownSpy).to.calledTwice;
  });

  it('Should call `onToggleTimeDropdown` callback when click time', () => {
    const onToggleTimeDropdownSpy = sinon.spy();
    const instance = getInstance(
      <DatePicker
        onToggleTimeDropdown={onToggleTimeDropdownSpy}
        defaultOpen
        format="yyyy-MM-dd HH:mm:ss"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const time = instance.overlay.querySelector('.rs-calendar-header-title-time');

    fireEvent.click(time);

    // eslint-disable-next-line testing-library/no-node-access
    assert.isNotNull(instance.overlay.querySelector('.rs-calendar-time-view'));
    assert.isTrue(onToggleTimeDropdownSpy.calledOnce);

    fireEvent.click(time);

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-calendar-time-view')).to.not.exist;
    expect(onToggleTimeDropdownSpy).to.calledTwice;
  });

  it('Should call `onChangeCalendarDate` callback when click backward', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );

    // eslint-disable-next-line testing-library/no-node-access
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-backward'));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click forward', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );
    // eslint-disable-next-line testing-library/no-node-access
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-forward'));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click today ', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );
    ReactTestUtils.Simulate.click(today);

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click month ', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );

    act(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const title = instance.overlay.querySelector('.rs-calendar-header-title-date');
      ReactTestUtils.Simulate.click(title);
    });

    act(() => {
      // eslint-disable-next-line testing-library/no-node-access
      const month = instance.overlay.querySelector('.rs-calendar-month-dropdown-cell');
      ReactTestUtils.Simulate.click(month);
    });

    expect(onChangeCalendarDate).to.have.been.calledOnce;
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
        disabledDate={date => isBefore(date as Date, new Date(2022, 11, 21))}
        format="yyyy-MM"
        defaultValue={new Date(2022, 11, 20)}
      />
    );

    // TODO use a11y queries and matchers
    expect(
      // The currently selected month is 2022-12
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(
        '.rs-calendar-month-dropdown-cell-active .rs-calendar-month-dropdown-cell-content'
      )
    ).not.to.have.class('disabled');
    expect(screen.getByRole('button', { name: 'OK' })).to.have.property('disabled', false);
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();

    render(<DatePicker onOpen={onOpen} />);
    ReactTestUtils.Simulate.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();

    render(<DatePicker onClose={onClose} defaultOpen />);
    ReactTestUtils.Simulate.click(screen.getByRole('button', { name: /ok/i }));
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
    userEvent.click(screen.getByRole('combobox'));
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
    userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('gridcell', { name: '13 Oct 2022' })).to.have.attr(
      'aria-selected',
      'true'
    );
  });

  it('Should not change for the value  when it is controlled', () => {
    const onChange = sinon.spy();

    const instance = getInstance(
      <DatePicker value={parseISO('2018-01-05')} onChange={onChange} defaultOpen />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const allCells = instance.overlay.querySelectorAll(
      '.rs-calendar-table-cell .rs-calendar-table-cell-content'
    );

    fireEvent.click(allCells[allCells.length - 1]);
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(onChange).to.have.been.calledOnce;
    expect(screen.getByRole('combobox')).to.have.text('2018-01-05');
  });

  it('Should call onBlur callback', async () => {
    const onBlurSpy = sinon.spy();
    render(<DatePicker onBlur={onBlurSpy} />);

    fireEvent.blur(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onBlurSpy).to.have.been.calledOnce;
      expect(screen.getByRole('combobox')).to.not.have.class('rs-picker-toggle-active');
    });
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    render(<DatePicker onFocus={onFocusSpy} defaultValue={new Date()} />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = screen.getByRole('combobox').querySelector('input') as HTMLInputElement;

    fireEvent.focus(input);

    expect(onFocusSpy).to.have.been.calledOnce;
    expect(screen.getByRole('combobox')).to.have.class('rs-picker-toggle-active');
  });

  it('Should call onChange after setting oneTap and clicking date', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} oneTap defaultOpen />);

    // eslint-disable-next-line testing-library/no-node-access
    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.click(today);
    assert.isTrue(isSameDay(onChangeSpy.firstCall.firstArg, new Date()));
  });

  it('Should call onChange after setting oneTap and clicking month', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(
      <DatePicker onChange={onChangeSpy} format="yyyy-MM" oneTap defaultOpen />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const activeMonth = instance.overlay.querySelector(
      '.rs-calendar-month-dropdown-cell-active .rs-calendar-month-dropdown-cell-content'
    );

    ReactTestUtils.Simulate.click(activeMonth);
    assert.isTrue(isSameDay(onChangeSpy.firstCall.firstArg, new Date()));
  });

  it('Should be show meridian', () => {
    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="dd MMM yyyy hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );
    const picker = instance.overlay;

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector('.rs-calendar-header-meridian').textContent, 'PM');
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector('.rs-calendar-header-title-time').textContent, '01:00:00');
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      picker.querySelector('.rs-calendar-time-dropdown-column').querySelectorAll('li').length,
      12
    );
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector('.rs-calendar-time-dropdown-column li').textContent, '12');
  });

  it('Should show dates that are not in the same month', () => {
    const instance = getInstance(<DatePicker value={new Date('6/10/2021')} open />);
    const picker = instance.overlay;
    // eslint-disable-next-line testing-library/no-node-access
    const days = picker.querySelectorAll('.rs-calendar-table-cell-un-same-month');

    assert.equal(days[0].textContent, '30');
    assert.equal(days[1].textContent, '31');
    assert.equal(days[2].textContent, '1');
  });

  it('Should accept controlled value', () => {
    render(<DatePicker value={new Date('7/11/2021')} open />);

    expect(screen.getByRole('combobox')).to.have.text('2021-07-11');
    expect(screen.getByRole('grid', { name: 'Jul 2021' })).to.contain(
      screen.getByRole('gridcell', { name: '11 Jul 2021', selected: true })
    );
  });

  it('Should be a controlled value, null is allowed', () => {
    const { rerender } = render(
      <DatePicker value={new Date('6/10/2021')} open format="yyyy-MM-dd" />
    );

    expect(screen.getByRole('combobox')).to.have.text('2021-06-10');

    rerender(<DatePicker value={null} open format="yyyy-MM-dd" />);
    expect(screen.getByRole('combobox')).to.have.text('yyyy-MM-dd');
  });

  it('Should keep AM PM unchanged', () => {
    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );

    const picker = instance.overlay;

    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-title-time')).to.have.text('01:00:00');

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(picker.querySelector('.rs-calendar-time-dropdown-cell'));

    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-meridian')).to.have.text('PM');
    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-title-time')).to.have.text('12:00:00');
  });

  it('Should change AM/PM ', () => {
    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');

    expect(meridian).to.have.text('PM');

    fireEvent.click(meridian);

    expect(meridian).to.have.text('AM');
  });

  it('Should render week numbers given `showWeekNumbers=true`', () => {
    render(<DatePicker defaultOpen calendarDefaultDate={new Date('12/15/2021')} showWeekNumbers />);

    [49, 50, 51, 52, 1, 2].forEach(weekOrder => {
      expect(screen.getByRole('grid', { name: 'Dec 2021' })).to.contain(
        screen.getByRole('rowheader', {
          name: `${weekOrder}`
        })
      );
    });
  });

  describe('Plain text', () => {
    it('Should render formatted date', () => {
      render(
        <div data-testid="content">
          <DatePicker value={new Date(2019, 3, 1)} format="MM/dd/yyyy" plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('04/01/2019');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          <DatePicker value={null} format="MM/dd/yyyy" plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });

    it('Should render a custom caret', () => {
      render(<DatePicker caretAs={GearIcon} />);

      expect(screen.getByLabelText('gear')).to.have.class('rs-icon');
    });
  });

  it('Should switch to the previous or next element via the tab key', () => {
    render(
      <>
        <DatePicker data-testid="picker-1" value={new Date('2022-01-01')} />
        <DatePicker data-testid="picker-2" value={new Date('2022-01-02')} />
      </>
    );

    userEvent.tab();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement).to.value('2022-01-01');

    userEvent.tab();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement).to.value('2022-01-02');

    userEvent.tab({ shift: true });
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement).to.value('2022-01-01');
  });

  it('Should reset to default time after clicking clear button', () => {
    const onChangeSpy = sinon.spy();
    render(
      <DatePicker
        open
        calendarDefaultDate={new Date('2022-02-02 00:00:00')}
        onChange={onChangeSpy}
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

    expect(isSameDay(onChangeSpy.getCall(0).args[0], new Date('2022-02-02'))).to.be.true;
    expect(screen.getByRole('button', { name: '12:00:00' })).to.exist;

    userEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onChangeSpy).to.have.been.calledWith(null);
    expect(screen.getByRole('button', { name: '00:00:00' })).to.exist;
  });

  it('Should render range buttons for bottom and left placements', () => {
    const onChangeSpy = sinon.spy();
    render(
      <DatePicker
        open
        calendarDefaultDate={new Date('2022-02-02 00:00:00')}
        onChange={onChangeSpy}
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

    // eslint-disable-next-line testing-library/no-node-access
    const picker1 = screen.getByTestId('picker-1').querySelector('input') as HTMLInputElement;
    // eslint-disable-next-line testing-library/no-node-access
    const picker2 = screen.getByTestId('picker-2').querySelector('input') as HTMLInputElement;

    expect(picker1).to.have.attribute('readonly');
    expect(picker2).to.have.attribute('readonly');

    fireEvent.focus(picker1);
    expect(picker1).to.not.have.attribute('readonly');

    fireEvent.focus(picker2);
    expect(picker2).to.have.attribute('readonly');
  });

  it('Should call onSelect when meridian toggled', () => {
    const onSelectSpy = sinon.spy();

    const instance = getInstance(
      <DatePicker
        value={parseISO('2017-08-14 13:00:00')}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
        onSelect={onSelectSpy}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');

    expect(meridian).to.have.text('PM');

    fireEvent.click(meridian);

    expect(meridian).to.have.text('AM');
    expect(onSelectSpy).to.have.been.calledWith(new Date('2017-08-14 01:00:00'));
  });

  it('Should change calendar title after clicking on the month', () => {
    const instance = getInstance(<DatePicker format="yyyy-MM" />);
    const today = new Date();

    fireEvent.click(instance.target);

    // eslint-disable-next-line testing-library/no-node-access
    const headerTitle = instance.overlay.querySelector('.rs-calendar-header-title');
    // eslint-disable-next-line testing-library/no-node-access
    const activeMonth = instance.overlay.querySelector('.rs-calendar-month-dropdown-cell-active');

    expect(headerTitle).to.have.text(format(today, 'MMM yyyy'));

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(activeMonth.nextElementSibling);

    expect(headerTitle).to.have.text(format(addMonths(today, 1), 'MMM yyyy'));
  });

  it('Should the calendar date be reset when the controlled value is cleared', () => {
    const ref = React.createRef<PickerHandle>();

    const App = () => {
      const [value, setValue] = React.useState<Date | null>();
      return (
        <DatePicker
          ref={ref as any}
          value={value}
          onChange={setValue}
          format="yyyy-MM-dd HH:mm:ss"
          calendarDefaultDate={new Date('2022-02-02 00:00:00')}
          ranges={[{ label: 'This day', value: new Date('2023-01-01 10:20:30') }]}
        />
      );
    };

    render(<App />);

    fireEvent.click(ref.current?.target as HTMLElement);

    // eslint-disable-next-line testing-library/no-node-access
    const headerDateElement = ref.current?.overlay?.querySelector('.rs-calendar-header-title-date');
    // eslint-disable-next-line testing-library/no-node-access
    const headerTimeElement = ref.current?.overlay?.querySelector('.rs-calendar-header-title-time');

    expect(headerDateElement).to.have.text('Feb 2022');
    expect(headerTimeElement).to.have.text('00:00:00');

    fireEvent.click(screen.getByRole('button', { name: 'This day' }));

    expect(headerDateElement).to.have.text('Jan 2023');
    expect(headerTimeElement).to.have.text('10:20:30');
    expect(ref.current?.target).to.have.text('2023-01-01 10:20:30');

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    fireEvent.click(ref.current?.target as HTMLElement);

    expect(headerDateElement).to.have.text('Feb 2022');
    expect(headerTimeElement).to.have.text('00:00:00');
  });

  it('Should be to not highlight dates that are not in this month', () => {
    render(<DatePicker defaultValue={new Date('2023-04-01')} open />);

    const cells = Array.from(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByRole('grid').querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).map(cell => (cell as HTMLDivElement).innerText);

    expect(cells).to.deep.equal(['26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);
  });

  it('Should display the default month on the calendar based on the defaultValue', () => {
    render(<DatePicker defaultValue={new Date('2023-04-01')} open />);

    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Apr 2023');
  });
});
