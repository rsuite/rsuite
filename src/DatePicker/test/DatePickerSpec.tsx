import React from 'react';
import { render, fireEvent, act, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import enGB from 'date-fns/locale/en-GB';
import ReactTestUtils from 'react-dom/test-utils';
import { format, isSameDay, parseISO, addMonths, isBefore } from '../../utils/dateUtils';
import { getDOMNode, getInstance } from '@test/testUtils';
import DatePicker from '../DatePicker';
import { DateUtils } from '../../utils';

import GearIcon from '@rsuite/icons/Gear';
import { PickerHandle } from '../../Picker';

afterEach(() => {
  sinon.restore();
});

describe('DatePicker', () => {
  it('Should render a div with "rs-picker-date" class', () => {
    const instance = getDOMNode(<DatePicker />);
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-date\b/));
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<DatePicker />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should be cleanable by default', () => {
    const instance = getDOMNode(<DatePicker value={new Date()} />);

    expect(instance).to.have.class('rs-picker-cleanable');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DatePicker disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be not cleanable', () => {
    const instance = getDOMNode(<DatePicker cleanable={false} value={new Date()} />);
    assert.ok(!instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<DatePicker toggleAs="button" />);
    assert.equal((instance.querySelector('[role="combobox"]') as HTMLElement).tagName, 'BUTTON');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<DatePicker block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a date', () => {
    const instance = getDOMNode(<DatePicker defaultValue={parseISO('2017-08-14')} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      '2017-08-14'
    );
  });

  it('Should output custom value', () => {
    const instance = getDOMNode(
      <DatePicker
        value={parseISO('2017-08-14')}
        renderValue={value => {
          return format(value, 'MM/dd/yyyy');
        }}
      />
    );

    assert.equal(
      (instance.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      '08/14/2017'
    );
  });

  it('Should output a date', () => {
    const instance = getDOMNode(<DatePicker value={parseISO('2017-08-14')} />);
    assert.equal(
      (instance.querySelector('.rs-picker-toggle-value') as HTMLElement).textContent,
      '2017-08-14'
    );
  });

  it('Should open a dialog containing grid view of dates in a month', () => {
    const { getByRole } = render(<DatePicker defaultOpen />);
    expect(getByRole('dialog')).to.be.visible.and.to.contain(getByRole('grid'));
  });

  it('Should be possible to specify initial month with `calendarDefaultDate`', () => {
    const date = new Date('12/15/2021');
    const { getByRole } = render(<DatePicker defaultOpen calendarDefaultDate={date} />);

    // Dec 2021
    const month = DateUtils.format(date, 'MMM yyyy', { locale: enGB });

    expect(getByRole('grid', { name: month })).to.exist;

    Array.from({ length: 31 }).forEach((_, index) => {
      expect(getByRole('grid', { name: month })).to.contain(
        getByRole('gridcell', {
          name: DateUtils.format(new Date(`12/${index + 1}/2021`), 'dd MMM yyyy', { locale: enGB })
        })
      );
    });
  });

  it('Should update value to be `null` when "clear" button is clicked', () => {
    const onChangeSpy = sinon.spy();
    const { getByRole } = render(
      <DatePicker value={new Date(2021, 0, 4)} onChange={onChangeSpy} cleanable />
    );

    fireEvent.click(getByRole('button', { name: /clear/i }));

    expect(onChangeSpy).to.have.been.calledWith(null);
  });

  it('Should get panel container ref', function () {
    const instance = getDOMNode(<DatePicker defaultOpen />);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<DatePicker onChange={onChangeSpy} defaultOpen />);

    fireEvent.click(instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn'));

    expect(onChangeSpy).to.calledOnce;
  });

  it('Should call `onChange` callback when click shortcut', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} defaultOpen />);
    const today = instance.overlay.querySelector('.rs-picker-toolbar button');

    fireEvent.click(today);

    expect(onChangeSpy).to.calledOnce;
    expect(isSameDay(onChangeSpy.firstCall.firstArg, new Date())).to.true;
  });

  it('Should call `onChange` callback when input change and blur', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      fireEvent.change(input, { target: { value: '01102021' } });
    });

    act(() => {
      fireEvent.blur(input);
    });

    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(format(onChangeSpy.firstCall.firstArg, 'dd/MM/yyyy'), '01/10/2021');
  });

  it('Should call `onChange` callback when input change and Enter key', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      fireEvent.change(input, { target: { value: '01/10/2021' } });
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    expect(onChangeSpy).to.calledOnce;
    expect(format(onChangeSpy.firstCall.firstArg, 'dd/MM/yyyy')).to.equal('01/10/2021');
  });

  it('Should be prompted for an error date', () => {
    const instance = getInstance(<DatePicker />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(instance.root.querySelector('.rs-picker-error')).to.exist;
  });

  it('Should be prompted for an error date by isValid', () => {
    const instance = getInstance(<DatePicker />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '2021-00-00' } });

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
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '2021-10-02' } });

    assert.isNull(instance.root.querySelector('.rs-picker-error'));

    fireEvent.change(input, { target: { value: '2021-10-01' } });

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
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      fireEvent.change(input, { target: { value: '10:00:00' } });
    });

    act(() => {
      fireEvent.blur(input);
    });

    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').textContent, '10:00:00');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const { getByRole } = render(<DatePicker defaultValue={new Date()} onClean={onCleanSpy} />);

    fireEvent.click(getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should remain active after clearing the value', () => {
    const onCleanSpy = sinon.spy();
    const { getByRole } = render(<DatePicker defaultValue={new Date()} onClean={onCleanSpy} />);

    fireEvent.focus(getByRole('combobox'));
    fireEvent.click(getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
    expect(getByRole('combobox')).to.have.class('rs-picker-toggle-active');
  });

  it('Should call `onSelect` callback', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(<DatePicker onSelect={onSelectSpy} defaultOpen />);
    fireEvent.click(
      instance.overlay.querySelector(
        '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
      )
    );
    expect(onSelectSpy).to.calledOnce;
  });

  it('Should call `onOk` callback', () => {
    const onOkSpy = sinon.spy();
    const instance = getInstance(<DatePicker onOk={onOkSpy} defaultOpen />);
    fireEvent.click(instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn'));

    expect(onOkSpy).to.calledOnce;
  });

  it('Should call `onNextMonth` callback', () => {
    const onNextMonthSpy = sinon.spy();
    const instance = getInstance(<DatePicker onNextMonth={onNextMonthSpy} defaultOpen />);
    fireEvent.click(instance.overlay.querySelector('.rs-calendar-header-forward'));

    expect(onNextMonthSpy).to.calledOnce;
  });

  it('Should call `onPrevMonth` callback', () => {
    const onPrevMonthSpy = sinon.spy();
    const instance = getInstance(<DatePicker onPrevMonth={onPrevMonthSpy} defaultOpen />);
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

    const month = instance.overlay.querySelector('.rs-calendar-header-title-date');

    act(() => {
      fireEvent.click(month);
    });

    assert.isNotNull(instance.overlay.querySelector('.rs-calendar-month-dropdown.show'));
    assert.isTrue(onToggleMonthDropdownSpy.calledOnce);

    act(() => {
      fireEvent.click(month);
    });

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
    const time = instance.overlay.querySelector('.rs-calendar-header-title-time');

    act(() => {
      fireEvent.click(time);
    });

    assert.isNotNull(instance.overlay.querySelector('.rs-calendar-time-view'));
    assert.isTrue(onToggleTimeDropdownSpy.calledOnce);

    act(() => {
      fireEvent.click(time);
    });

    expect(instance.overlay.querySelector('.rs-calendar-time-view')).to.not.exist;
    expect(onToggleTimeDropdownSpy).to.calledTwice;
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DatePicker className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DatePicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should call `onChangeCalendarDate` callback when click backward', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-backward'));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click forward', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );
    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-calendar-header-forward'));

    expect(onChangeCalendarDate).to.have.been.calledOnce;
  });

  it('Should call `onChangeCalendarDate` callback when click today ', () => {
    const onChangeCalendarDate = sinon.spy();

    const instance = getInstance(
      <DatePicker onChangeCalendarDate={onChangeCalendarDate} defaultOpen />
    );
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
      const title = instance.overlay.querySelector('.rs-calendar-header-title-date');
      ReactTestUtils.Simulate.click(title);
    });

    act(() => {
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
      document.querySelector(
        '.rs-calendar-month-dropdown-cell-active .rs-calendar-month-dropdown-cell-content'
      )
    ).not.to.have.class('disabled');
    expect(screen.getByRole('button', { name: 'OK' })).to.have.property('disabled', false);
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();

    const instance = getDOMNode(<DatePicker onOpen={onOpen} />);
    ReactTestUtils.Simulate.click(instance.querySelector('[role="combobox"]') as HTMLElement);

    await waitFor(() => {
      expect(onOpen).to.have.been.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();

    const instance = getInstance(<DatePicker onClose={onClose} defaultOpen />);
    ReactTestUtils.Simulate.click(
      instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn')
    );
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

    const allCells = instance.overlay.querySelectorAll(
      '.rs-calendar-table-cell .rs-calendar-table-cell-content'
    );

    fireEvent.click(allCells[allCells.length - 1]);
    fireEvent.click(instance.overlay.querySelector('.rs-picker-toolbar-right .rs-btn'));

    expect(onChange).to.have.been.calledOnce;
    expect(instance.target.querySelector('.rs-picker-toggle-value')).to.have.text('2018-01-05');
  });

  it('Should call onBlur callback', async () => {
    const onBlurSpy = sinon.spy();
    const { getByRole } = render(<DatePicker onBlur={onBlurSpy} />);

    fireEvent.blur(getByRole('combobox'));

    await waitFor(() => {
      expect(onBlurSpy).to.have.been.calledOnce;
      expect(getByRole('combobox')).to.not.have.class('rs-picker-toggle-active');
    });
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    const { getByRole } = render(<DatePicker onFocus={onFocusSpy} defaultValue={new Date()} />);
    const input = getByRole('combobox').querySelector('input') as HTMLInputElement;

    fireEvent.focus(input);

    expect(onFocusSpy).to.have.been.calledOnce;
    expect(getByRole('combobox')).to.have.class('rs-picker-toggle-active');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DatePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onChange after setting oneTap and clicking date', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DatePicker onChange={onChangeSpy} oneTap defaultOpen />);

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

    assert.equal(picker.querySelector('.rs-calendar-header-meridian').textContent, 'PM');
    assert.equal(picker.querySelector('.rs-calendar-header-title-time').textContent, '01:00:00');
    assert.equal(
      picker.querySelector('.rs-calendar-time-dropdown-column').querySelectorAll('li').length,
      12
    );
    assert.equal(picker.querySelector('.rs-calendar-time-dropdown-column li').textContent, '12');
  });

  it('Should show dates that are not in the same month', () => {
    const instance = getInstance(<DatePicker value={new Date('6/10/2021')} open />);
    const picker = instance.overlay;
    const days = picker.querySelectorAll('.rs-calendar-table-cell-un-same-month');

    assert.equal(days[0].textContent, '30');
    assert.equal(days[1].textContent, '31');
    assert.equal(days[2].textContent, '1');
  });

  it('Should accept controlled value', () => {
    const { getByRole } = render(<DatePicker value={new Date('7/11/2021')} open />);

    expect(getByRole('combobox')).to.have.text('2021-07-11');
    expect(getByRole('grid', { name: 'Jul 2021' })).to.contain(
      getByRole('gridcell', { name: '11 Jul 2021', selected: true })
    );
  });

  it('Should be a controlled value, null is allowed', () => {
    type AppInstance = {
      picker: PickerHandle;
      setDate: (newDate: Date | null) => void;
    };
    const instanceRef = React.createRef();
    const App = React.forwardRef((_props, ref) => {
      const [value, setValue] = React.useState(new Date('6/10/2021'));
      const pickerRef = React.useRef<PickerHandle>(null);
      React.useImperativeHandle(ref, () => ({
        picker: pickerRef.current,
        setDate: date => {
          setValue(date);
        }
      }));
      return <DatePicker value={value} open ref={pickerRef as any} format="yyyy-MM-dd" />;
    });

    render(<App ref={instanceRef} />);

    const picker = (instanceRef.current as AppInstance).picker.root as HTMLElement;

    expect(picker.querySelector('.rs-picker-toggle-value')).to.have.text('2021-06-10');

    act(() => {
      (instanceRef.current as AppInstance).setDate(null);
    });

    expect(picker.querySelector('.rs-picker-toggle-placeholder')).to.have.text('yyyy-MM-dd');
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

    expect(picker.querySelector('.rs-calendar-header-title-time')).to.have.text('01:00:00');

    fireEvent.click(picker.querySelector('.rs-calendar-time-dropdown-cell'));

    expect(picker.querySelector('.rs-calendar-header-meridian')).to.have.text('PM');
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

    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');

    expect(meridian).to.have.text('PM');

    act(() => {
      fireEvent.click(meridian);
    });

    expect(meridian).to.have.text('AM');
  });

  it('Should render week numbers given `showWeekNumbers=true`', () => {
    const { getByRole } = render(
      <DatePicker defaultOpen calendarDefaultDate={new Date('12/15/2021')} showWeekNumbers />
    );

    [49, 50, 51, 52, 1, 2].forEach(weekOrder => {
      expect(getByRole('grid', { name: 'Dec 2021' })).to.contain(
        getByRole('rowheader', {
          name: `${weekOrder}`
        })
      );
    });
  });

  describe('Plain text', () => {
    it('Should render formatted date', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <DatePicker value={new Date(2019, 3, 1)} format="MM/dd/yyyy" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('04/01/2019');
    });

    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <DatePicker value={null} format="MM/dd/yyyy" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });

    it('Should render a custom caret', () => {
      const { getByLabelText } = render(<DatePicker caretAs={GearIcon} />);

      expect(getByLabelText('gear')).to.have.class('rs-icon');
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
    expect(document.activeElement).to.value('2022-01-01');

    userEvent.tab();
    expect(document.activeElement).to.value('2022-01-02');

    userEvent.tab({ shift: true });
    expect(document.activeElement).to.value('2022-01-01');
  });

  it('Should reset to default time after clicking clear button', () => {
    const onChangeSpy = sinon.spy();
    const { getByRole } = render(
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

    userEvent.click(getByRole('button', { name: 'custom-day' }));

    expect(isSameDay(onChangeSpy.getCall(0).args[0], new Date('2022-02-02'))).to.be.true;
    expect(getByRole('button', { name: '12:00:00' })).to.exist;

    userEvent.click(getByRole('button', { name: /clear/i }));

    expect(onChangeSpy).to.have.been.calledWith(null);
    expect(getByRole('button', { name: '00:00:00' })).to.exist;
  });

  it('Should render range buttons for bottom and left placements', () => {
    const onChangeSpy = sinon.spy();
    const { getByRole } = render(
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

    expect(getByRole('button', { name: 'Left Placement' })).to.exist;
    expect(getByRole('button', { name: 'Bottom Placement' })).to.exist;
    expect(getByRole('button', { name: 'Default Placement' })).to.exist;
  });

  it('Should be controllable for keyboard input', () => {
    const { getByTestId } = render(
      <>
        <DatePicker data-testid="picker-1" />
        <DatePicker data-testid="picker-2" editable={false} />
      </>
    );

    const picker1 = getByTestId('picker-1').querySelector('input') as HTMLInputElement;
    const picker2 = getByTestId('picker-2').querySelector('input') as HTMLInputElement;

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

    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');

    expect(meridian).to.have.text('PM');

    act(() => {
      fireEvent.click(meridian);
    });

    expect(meridian).to.have.text('AM');
    expect(onSelectSpy).to.have.been.calledWith(new Date('2017-08-14 01:00:00'));
  });

  it('Should change calendar title after clicking on the month', () => {
    const instance = getInstance(<DatePicker format="yyyy-MM" />);
    const today = new Date();

    fireEvent.click(instance.target);

    const headerTitle = instance.overlay.querySelector('.rs-calendar-header-title');
    const activeMonth = instance.overlay.querySelector('.rs-calendar-month-dropdown-cell-active');

    expect(headerTitle).to.have.text(format(today, 'MMM yyyy'));

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

    const headerDateElement = ref.current?.overlay?.querySelector('.rs-calendar-header-title-date');
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
      screen.getByRole('grid').querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).map(cell => (cell as HTMLDivElement).innerText);

    expect(cells).to.deep.equal(['26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);
  });
});
