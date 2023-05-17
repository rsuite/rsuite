/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, act, screen } from '@testing-library/react';
import Calendar from '../Calendar';
import { getDefaultPalette, getStyle, inChrome, itChrome, toRGB } from '@test/testUtils';

import '../styles/index.less';
import { CalendarState } from '../useCalendarState';

const { H500, H700 } = getDefaultPalette();

describe('Calendar styles', () => {
  it('MonthToolbar should render correct styles', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<Calendar ref={instanceRef} />);

    const monthToolbarDom = instanceRef.current?.querySelector(
      '.rs-calendar-header-month-toolbar'
    ) as HTMLElement;
    assert.equal(getStyle(monthToolbarDom, 'float'), 'left');
    assert.equal(getStyle(monthToolbarDom, 'display'), 'block');
    assert.equal(getStyle(monthToolbarDom, 'textAlign'), 'center');
  });

  it('TodayButton should render correct styles', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<Calendar ref={instanceRef} />);

    const todayButtonDom = instanceRef.current?.querySelector(
      '.rs-calendar-btn-today'
    ) as HTMLElement;
    assert.equal(getStyle(todayButtonDom, 'backgroundColor'), toRGB('#f7f7fa'));
    inChrome && assert.equal(getStyle(todayButtonDom, 'padding'), '5px 10px');
  });

  it('Selected item should render correct styles', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<Calendar ref={instanceRef} />);

    const selectedDom = instanceRef.current?.querySelector(
      '.rs-calendar-table-cell-selected .rs-calendar-table-cell-content'
    ) as HTMLElement;
    const contentDom = selectedDom.children[0];
    inChrome &&
      assert.equal(
        getStyle(selectedDom, 'boxShadow'),
        `${H500} 0px 0px 0px 1px inset`,
        'Selected item box-shadow'
      );
    assert.equal(getStyle(contentDom, 'backgroundColor'), H500, 'Selected item background-color');
    assert.equal(getStyle(contentDom, 'color'), toRGB('#fff'), 'Selected item color');
  });

  it('Click date title button should render correct styles', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<Calendar ref={instanceRef} />);

    const dateTitleDom = instanceRef.current?.querySelector(
      '.rs-calendar-header-title-date'
    ) as HTMLElement;
    act(() => {
      dateTitleDom.click();
    });

    const headerBackward = instanceRef.current?.querySelector(
      '.rs-calendar-header-backward'
    ) as HTMLElement;
    const headerForward = instanceRef.current?.querySelector(
      '.rs-calendar-header-backward'
    ) as HTMLElement;
    const monthDropDown = instanceRef.current?.querySelector(
      '.rs-calendar-month-dropdown'
    ) as HTMLElement;
    const yearActiveDom = instanceRef.current?.querySelector(
      '.rs-calendar-month-dropdown-year-active'
    ) as HTMLElement;
    const dropdownActiveCellDom = instanceRef.current?.querySelector(
      '.rs-calendar-month-dropdown-cell-active .rs-calendar-month-dropdown-cell-content'
    ) as HTMLElement;
    assert.equal(
      getStyle(headerBackward, 'visibility'),
      'hidden',
      'Header backward button visibility'
    );
    assert.equal(
      getStyle(headerForward, 'visibility'),
      'hidden',
      'Header forward button visibility'
    );
    assert.equal(getStyle(monthDropDown, 'display'), 'block', 'MonthDropDown button display');
    assert.equal(getStyle(yearActiveDom, 'color'), H700, 'Active year dom font-color');
    assert.equal(
      getStyle(dropdownActiveCellDom, 'color'),
      toRGB('#fff'),
      'DropdownActiveCellDom color'
    );
    assert.equal(
      getStyle(dropdownActiveCellDom, 'backgroundColor'),
      H500,
      'DropdownActiveCellDom background-color'
    );
  });

  itChrome('Should be bordered on cell', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<Calendar bordered ref={instanceRef} />);
    const tableCellDom = instanceRef.current?.querySelector(
      '.rs-calendar-table-cell'
    ) as HTMLElement;
    assert.equal(
      getStyle(tableCellDom, 'borderBottom'),
      `1px solid ${toRGB('#f2f2f5')}`,
      'TableCellDom border'
    );
  });

  itChrome('Should be bordered on month row', () => {
    render(<Calendar defaultState={CalendarState.MONTH} bordered data-testid="body" />);

    const row = screen
      .getByTestId('body')
      .querySelector('.rs-calendar-month-dropdown-row') as HTMLElement;

    expect(getStyle(row, 'borderBottom')).to.equal(`1px dotted ${toRGB('#e5e5ea')}`);
  });

  it('Should render compact calendar', () => {
    const instanceRef = React.createRef<HTMLElement>();
    render(<Calendar compact ref={instanceRef} />);
    const tableCellContentDom = instanceRef.current?.querySelector(
      '.rs-calendar-table-row:not(.rs-calendar-table-header-row) .rs-calendar-table-cell-content'
    ) as HTMLElement;
    assert.equal(getStyle(tableCellContentDom, 'height'), '50px');
  });
});
