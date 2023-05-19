import React from 'react';
import { render, act, fireEvent, waitFor, screen } from '@testing-library/react';
import { getInstance } from '@test/testUtils';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/commonCases';
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
} from '../../utils/dateUtils';
import DateRangePicker from '../DateRangePicker';
import { isSameRange } from '../utils';
import GearIcon from '@rsuite/icons/Gear';

function setTimePickerValue(picker, calendarIndex, { hours, minutes, seconds }) {
  function generateTimeItem(calendarIndex, type, index) {
    return `.rs-calendar[index="${calendarIndex}"] .rs-calendar-time-dropdown ul[data-type="${type}"]>li:nth-child(${index}) .rs-calendar-time-dropdown-cell`;
  }

  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(picker.querySelector(generateTimeItem(calendarIndex, 'hours', hours + 1)));
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(picker.querySelector(generateTimeItem(calendarIndex, 'minutes', minutes + 1)));
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(picker.querySelector(generateTimeItem(calendarIndex, 'seconds', seconds + 1)));
}

afterEach(() => {
  sinon.restore();
});

describe('DateRangePicker', () => {
  testStandardProps(<DateRangePicker />);
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

  it('Should be disabled', () => {
    const { container } = render(<DateRangePicker disabled />);
    expect(container.firstChild).to.have.class('rs-picker-disabled');
  });

  it('Should output custom value', () => {
    render(
      <DateRangePicker
        value={[parseISO('2019-04-01'), parseISO('2019-04-02')]}
        renderValue={value => {
          return `${format(value[0], 'MM/dd/yyyy')}~${format(value[1], 'MM/dd/yyyy')}`;
        }}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('04/01/2019~04/02/2019');
  });

  it('Should output custom value with time', () => {
    const value = [new Date(2019, 10, 11, 1, 0, 0), new Date(2019, 10, 12, 1, 0, 0)] as [
      Date,
      Date
    ];
    const template = 'MM/dd/yyyy hh:mm:ss';
    render(<DateRangePicker value={value} format={template} />);

    expect(screen.getByRole('combobox')).to.have.text('11/11/2019 01:00:00 ~ 11/12/2019 01:00:00');
  });

  it('Should select date time successfully', () => {
    const defaultValue = [new Date(2019, 10, 11, 0, 0, 0), new Date(2019, 11, 11, 0, 0, 0)] as [
      Date,
      Date
    ];
    const template = 'dd MMM yyyy HH:mm:ss';
    const onOkSpy = sinon.spy();

    const instance = getInstance(
      <DateRangePicker defaultValue={defaultValue} format={template} defaultOpen onOk={onOkSpy} />
    );
    const picker = instance.overlay;

    const startTimeToolbar = '.rs-calendar[index="0"] .rs-calendar-header-time-toolbar';
    const endTimeToolbar = '.rs-calendar[index="1"] .rs-calendar-header-time-toolbar';

    // click the left calendar time toolbar, display time selection panel
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(picker.querySelector(startTimeToolbar));

    // select time to 6:6:6
    setTimePickerValue(picker, 0, { hours: 6, minutes: 6, seconds: 6 });

    // close the left calendar time picker panel.
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(picker.querySelector(startTimeToolbar));

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector(startTimeToolbar).textContent, '06:06:06');

    // click the right calendar time toolbar, display time selection panel
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(picker.querySelector(endTimeToolbar));
    // select time to 9:9:9
    setTimePickerValue(picker, 1, { hours: 9, minutes: 9, seconds: 9 });

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(picker.querySelector(endTimeToolbar));

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector(endTimeToolbar).textContent, '09:09:09');

    // press ok button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    assert.ok(
      isSameRange(
        [new Date(2019, 10, 11, 6, 6, 6), new Date(2019, 11, 11, 9, 9, 9)],
        onOkSpy.args[0][0],
        'yyyy-MM-dd HH:mm:ss'
      )
    );

    expect(screen.getByRole('combobox')).to.have.text(
      '11 Nov 2019 06:06:06 ~ 11 Dec 2019 09:09:09'
    );
  });

  it('Should select time successfully', () => {
    const start = new Date(2019, 10, 11, 0, 0, 0);
    // The end calendar default value is after a month from start calendar value
    const end = addMonths(start, 1);
    const template = 'hh:mm:ss';
    const onOkSpy = sinon.spy();

    const instance = getInstance(
      <DateRangePicker defaultValue={[start, end]} format={template} defaultOpen onOk={onOkSpy} />
    );
    const picker = instance.overlay;

    const startTimeToolbar = '.rs-calendar[index="0"] .rs-calendar-header-time-toolbar';
    const endTimeToolbar = '.rs-calendar[index="1"] .rs-calendar-header-time-toolbar';

    // select time to 6:6:6
    setTimePickerValue(picker, 0, { hours: 6, minutes: 6, seconds: 6 });

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector(startTimeToolbar).textContent, '06:06:06');

    // select time to 9:9:9
    setTimePickerValue(picker, 1, { hours: 9, minutes: 9, seconds: 9 });

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(picker.querySelector(endTimeToolbar).textContent, '09:09:09');

    // press ok button
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    assert.ok(
      isSameRange(
        [new Date(2019, 10, 11, 6, 6, 6), new Date(2019, 11, 11, 9, 9, 9)],
        onOkSpy.args[0][0],
        'yyyy-MM-dd HH:mm:ss'
      )
    );
    expect(screen.getByRole('combobox')).to.have.text('06:06:06 ~ 09:09:09');
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} defaultOpen oneTap />);
    // eslint-disable-next-line testing-library/no-node-access
    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    fireEvent.click(today);
    assert.ok(today);
    assert.ok(onChangeSpy.calledOnce);
  });

  it('Should call onClean callback', () => {
    const onCleanSpy = sinon.spy();
    render(<DateRangePicker defaultValue={[new Date(), new Date()]} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    assert.ok(onCleanSpy.calledOnce);
  });

  it('Should call `onOpen` callback', async () => {
    const onOpenSpy = sinon.spy();
    render(<DateRangePicker onOpen={onOpenSpy} />);

    fireEvent.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onOpenSpy).to.calledOnce;
    });
  });

  it('Should call `onOpen` callback', async () => {
    const onOpenSpy = sinon.spy();
    const picker = getInstance(<DateRangePicker onOpen={onOpenSpy} />);

    act(() => {
      picker.open();
    });

    await waitFor(() => {
      expect(onOpenSpy).to.calledOnce;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();
    const picker = getInstance(<DateRangePicker defaultOpen onClose={onClose} />);

    act(() => {
      picker.close();
    });

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should output a button', () => {
    const instance = getInstance(<DateRangePicker toggleAs="button" />);
    assert.ok(instance.target.tagName === 'BUTTON');
  });

  it('Should be block', () => {
    const instance = getInstance(<DateRangePicker block />);
    const root = instance.root;
    assert.ok(root.className.match(/\bblock\b/));
  });

  it('Should have a menuClassName in Menu', () => {
    const menu = getInstance(<DateRangePicker menuClassName="custom" open />).overlay;

    assert.include(menu.className, 'custom');
  });

  it('Should select a date range by clicking starting date and ending date', () => {
    render(<DateRangePicker open value={[new Date('2019-09-10'), new Date('2019-10-10')]} />);

    fireEvent.click(
      screen.getByRole('gridcell', { name: '01 Sep 2019' }).firstChild as HTMLElement
    );

    expect(screen.getByRole('gridcell', { name: '01 Sep 2019', selected: true })).to.exist;

    expect(screen.getByRole('gridcell', { name: '01 Sep 2019', selected: true })).to.exist;

    fireEvent.click(
      screen.getByRole('gridcell', { name: '24 Sep 2019' }).firstChild as HTMLElement
    );

    expect(screen.getByRole('gridcell', { name: '24 Sep 2019', selected: true })).to.exist;
  });

  it('[Deprecated] Should disable shortcuts according to `disabledDate`', () => {
    sinon.spy(console, 'warn');
    const instance = getInstance(
      <DateRangePicker
        ranges={[
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
        ]}
        disabledDate={() => true}
        open
      />
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelectorAll('.rs-picker-toolbar-ranges .rs-btn-disabled')
    ).to.have.lengthOf(4);
    expect(console.warn).to.have.been.calledWith(
      '[rsuite] "disabledDate" property of DateRangePicker component has been deprecated.\nUse "shouldDisableDate" property instead.'
    );
  });

  it('Should disable shortcuts according to `shouldDisableDate`', () => {
    const instance = getInstance(
      <DateRangePicker
        ranges={[
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
        ]}
        shouldDisableDate={() => true}
        open
      />
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelectorAll('.rs-picker-toolbar-ranges .rs-btn-disabled')
    ).to.have.lengthOf(4);
  });

  it('Should select a whole week', () => {
    const onOkSpy = sinon.spy();

    const menu = getInstance(
      <DateRangePicker
        defaultValue={[new Date('08/08/2021'), new Date('08/14/2021')]}
        onOk={onOkSpy}
        hoverRange="week"
        open
      />
    ).overlay;

    const day = menu
      // eslint-disable-next-line testing-library/no-node-access
      ?.querySelectorAll('.rs-calendar-table-row')[1]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('.rs-calendar-table-cell-content');

    fireEvent.click(day);

    fireEvent.click(day);

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(isSameDay(startOfWeek(new Date('08/01/2021')), onOkSpy.firstCall.firstArg[0])).to.be
      .true;
    expect(isSameDay(endOfWeek(new Date('08/07/2021')), onOkSpy.firstCall.firstArg[1])).to.be.true;
  });

  it('Should select a whole month', () => {
    const onOkSpy = sinon.spy();
    const menu = getInstance(<DateRangePicker onOk={onOkSpy} hoverRange="month" open />).overlay;
    // eslint-disable-next-line testing-library/no-node-access
    const today = menu?.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    fireEvent.click(today);

    fireEvent.click(today);

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(isSameDay(startOfMonth(new Date()), onOkSpy.firstCall.firstArg[0])).to.be.true;
    expect(isSameDay(endOfMonth(new Date()), onOkSpy.firstCall.firstArg[1])).to.be.true;
  });

  it('Should select a date range by hover', () => {
    const menu = getInstance(
      <DateRangePicker
        hoverRange="week"
        open
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    ).overlay;

    const startCell = menu
      // eslint-disable-next-line testing-library/no-node-access
      ?.querySelectorAll('.rs-calendar-table-row')[3]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('.rs-calendar-table-cell-content');

    const endCell = menu
      // eslint-disable-next-line testing-library/no-node-access
      ?.querySelectorAll('.rs-calendar-table-row')[4]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('.rs-calendar-table-cell-content');

    fireEvent.click(startCell);

    fireEvent.mouseEnter(endCell);

    // eslint-disable-next-line testing-library/no-node-access
    const allInRangeCells = menu.querySelectorAll(
      '.rs-calendar-table-cell-in-range, .rs-calendar-table-cell-selected-start'
    );

    expect(allInRangeCells[0]).to.text('11');
    expect(allInRangeCells[allInRangeCells.length - 1]).to.text('24');
  });

  it('Should select a date range by click', () => {
    const menu = getInstance(
      <DateRangePicker
        hoverRange="week"
        defaultOpen
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    ).overlay;

    const startCell = menu
      // eslint-disable-next-line testing-library/no-node-access
      ?.querySelectorAll('.rs-calendar-table-row')[3]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('.rs-calendar-table-cell-content');

    const endCell = menu
      // eslint-disable-next-line testing-library/no-node-access
      ?.querySelectorAll('.rs-calendar-table-row')[4]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('.rs-calendar-table-cell-content');

    fireEvent.click(startCell);
    fireEvent.mouseEnter(endCell);
    fireEvent.click(endCell);

    // eslint-disable-next-line testing-library/no-node-access
    const allInRangeCells = menu.querySelectorAll(
      '.rs-calendar-table-cell-in-range, .rs-calendar-table-cell-selected-start'
    );

    expect(allInRangeCells[0]).to.text('11');
    expect(allInRangeCells[allInRangeCells.length - 1]).to.text('24');
  });

  it('Should fire `onChange` if click ok after only select one date in oneTap mode', async () => {
    const onChangeSpy = sinon.spy();
    const menu = getInstance(
      <DateRangePicker onChange={onChangeSpy} hoverRange="week" oneTap defaultOpen />
    ).overlay;

    // eslint-disable-next-line testing-library/no-node-access
    const today = menu.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    fireEvent.click(today);

    expect(onChangeSpy.callCount).to.equal(1);
    expect(isSameDay(startOfWeek(new Date()), onChangeSpy.firstCall.firstArg[0])).to.be.true;
    expect(isSameDay(endOfWeek(new Date()), onChangeSpy.firstCall.firstArg[1])).to.be.true;
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

  it('Should have only one calendar', () => {
    const menu = getInstance(<DateRangePicker showOneCalendar open />).overlay;

    assert.include(
      // eslint-disable-next-line testing-library/no-node-access
      menu.querySelector('.rs-picker-daterange-panel').className,
      'rs-picker-daterange-panel-show-one-calendar'
    );

    expect(screen.getAllByRole('grid')).to.have.lengthOf(1);
  });

  it('Should display the formatted date', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    // eslint-disable-next-line testing-library/no-node-access
    const input = target.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: 2020010120210707 } });

    expect(input.value).to.equal('2020-01-01 ~ 2021-07-07');
  });

  it('Should render an error message', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    // eslint-disable-next-line testing-library/no-node-access
    const input = target.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: 'ssss' } });

    expect(instance.root.className).to.include('rs-picker-error');

    fireEvent.blur(input);

    expect(instance.root.className).to.not.include('rs-picker-error');
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

    expect(screen.getByTitle('30 May 2021')).to.exist;
  });

  it('Should call `onChange` callback when input change and blur', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '0910202009112021' } });
    fireEvent.blur(input);

    expect(onChangeSpy).to.called;
    expect(format(onChangeSpy.firstCall.firstArg[0], 'dd/MM/yyyy')).to.equal('09/10/2020');
    expect(format(onChangeSpy.firstCall.firstArg[1], 'dd/MM/yyyy')).to.equal('09/11/2021');
  });

  it('Should call `onChange` callback when input change and Enter key', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: '0910202009112021' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChangeSpy).to.called;
    expect(format(onChangeSpy.firstCall.firstArg[0], 'dd/MM/yyyy')).to.equal('09/10/2020');
    expect(format(onChangeSpy.firstCall.firstArg[1], 'dd/MM/yyyy')).to.equal('09/11/2021');
  });

  it('Should be show meridian', () => {
    const instance = getInstance(
      <DateRangePicker
        value={[parseISO('2017-08-14 13:00:00'), parseISO('2017-09-14 13:00:00')]}
        format="dd MMM yyyy hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );
    const picker = instance.overlay;

    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-meridian')).to.text('PM');
    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-title-time')).to.text('01:00:00');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      picker.querySelector('.rs-calendar-time-dropdown-column').querySelectorAll('li')
    ).to.length(12);
    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-time-dropdown-column li')).to.text('12');
  });

  it('Should keep AM PM unchanged', () => {
    const instance = getInstance(
      <DateRangePicker
        value={[parseISO('2017-08-14 13:00:00'), parseISO('2017-09-14 13:00:00')]}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );

    const picker = instance.overlay;

    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-title-time')).to.text('01:00:00');

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(picker.querySelector('.rs-calendar-time-dropdown-cell'));

    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-meridian')).to.text('PM');
    // eslint-disable-next-line testing-library/no-node-access
    expect(picker.querySelector('.rs-calendar-header-title-time')).to.text('12:00:00');
  });

  it('Should change AM/PM ', () => {
    const instance = getInstance(
      <DateRangePicker
        value={[parseISO('2017-08-14 13:00:00'), parseISO('2017-09-14 13:00:00')]}
        format="hh:mm:ss a"
        defaultOpen
        showMeridian
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');

    expect(meridian).to.text('PM');

    fireEvent.click(meridian);

    expect(meridian).to.text('AM');
  });

  it('Should be optional for all months', () => {
    const instance = getInstance(<DateRangePicker format="yyyy-MM" defaultOpen />);
    // eslint-disable-next-line testing-library/no-node-access
    const disabledCells = instance.overlay.querySelectorAll(
      '.rs-calendar-month-dropdown-cell.disabled'
    );

    expect(disabledCells).to.length(0);
  });

  it('Should not get warned about deprecated `caretComponent` prop', () => {
    sinon.spy(console, 'warn');

    render(<DateRangePicker />);

    expect(console.warn).not.to.have.been.calledWith(
      sinon.match(/"caretComponent" property of "PickerToggle" has been deprecated/)
    );
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

  it('Should cancel the Ok button disable when the shortcut button is clicked', () => {
    const menu = getInstance(
      <DateRangePicker
        open
        defaultCalendarValue={[parseISO('2022-05-01'), parseISO('2022-06-01')]}
      />
    ).overlay;

    // eslint-disable-next-line testing-library/no-node-access
    const btnDay = menu.querySelector('.rs-calendar-table-cell-content');
    const btnOk = screen.getByRole('button', { name: 'OK' });

    fireEvent.click(btnDay);

    expect(btnOk).to.have.property('disabled', true);

    fireEvent.click(screen.getByRole('button', { name: 'Today' }));

    expect(btnOk).to.have.property('disabled', false);
  });

  it('Should close picker after predefined range is clicked', async () => {
    const onCloseSpy = sinon.spy();
    const onChangeSpy = sinon.spy();

    render(
      <DateRangePicker
        defaultOpen
        ranges={[
          {
            label: 'Yesterday',
            value: [addDays(new Date(), -1), addDays(new Date(), -1)]
          }
        ]}
        onChange={onChangeSpy}
        onExit={onCloseSpy}
      />
    );

    userEvent.click(screen.getByRole('button', { name: 'Yesterday' }));

    await waitFor(() => {
      expect(onCloseSpy).to.calledOnce;
      expect(onChangeSpy).to.calledOnce;
    });
  });

  it('Should not close picker', async () => {
    const onCloseSpy = sinon.spy();
    const onChangeSpy = sinon.spy();
    const yesterday = addDays(new Date(), -1);

    render(
      <DateRangePicker
        defaultOpen
        ranges={[
          {
            label: 'Yesterday',
            value: [yesterday, yesterday],
            closeOverlay: false
          }
        ]}
        onChange={onChangeSpy}
        onExit={onCloseSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Yesterday' }));

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.text(
      `${format(yesterday, 'yyyy-MM-dd')} ~ ${format(yesterday, 'yyyy-MM-dd')}`
    );

    await waitFor(() => {
      expect(onChangeSpy).to.not.called;
      expect(onCloseSpy).to.not.called;
    });
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    render(<DateRangePicker onFocus={onFocusSpy} />);
    // eslint-disable-next-line testing-library/no-node-access
    const input = screen.getByRole('combobox').querySelector('input') as HTMLInputElement;

    fireEvent.focus(input);

    expect(onFocusSpy).to.have.been.calledOnce;
  });

  it('Should render ranges on the left', () => {
    const onCloseSpy = sinon.spy();
    const onChangeSpy = sinon.spy();
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
        onChange={onChangeSpy}
        onExit={onCloseSpy}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('dialog').querySelector('.rs-picker-daterange-predefined')).to.contain(
      screen.getByRole('button', { name: 'Yesterday' })
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('dialog').querySelector('.rs-picker-toolbar-ranges button')).to.not
      .exist;
  });

  it('Should be controllable for keyboard input', () => {
    render(
      <>
        <DateRangePicker data-testid="picker-1" />
        <DateRangePicker data-testid="picker-2" editable={false} />
      </>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const picker1 = screen.getByTestId('picker-1').querySelector('input') as HTMLElement;
    // eslint-disable-next-line testing-library/no-node-access
    const picker2 = screen.getByTestId('picker-2').querySelector('input') as HTMLElement;

    expect(picker1).to.have.attribute('readonly');
    expect(picker2).to.have.attribute('readonly');

    fireEvent.focus(picker1);
    expect(picker1).to.not.have.attribute('readonly');

    fireEvent.focus(picker2);
    expect(picker2).to.have.attribute('readonly');
  });

  it('Should not render the ranges element', () => {
    render(<DateRangePicker open ranges={[]} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('dialog').querySelector('.rs-picker-toolbar-ranges')).to.not.exist;
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('dialog').querySelector('.rs-picker-daterange-predefined')).to.not
      .exist;

    // A flex layout toolbar should render two children so that the ok button appears on the right
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      (screen.getByRole('dialog').querySelector('.rs-picker-toolbar') as HTMLElement).childNodes
    ).to.have.length(2);
  });
  describe('Issue #3074', () => {
    it('Should focus on the right month', () => {
      const onEnterSpy = sinon.spy();
      const { rerender } = render(
        <DateRangePicker value={[new Date(), new Date()]} onEnter={onEnterSpy} />
      );

      rerender(
        <DateRangePicker
          value={[new Date(2022, 10, 1), new Date(2022, 11, 1)]}
          onEnter={onEnterSpy}
        />
      );

      fireEvent.click(screen.getByRole('combobox'));

      const dialog = screen.getByRole('dialog');

      expect(onEnterSpy).to.have.been.calledOnce;

      const firstMonthPanelTitle =
        '.rs-calendar[index="0"] .rs-calendar-header-month-toolbar .rs-calendar-header-title';
      const secondMonthPanelTitle =
        '.rs-calendar[index="1"] .rs-calendar-header-month-toolbar .rs-calendar-header-title';

      // eslint-disable-next-line testing-library/no-node-access
      expect(dialog.querySelector(firstMonthPanelTitle)).to.have.text('Nov 2022');
      // eslint-disable-next-line testing-library/no-node-access
      expect(dialog.querySelector(secondMonthPanelTitle)).to.have.text('Dec 2022');
    });
  });

  describe('Plain text', () => {
    it('Should render formatted date range', () => {
      render(
        <div data-testid="content">
          <DateRangePicker
            value={[new Date(2019, 3, 1), new Date(2019, 3, 2)]}
            format="MM/dd/yyyy"
            plaintext
          />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('04/01/2019 ~ 04/02/2019');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          <DateRangePicker value={null} format="MM/dd/yyyy" plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });
  });

  describe('Time stability', () => {
    it('Should the end time not change when the start date is clicked when defaultCalendarValue is set', () => {
      const onSelectSpy = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelectSpy}
          defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(
        screen.getByRole('gridcell', { name: '07 Feb 2022' }).firstChild as HTMLElement
      );

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(
        screen.getByRole('gridcell', { name: '10 Feb 2022' }).firstChild as HTMLElement
      );

      expect(onSelectSpy).to.have.been.calledTwice;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.have.text(
        '2022-02-07 00:00:00 ~ 2022-02-10 23:59:59'
      );
    });

    it('Should the end time not change when the start date is clicked when controlled', () => {
      const onSelectSpy = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelectSpy}
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(
        screen.getByRole('gridcell', { name: '07 Feb 2022' }).firstChild as HTMLElement
      );

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(
        screen.getByRole('gridcell', { name: '10 Feb 2022' }).firstChild as HTMLElement
      );

      expect(onSelectSpy).to.have.been.calledTwice;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.have.text(
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

      const headerDateTitles = screen
        .getByRole('dialog')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelectorAll('.rs-calendar-header-title-date');
      const handerTimeTitles = screen
        .getByRole('dialog')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelectorAll('.rs-calendar-header-title-time');
      const firstCalendarForwardButton = screen
        .getByRole('dialog')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelectorAll('.rs-calendar-header-forward')[0];

      const secondCalendarBackwardButton = screen
        .getByRole('dialog')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelectorAll('.rs-calendar-header-backward')[1];

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
      const onSelectSpy = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelectSpy}
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(
        screen.getByRole('gridcell', { name: '20 Mar 2022' }).firstChild as HTMLElement
      );

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(
        screen.getByRole('gridcell', { name: '21 Apr 2022' }).firstChild as HTMLElement
      );

      expect(onSelectSpy).to.have.been.calledTwice;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.have.text(
        '2022-03-20 00:00:00 ~ 2022-04-21 23:59:59'
      );
    });

    it('Should render the default datetime after clicking the clear button', () => {
      const onCleanSpy = sinon.spy();
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onClean={onCleanSpy}
          defaultValue={[new Date('2022-02-01 01:01:01'), new Date('2022-03-01 02:02:02')]}
          defaultCalendarValue={[new Date('2022-04-04 00:00:00'), new Date('2022-05-05 23:59:59')]}
        />
      );

      expect(screen.getByRole('button', { name: '01:01:01' })).to.be.visible;
      expect(screen.getByRole('button', { name: '02:02:02' })).to.be.visible;

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onCleanSpy).to.have.been.calledOnce;
      expect(screen.getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(screen.getByRole('button', { name: '23:59:59' })).to.be.visible;
    });

    it('Should switch time from PM to AM', () => {
      render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          showMeridian
          value={[new Date('2022-02-01 13:00:00'), new Date('2022-03-01 14:00:00')]}
        />
      );

      // eslint-disable-next-line testing-library/no-node-access
      const header = screen.getByRole('dialog').querySelector('.rs-picker-daterange-header');
      const switchButtons = screen
        .getByRole('dialog')
        // eslint-disable-next-line testing-library/no-node-access
        .querySelectorAll('.rs-calendar-header-meridian');

      expect(header).to.have.text('2022-02-01 13:00:00 ~ 2022-03-01 14:00:00');
      expect(switchButtons[0]).to.have.text('PM');
      expect(switchButtons[1]).to.have.text('PM');

      fireEvent.click(switchButtons[0]);

      expect(header).to.have.text('2022-02-01 01:00:00 ~ 2022-03-01 14:00:00');
      expect(switchButtons[0]).to.have.text('AM');

      fireEvent.click(switchButtons[1]);

      expect(header).to.have.text('2022-02-01 01:00:00 ~ 2022-03-01 02:00:00');
      expect(switchButtons[1]).to.have.text('AM');
    });
  });

  it('Should be disable time when date selection is in progress', () => {
    render(
      <DateRangePicker
        format="yyyy-MM-dd hh:mm aa"
        showMeridian
        open
        defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
      />
    );

    const startCell = screen.getByRole('gridcell', { name: '01 Feb 2022' })
      .firstChild as HTMLButtonElement;
    const endCell = screen.getByRole('gridcell', { name: '02 Feb 2022' })
      .firstChild as HTMLButtonElement;
    const btnAM = screen.getByRole('button', { name: 'AM' });
    const btnPM = screen.getByRole('button', { name: 'PM' });
    const btnAMTime = screen.getByRole('button', { name: '12:00' });
    const btnPMTime = screen.getByRole('button', { name: '11:59' });

    expect(btnAM).to.not.have.attribute('disabled');
    expect(btnPM).to.not.have.attribute('disabled');
    expect(btnAMTime).to.not.have.attribute('disabled');
    expect(btnPMTime).to.not.have.attribute('disabled');

    fireEvent.click(startCell);

    expect(btnAM).to.have.attribute('disabled');
    expect(btnPM).to.have.attribute('disabled');
    expect(btnAMTime).to.have.attribute('disabled');
    expect(btnPMTime).to.have.attribute('disabled');

    fireEvent.click(endCell);

    expect(btnAM).to.not.have.attribute('disabled');
    expect(btnPM).to.not.have.attribute('disabled');
    expect(btnAMTime).to.not.have.attribute('disabled');
    expect(btnPMTime).to.not.have.attribute('disabled');
  });

  it('Should be to not highlight dates that are not in this month', () => {
    render(
      <DateRangePicker defaultValue={[new Date('2023-04-01'), new Date('2023-05-01')]} open />
    );

    const cells = Array.from(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getAllByRole('grid')[0].querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).map(cell => (cell as HTMLDivElement).innerText);

    expect(cells).to.deep.equal(['26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']);

    const endCells = Array.from(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getAllByRole('grid')[1].querySelectorAll('.rs-calendar-table-cell-un-same-month')
    ).map(cell => (cell as HTMLDivElement).innerText);

    expect(endCells).to.deep.equal(['30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });
});
