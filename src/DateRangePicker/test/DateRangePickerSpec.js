import { getDOMNode, getInstance } from '@test/testUtils';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactTestUtils, { act } from 'react-dom/test-utils';
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

function setTimePickerValue(picker, calendarIndex, { hours, minutes, seconds }) {
  function generateTimeItem(calendarIndex, type, index) {
    return `.rs-calendar[index="${calendarIndex}"] .rs-calendar-time-dropdown ul[data-type="${type}"]>li:nth-child(${index}) .rs-calendar-time-dropdown-cell`;
  }

  ReactTestUtils.Simulate.click(
    picker.querySelector(generateTimeItem(calendarIndex, 'hours', hours + 1))
  );
  ReactTestUtils.Simulate.click(
    picker.querySelector(generateTimeItem(calendarIndex, 'minutes', minutes + 1))
  );
  ReactTestUtils.Simulate.click(
    picker.querySelector(generateTimeItem(calendarIndex, 'seconds', seconds + 1))
  );
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

    // click the left calendar time toolbar, display time selection panel
    ReactTestUtils.Simulate.click(picker.querySelector(startTimeToolbar));
    // select time to 6:6:6
    setTimePickerValue(picker, 0, { hours: 6, minutes: 6, seconds: 6 });
    // close the left calendar time picker panel.
    ReactTestUtils.Simulate.click(picker.querySelector(startTimeToolbar));

    assert.equal(picker.querySelector(startTimeToolbar).textContent, '06:06:06');

    // click the right calendar time toolbar, display time selection panel
    ReactTestUtils.Simulate.click(picker.querySelector(endTimeToolbar));
    // select time to 9:9:9
    setTimePickerValue(picker, 1, { hours: 9, minutes: 9, seconds: 9 });
    ReactTestUtils.Simulate.click(picker.querySelector(endTimeToolbar));

    assert.equal(picker.querySelector(endTimeToolbar).textContent, '09:09:09');

    // press ok button
    ReactTestUtils.Simulate.click(picker.querySelector('.rs-picker-toolbar-right .rs-btn'));

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

    // press ok button
    ReactTestUtils.Simulate.click(picker.querySelector('.rs-picker-toolbar-right .rs-btn'));

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

    ReactTestUtils.Simulate.click(today);
    assert.ok(today);
    assert.ok(onChangeSpy.calledOnce);
  });

  it('Should call onClean callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(
      <DateRangePicker defaultValue={[new Date(), new Date()]} onClean={onCleanSpy} />
    );

    ReactTestUtils.Simulate.click(instance.root.querySelector('.rs-picker-toggle-clean'));
    assert.ok(onCleanSpy.calledOnce);
  });

  it('Should call `onOpen` callback', () => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<DateRangePicker onOpen={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<DateRangePicker onOpen={doneOp} />);
    picker.open();
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
    const { getByRole, getAllByRole } = render(
      <DateRangePicker open value={[parseISO('2019-09-10'), parseISO('2019-10-10')]} />
    );

    userEvent.click(getByRole('button', { name: '01 Sep 2019' }));
    userEvent.click(getByRole('button', { name: '24 Sep 2019' }));

    // todo should use gridcell role
    // fixme should assert on aria-selected attribute
    expect(
      // fixme should use within to avoid ambigious query
      getAllByRole('button', { name: '01 Sep 2019' })[1].closest('[role="cell"]')
    ).to.have.class('rs-calendar-table-cell-selected');
    expect(getByRole('button', { name: '24 Sep 2019' }).closest('[role="cell"]')).to.have.class(
      'rs-calendar-table-cell-selected'
    );
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

    ReactTestUtils.Simulate.click(day);
    ReactTestUtils.Simulate.click(day);
    ReactTestUtils.Simulate.click(menu.querySelector('.rs-picker-toolbar-right .rs-btn'));

    console.log(onOkSpy.args[0][0]);
    assert.ok(isSameDay(startOfWeek(new Date('08/01/2021')), onOkSpy.args[0][0][0]));
    assert.ok(isSameDay(endOfWeek(new Date('08/07/2021')), onOkSpy.args[0][0][1]));
  });

  it('Should select a whole month', () => {
    const onOkSpy = sinon.spy();
    const menu = getInstance(<DateRangePicker onOk={onOkSpy} hoverRange="month" open />).overlay;
    const today = menu?.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );

    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(today);
    ReactTestUtils.Simulate.click(menu.querySelector('.rs-picker-toolbar-right .rs-btn'));

    assert.ok(isSameDay(startOfMonth(new Date()), onOkSpy.args[0][0][0]));
    assert.ok(isSameDay(endOfMonth(new Date()), onOkSpy.args[0][0][1]));
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

    ReactTestUtils.Simulate.click(startCell);
    ReactTestUtils.Simulate.mouseEnter(endCell);

    const allInRangeCells = menu.querySelectorAll(
      '.rs-calendar-table-cell-in-range, .rs-calendar-table-cell-selected-start'
    );

    assert.equal(allInRangeCells[0].textContent, '11');
    assert.equal(allInRangeCells[allInRangeCells.length - 1].textContent, '24');
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

    ReactTestUtils.Simulate.click(startCell);
    ReactTestUtils.Simulate.mouseEnter(endCell);
    ReactTestUtils.Simulate.click(endCell);

    const allInRangeCells = menu.querySelectorAll(
      '.rs-calendar-table-cell-in-range, .rs-calendar-table-cell-selected-start'
    );

    assert.equal(allInRangeCells[0].textContent, '11');
    assert.equal(allInRangeCells[allInRangeCells.length - 1].textContent, '24');
  });

  it('Should fire `onChange` if click ok after only select one date in oneTap mode', () => {
    const onChangeSpy = sinon.spy();
    const menu = getInstance(
      <DateRangePicker onChange={onChangeSpy} hoverRange="week" oneTap defaultOpen />
    ).overlay;

    const today = menu.querySelector(
      '.rs-calendar-table-cell-is-today .rs-calendar-table-cell-content'
    );
    ReactTestUtils.Simulate.click(today);
    assert.ok(isSameDay(startOfWeek(new Date()), onChangeSpy.args[0][0][0]));
    assert.ok(isSameDay(endOfWeek(new Date()), onChangeSpy.args[0][0][1]));
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DateRangePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should show default calendar value', () => {
    const menu = getInstance(
      <DateRangePicker
        open
        defaultCalendarValue={[parseISO('2019-01-01'), parseISO('2019-09-01')]}
      />,
      false
    ).overlay;

    assert.ok(menu.querySelector('div[title="01 Feb 2019"]'));
    assert.ok(menu.querySelector('div[title="01 Sep 2019"]'));
  });

  it('Should have only one calendar', () => {
    const menu = getInstance(<DateRangePicker showOneCalendar open />).overlay;

    assert.include(
      menu.querySelector('.rs-picker-daterange-panel').className,
      'rs-picker-daterange-panel-show-one-calendar'
    );

    assert.equal(menu.querySelectorAll('.rs-picker-daterange-calendar-single').length, 1);
  });

  it('Should display the formatted date', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    const input = target.querySelector('.rs-picker-toggle-textbox');

    input.value = '2020010120210707';
    ReactTestUtils.Simulate.change(input);

    assert.equal(input.value, '2020-01-01 ~ 2021-07-07');
  });

  it('Should render an error message', () => {
    const instance = getInstance(<DateRangePicker />);
    const target = instance.target;
    const input = target.querySelector('.rs-picker-toggle-textbox');

    input.value = 'ssss';
    ReactTestUtils.Simulate.change(input);
    assert.include(instance.root.className, 'rs-picker-error');

    ReactTestUtils.Simulate.blur(input);
    assert.notInclude(instance.root.className, 'rs-picker-error');
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

    ReactTestUtils.Simulate.mouseEnter(unSameMonthCell);
    ReactTestUtils.Simulate.click(unSameMonthCell);

    assert.equal(
      menu
        .querySelector('.rs-calendar-table-cell-un-same-month .rs-calendar-table-cell-content')
        .getAttribute('title'),
      '30 May 2021'
    );
  });

  it('Should call `onChange` callback when input change and blur', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      input.value = '09/10/2020 ~ 09/11/2021';
      ReactTestUtils.Simulate.change(input);
    });
    act(() => {
      ReactTestUtils.Simulate.blur(input);
    });

    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(format(onChangeSpy.firstCall.firstArg[0], 'dd/MM/yyyy'), '09/10/2020');
    assert.equal(format(onChangeSpy.firstCall.firstArg[1], 'dd/MM/yyyy'), '09/11/2021');
  });

  it('Should call `onChange` callback when input change and Enter key', () => {
    const onChangeSpy = sinon.spy();

    const instance = getInstance(<DateRangePicker onChange={onChangeSpy} format="dd/MM/yyyy" />);
    const input = instance.root.querySelector('.rs-picker-toggle-textbox');

    act(() => {
      input.value = '09/10/2020 ~ 09/11/2021';
      ReactTestUtils.Simulate.change(input);
    });
    act(() => {
      ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });
    });

    assert.isTrue(onChangeSpy.calledOnce);
    assert.equal(format(onChangeSpy.firstCall.firstArg[0], 'dd/MM/yyyy'), '09/10/2020');
    assert.equal(format(onChangeSpy.firstCall.firstArg[1], 'dd/MM/yyyy'), '09/11/2021');
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

    assert.equal(picker.querySelector('.rs-calendar-header-meridian').textContent, 'PM');
    assert.equal(picker.querySelector('.rs-calendar-header-title-time').textContent, '01:00:00');
    assert.equal(
      picker.querySelector('.rs-calendar-time-dropdown-column').querySelectorAll('li').length,
      12
    );
    assert.equal(picker.querySelector('.rs-calendar-time-dropdown-column li').textContent, '12');
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

    assert.equal(picker.querySelector('.rs-calendar-header-title-time').textContent, '01:00:00');

    ReactTestUtils.Simulate.click(picker.querySelector('.rs-calendar-time-dropdown-cell'));

    assert.equal(picker.querySelector('.rs-calendar-header-meridian').textContent, 'PM');
    assert.equal(picker.querySelector('.rs-calendar-header-title-time').textContent, '12:00:00');
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
    assert.equal(meridian.textContent, 'PM');
    ReactTestUtils.Simulate.click(meridian);
    assert.equal(meridian.textContent, 'AM');
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

  it('Should not get warned about deprecated `caretComponent` prop', () => {
    sinon.spy(console, 'warn');

    render(<DateRangePicker />);

    expect(console.warn).not.to.have.been.calledWith(
      sinon.match(/"caretComponent" property of "PickerToggle" has been deprecated/)
    );
  });
});
