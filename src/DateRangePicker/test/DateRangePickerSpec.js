import { getDOMNode, getInstance } from '@test/testUtils';
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  act(() => {
    fireEvent.click(picker.querySelector(generateTimeItem(calendarIndex, 'hours', hours + 1)));
  });
  act(() => {
    fireEvent.click(picker.querySelector(generateTimeItem(calendarIndex, 'minutes', minutes + 1)));
  });
  act(() => {
    fireEvent.click(picker.querySelector(generateTimeItem(calendarIndex, 'seconds', seconds + 1)));
  });
}

afterEach(() => {
  sinon.restore();
});

describe('DateRangePicker', () => {
  it('Should render a div with "rs-picker-daterange" class', () => {
    const instance = getDOMNode(<DateRangePicker />);

    assert.equal(instance.tagName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-daterange\b/));
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<DateRangePicker />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should be cleanable by default', () => {
    const instance = getDOMNode(<DateRangePicker value={[new Date(), new Date()]} />);

    expect(instance).to.have.class('rs-picker-cleanable');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DateRangePicker disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be disabled date', () => {
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

    assert.equal(
      instance.overlay.querySelectorAll('.rs-picker-toolbar-ranges .rs-btn-disabled').length,
      4
    );
  });

  it('Should output custom value', () => {
    const instance = getInstance(
      <DateRangePicker
        value={[parseISO('2019-04-01'), parseISO('2019-04-02')]}
        renderValue={value => {
          return `${format(value[0], 'MM/dd/yyyy')}~${format(value[1], 'MM/dd/yyyy')}`;
        }}
      />
    );

    assert.equal(
      instance.target.querySelector('.rs-picker-toggle-value').textContent,
      '04/01/2019~04/02/2019'
    );
  });

  it('Should output custom value with time', () => {
    const value = [new Date(2019, 10, 11, 1, 0, 0), new Date(2019, 10, 12, 1, 0, 0)];
    const template = 'MM/dd/yyyy hh:mm:ss';
    const instance = getInstance(<DateRangePicker value={value} format={template} />);

    assert.equal(
      instance.target.querySelector('.rs-picker-toggle-value').textContent,
      '11/11/2019 01:00:00 ~ 11/12/2019 01:00:00'
    );
  });

  it('Should select date time successfully', () => {
    const defaultValue = [new Date(2019, 10, 11, 0, 0, 0), new Date(2019, 11, 11, 0, 0, 0)];
    const template = 'dd MMM yyyy HH:mm:ss';
    const onOkSpy = sinon.spy();

    const instance = getInstance(
      <DateRangePicker defaultValue={defaultValue} format={template} defaultOpen onOk={onOkSpy} />
    );
    const picker = instance.overlay;

    const startTimeToolbar = '.rs-calendar[index="0"] .rs-calendar-header-time-toolbar';
    const endTimeToolbar = '.rs-calendar[index="1"] .rs-calendar-header-time-toolbar';

    act(() => {
      // click the left calendar time toolbar, display time selection panel
      fireEvent.click(picker.querySelector(startTimeToolbar));
    });

    // select time to 6:6:6
    setTimePickerValue(picker, 0, { hours: 6, minutes: 6, seconds: 6 });

    act(() => {
      // close the left calendar time picker panel.
      fireEvent.click(picker.querySelector(startTimeToolbar));
    });

    assert.equal(picker.querySelector(startTimeToolbar).textContent, '06:06:06');

    act(() => {
      // click the right calendar time toolbar, display time selection panel
      fireEvent.click(picker.querySelector(endTimeToolbar));
    });
    // select time to 9:9:9
    setTimePickerValue(picker, 1, { hours: 9, minutes: 9, seconds: 9 });

    act(() => {
      fireEvent.click(picker.querySelector(endTimeToolbar));
    });

    assert.equal(picker.querySelector(endTimeToolbar).textContent, '09:09:09');

    act(() => {
      // press ok button
      fireEvent.click(picker.querySelector('.rs-picker-toolbar-right .rs-btn'));
    });

    assert.ok(
      isSameRange(
        [new Date(2019, 10, 11, 6, 6, 6), new Date(2019, 11, 11, 9, 9, 9)],
        onOkSpy.args[0][0]
      )
    );
    assert.equal(
      instance.target.querySelector('.rs-picker-toggle-value').textContent,
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

    assert.equal(picker.querySelector(startTimeToolbar).textContent, '06:06:06');

    // select time to 9:9:9
    setTimePickerValue(picker, 1, { hours: 9, minutes: 9, seconds: 9 });

    assert.equal(picker.querySelector(endTimeToolbar).textContent, '09:09:09');

    act(() => {
      // press ok button
      fireEvent.click(picker.querySelector('.rs-picker-toolbar-right .rs-btn'));
    });

    assert.ok(
      isSameRange(
        [new Date(2019, 10, 11, 6, 6, 6), new Date(2019, 11, 11, 9, 9, 9)],
        onOkSpy.args[0][0]
      )
    );
    assert.equal(
      instance.target.querySelector('.rs-picker-toggle-value').textContent,
      '06:06:06 ~ 09:09:09'
    );
  });

  it('Should call `onChange` callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} defaultOpen oneTap />);
    const today = instance.overlay.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    fireEvent.click(today);
    assert.ok(today);
    assert.ok(onChangeSpy.calledOnce);
  });

  it('Should call onClean callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(
      <DateRangePicker defaultValue={[new Date(), new Date()]} onClean={onCleanSpy} />
    );

    fireEvent.click(instance.root.querySelector('.rs-picker-toggle-clean'));
    assert.ok(onCleanSpy.calledOnce);
  });

  it('Should call `onOpen` callback', async () => {
    const onOpenSpy = sinon.spy();
    const instance = getDOMNode(<DateRangePicker onOpen={onOpenSpy} />);

    act(() => {
      fireEvent.click(instance.querySelector('.rs-picker-toggle'));
    });

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

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<DateRangePicker defaultOpen onClose={doneOp} />);
    picker.close();
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

  it('Should have a custom className', () => {
    const root = getInstance(<DateRangePicker className="custom" />).root;
    assert.include(root.className, 'custom');
  });

  it('Should have a menuClassName in Menu', () => {
    const menu = getInstance(<DateRangePicker menuClassName="custom" open />).overlay;

    assert.include(menu.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';

    const root = getInstance(<DateRangePicker style={{ fontSize }} />).root;
    assert.equal(root.style.fontSize, fontSize);
  });

  it('Should select a date range by clicking starting date and ending date', () => {
    const { getByRole } = render(
      <DateRangePicker open value={[new Date('2019-09-10'), new Date('2019-10-10')]} />
    );

    act(() => {
      fireEvent.click(getByRole('gridcell', { name: '01 Sep 2019' }).firstChild);
    });

    expect(getByRole('gridcell', { name: '01 Sep 2019', selected: true })).to.exist;

    act(() => {
      fireEvent.click(getByRole('gridcell', { name: '24 Sep 2019' }).firstChild);
    });

    expect(getByRole('gridcell', { name: '24 Sep 2019', selected: true })).to.exist;
  });

  it('Should be disabled date', () => {
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
      instance.overlay.querySelectorAll('.rs-picker-toolbar-ranges .rs-btn-disabled')
    ).to.length(4);
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
      ?.querySelectorAll('.rs-calendar-table-row')[1]
      .querySelector('.rs-calendar-table-cell-content');

    act(() => {
      fireEvent.click(day);
    });

    act(() => {
      fireEvent.click(day);
    });

    act(() => {
      fireEvent.click(menu.querySelector('.rs-picker-toolbar-right .rs-btn'));
    });

    expect(isSameDay(startOfWeek(new Date('08/01/2021')), onOkSpy.firstCall.firstArg[0])).to.be
      .true;
    expect(isSameDay(endOfWeek(new Date('08/07/2021')), onOkSpy.firstCall.firstArg[1])).to.be.true;
  });

  it('Should select a whole month', () => {
    const onOkSpy = sinon.spy();
    const menu = getInstance(<DateRangePicker onOk={onOkSpy} hoverRange="month" open />).overlay;
    const today = menu?.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    act(() => {
      fireEvent.click(today);
    });

    act(() => {
      fireEvent.click(today);
    });

    act(() => {
      fireEvent.click(menu.querySelector('.rs-picker-toolbar-right .rs-btn'));
    });

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
      ?.querySelectorAll('.rs-calendar-table-row')[3]
      .querySelector('.rs-calendar-table-cell-content');

    const endCell = menu
      ?.querySelectorAll('.rs-calendar-table-row')[4]
      .querySelector('.rs-calendar-table-cell-content');

    act(() => {
      fireEvent.click(startCell);
    });

    act(() => {
      fireEvent.mouseEnter(endCell);
    });

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
      ?.querySelectorAll('.rs-calendar-table-row')[3]
      .querySelector('.rs-calendar-table-cell-content');

    const endCell = menu
      ?.querySelectorAll('.rs-calendar-table-row')[4]
      .querySelector('.rs-calendar-table-cell-content');

    act(() => {
      fireEvent.click(startCell);
    });
    act(() => {
      fireEvent.mouseEnter(endCell);
    });
    act(() => {
      fireEvent.click(endCell);
    });

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

    const today = menu.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    act(() => {
      fireEvent.click(today);
    });

    expect(onChangeSpy.callCount).to.equal(1);
    expect(isSameDay(startOfWeek(new Date()), onChangeSpy.firstCall.firstArg[0])).to.be.true;
    expect(isSameDay(endOfWeek(new Date()), onChangeSpy.firstCall.firstArg[1])).to.be.true;
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DateRangePicker classPrefix="custom-prefix" />);
    expect(instance.className).to.contain('custom-prefix');
  });

  it('Should show default calendar value', () => {
    const menu = getInstance(
      <DateRangePicker
        open
        defaultCalendarValue={[parseISO('2019-01-01'), parseISO('2019-09-01')]}
      />
    ).overlay;

    expect(menu.querySelector('div[title="01 Feb 2019"]')).to.exist;
    expect(menu.querySelector('div[title="01 Sep 2019"]')).to.exist;
  });

  it('Should have only one calendar', () => {
    const menu = getInstance(<DateRangePicker showOneCalendar open />).overlay;

    assert.include(
      menu.querySelector('.rs-picker-daterange-panel').className,
      'rs-picker-daterange-panel-show-one-calendar'
    );

    expect(menu.querySelectorAll('.rs-picker-daterange-calendar-single')).to.length(1);
  });

  it('Should display the formatted date', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    const input = target.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      fireEvent.change(input, { target: { value: 2020010120210707 } });
    });

    expect(input.value).to.equal('2020-01-01 ~ 2021-07-07');
  });

  it('Should render an error message', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    const input = target.querySelector('.rs-picker-toggle-textbox');

    fireEvent.change(input, { target: { value: 'ssss' } });

    expect(instance.root.className).to.include('rs-picker-error');

    fireEvent.blur(input);

    expect(instance.root.className).to.not.include('rs-picker-error');
  });

  it('Should update the calendar when clicking on a non-current month', () => {
    const menu = getInstance(
      <DateRangePicker
        defaultOpen
        defaultValue={[new Date('07/04/2021'), new Date('07/10/2021')]}
      />
    ).overlay;

    // Jun 27, 2021
    const unSameMonthCell = menu.querySelector(
      '.rs-calendar-table-cell-un-same-month .rs-calendar-table-cell-content'
    );

    fireEvent.mouseEnter(unSameMonthCell);
    fireEvent.click(unSameMonthCell);

    expect(
      menu
        .querySelector('.rs-calendar-table-cell-un-same-month .rs-calendar-table-cell-content')
        .getAttribute('title')
    ).to.equal('30 May 2021');
  });

  it('Should call `onChange` callback when input change and blur', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      fireEvent.change(input, { target: { value: '0910202009112021' } });
    });
    act(() => {
      fireEvent.blur(input);
    });

    expect(onChangeSpy).to.called;
    expect(format(onChangeSpy.firstCall.firstArg[0], 'dd/MM/yyyy')).to.equal('09/10/2020');
    expect(format(onChangeSpy.firstCall.firstArg[1], 'dd/MM/yyyy')).to.equal('09/11/2021');
  });

  it('Should call `onChange` callback when input change and Enter key', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      fireEvent.change(input, { target: { value: '0910202009112021' } });
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

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

    expect(picker.querySelector('.rs-calendar-header-meridian')).to.text('PM');
    expect(picker.querySelector('.rs-calendar-header-title-time')).to.text('01:00:00');
    expect(
      picker.querySelector('.rs-calendar-time-dropdown-column').querySelectorAll('li')
    ).to.length(12);
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

    expect(picker.querySelector('.rs-calendar-header-title-time')).to.text('01:00:00');

    fireEvent.click(picker.querySelector('.rs-calendar-time-dropdown-cell'));

    expect(picker.querySelector('.rs-calendar-header-meridian')).to.text('PM');
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

    const meridian = instance.overlay.querySelector('.rs-calendar-header-meridian');

    expect(meridian).to.text('PM');

    fireEvent.click(meridian);

    expect(meridian).to.text('AM');
  });

  it('Should be optional for all months', () => {
    const instance = getInstance(<DateRangePicker format="yyyy-MM" defaultOpen />);
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
    const { getByLabelText } = render(<DateRangePicker caretAs={GearIcon} />);

    expect(getByLabelText('gear')).to.have.class('rs-icon');
  });

  it('Should render a custom calendar title', () => {
    const { getAllByTestId } = render(
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

    const [firstTitle, secondTitle] = getAllByTestId('calendar-title');

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

    const btnDay = menu.querySelector('.rs-calendar-table-cell-content');
    const btnShortcutToday = menu.querySelector('.rs-picker-toolbar-ranges button');
    const btnOk = menu.querySelector('.rs-picker-toolbar-right button');

    act(() => {
      fireEvent.click(btnDay);
    });

    expect(btnOk.disabled).to.be.true;

    act(() => {
      fireEvent.click(btnShortcutToday);
    });

    expect(btnOk.disabled).to.be.false;
  });

  it('Should close picker after predefined range is clicked', async () => {
    const onCloseSpy = sinon.spy();
    const onChangeSpy = sinon.spy();

    const { getByRole } = render(
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

    userEvent.click(getByRole('button', { name: 'Yesterday' }));

    await waitFor(() => {
      expect(onCloseSpy).to.calledOnce;
      expect(onChangeSpy).to.calledOnce;
    });
  });

  it('Should not close picker', async () => {
    const onCloseSpy = sinon.spy();
    const onChangeSpy = sinon.spy();
    const yesterday = addDays(new Date(), -1);

    const { getByRole } = render(
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

    fireEvent.click(getByRole('button', { name: 'Yesterday' }));

    expect(getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.text(
      `${format(yesterday, 'yyyy-MM-dd')} ~ ${format(yesterday, 'yyyy-MM-dd')}`
    );

    await waitFor(() => {
      expect(onChangeSpy).to.not.called;
      expect(onCloseSpy).to.not.called;
    });
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    const { getByRole } = render(<DateRangePicker onFocus={onFocusSpy} />);
    const input = getByRole('combobox').querySelector('input');

    fireEvent.focus(input);

    expect(onFocusSpy).to.have.been.calledOnce;
  });

  it('Should render ranges on the left', () => {
    const onCloseSpy = sinon.spy();
    const onChangeSpy = sinon.spy();
    const yesterday = addDays(new Date(), -1);

    const { getByRole } = render(
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

    expect(
      getByRole('dialog').querySelector('.rs-picker-daterange-predefined').firstChild.firstChild
    ).to.equal(getByRole('button', { name: 'Yesterday' }));

    expect(getByRole('dialog').querySelector('.rs-picker-toolbar-ranges button')).to.not.exist;
  });

  it('Should be controllable for keyboard input', () => {
    const { getByTestId } = render(
      <>
        <DateRangePicker data-testid="picker-1" />
        <DateRangePicker data-testid="picker-2" editable={false} />
      </>
    );

    const picker1 = getByTestId('picker-1').querySelector('input');
    const picker2 = getByTestId('picker-2').querySelector('input');

    expect(picker1).to.have.attribute('readonly');
    expect(picker2).to.have.attribute('readonly');

    fireEvent.focus(picker1);
    expect(picker1).to.not.have.attribute('readonly');

    fireEvent.focus(picker2);
    expect(picker2).to.have.attribute('readonly');
  });

  it('Should not render the ranges element', () => {
    const { getByRole } = render(<DateRangePicker open ranges={[]} />);

    expect(getByRole('dialog').querySelector('.rs-picker-toolbar-ranges')).to.not.exist;
    expect(getByRole('dialog').querySelector('.rs-picker-daterange-predefined')).to.not.exist;

    // A flex layout toolbar should render two children so that the ok button appears on the right
    expect(getByRole('dialog').querySelector('.rs-picker-toolbar').childNodes).to.have.length(2);
  });

  describe('Plain text', () => {
    it('Should render formatted date range', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <DateRangePicker
            value={[new Date(2019, 3, 1), new Date(2019, 3, 2)]}
            format="MM/dd/yyyy"
            plaintext
          />
        </div>
      );

      expect(getByTestId('content')).to.have.text('04/01/2019 ~ 04/02/2019');
    });

    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <DateRangePicker value={null} format="MM/dd/yyyy" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });

  describe('Time stability', () => {
    it('Should the end time not change when the start date is clicked when defaultCalendarValue is set', () => {
      const onSelectSpy = sinon.spy();
      const { getByRole } = render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelectSpy}
          defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(getByRole('gridcell', { name: '07 Feb 2022' }).firstChild);

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(getByRole('gridcell', { name: '10 Feb 2022' }).firstChild);

      expect(onSelectSpy).to.have.been.calledTwice;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;
      expect(getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.have.text(
        '2022-02-07 00:00:00 ~ 2022-02-10 23:59:59'
      );
    });

    it('Should the end time not change when the start date is clicked when controlled', () => {
      const onSelectSpy = sinon.spy();
      const { getByRole } = render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelectSpy}
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(getByRole('gridcell', { name: '07 Feb 2022' }).firstChild);

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(getByRole('gridcell', { name: '10 Feb 2022' }).firstChild);

      expect(onSelectSpy).to.have.been.calledTwice;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;
      expect(getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.have.text(
        '2022-02-07 00:00:00 ~ 2022-02-10 23:59:59'
      );
    });

    it('Should not change the start and end time when the month is changed', () => {
      const { getByRole } = render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      const headerDateTitles = getByRole('dialog').querySelectorAll(
        '.rs-calendar-header-title-date'
      );
      const handerTimeTitles = getByRole('dialog').querySelectorAll(
        '.rs-calendar-header-title-time'
      );
      const firstCalendarForwardButton = getByRole('dialog').querySelectorAll(
        '.rs-calendar-header-forward'
      )[0];

      const secondCalendarBackwardButton = getByRole('dialog').querySelectorAll(
        '.rs-calendar-header-backward'
      )[1];

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
      const { getByRole } = render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onSelect={onSelectSpy}
          value={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
        />
      );

      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(getByRole('gridcell', { name: '20 Mar 2022' }).firstChild);

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;

      fireEvent.click(getByRole('gridcell', { name: '21 Apr 2022' }).firstChild);

      expect(onSelectSpy).to.have.been.calledTwice;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;
      expect(getByRole('dialog').querySelector('.rs-picker-daterange-header')).to.have.text(
        '2022-03-20 00:00:00 ~ 2022-04-21 23:59:59'
      );
    });

    it('Should render the default datetime after clicking the clear button', () => {
      const onCleanSpy = sinon.spy();
      const { getByRole } = render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          onClean={onCleanSpy}
          defaultValue={[new Date('2022-02-01 01:01:01'), new Date('2022-03-01 02:02:02')]}
          defaultCalendarValue={[new Date('2022-04-04 00:00:00'), new Date('2022-05-05 23:59:59')]}
        />
      );

      expect(getByRole('button', { name: '01:01:01' })).to.be.visible;
      expect(getByRole('button', { name: '02:02:02' })).to.be.visible;

      fireEvent.click(getByRole('button', { name: 'Clear' }));

      expect(onCleanSpy).to.have.been.calledOnce;
      expect(getByRole('button', { name: '00:00:00' })).to.be.visible;
      expect(getByRole('button', { name: '23:59:59' })).to.be.visible;
    });

    it('Should switch time from PM to AM', () => {
      const { getByRole } = render(
        <DateRangePicker
          open
          format="yyyy-MM-dd HH:mm:ss"
          showMeridian
          value={[new Date('2022-02-01 13:00:00'), new Date('2022-03-01 14:00:00')]}
        />
      );

      const header = getByRole('dialog').querySelector('.rs-picker-daterange-header');
      const switchButtons = getByRole('dialog').querySelectorAll('.rs-calendar-header-meridian');

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
});
