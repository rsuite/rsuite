import React from 'react';
import { render, act } from '@testing-library/react';
import Calendar from '../Calendar';
import {
  getDefaultPalette,
  getDOMNode,
  getStyle,
  inChrome,
  itChrome,
  toRGB
} from '@test/testUtils';

import '../styles/index.less';
import { CalendarState } from '../useCalendarState';

const { H500, H700 } = getDefaultPalette();

describe('Calendar styles', () => {
  it('MonthToolbar should render correct styles', () => {
    const instanceRef = React.createRef();
    render(<Calendar ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);

    const monthToolbarDom = dom.querySelector('.rs-calendar-header-month-toolbar');
    assert.equal(getStyle(monthToolbarDom, 'float'), 'left');
    assert.equal(getStyle(monthToolbarDom, 'display'), 'block');
    assert.equal(getStyle(monthToolbarDom, 'textAlign'), 'center');
  });

  it('TodayButton should render correct styles', () => {
    const instanceRef = React.createRef();
    render(<Calendar ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);

    const todayButtonDom = dom.querySelector('.rs-calendar-btn-today');
    assert.equal(getStyle(todayButtonDom, 'backgroundColor'), toRGB('#f7f7fa'));
    inChrome && assert.equal(getStyle(todayButtonDom, 'padding'), '5px 10px');
  });

  it('Selected item should render correct styles', () => {
    const instanceRef = React.createRef();
    render(<Calendar ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);

    const selectedDom = dom.querySelector(
      '.rs-calendar-table-cell-selected .rs-calendar-table-cell-content'
    );
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
    const instanceRef = React.createRef();
    render(<Calendar ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);

    const dateTitleDom = dom.querySelector('.rs-calendar-header-title-date');
    act(() => {
      dateTitleDom.click();
    });

    const headerBackward = dom.querySelector('.rs-calendar-header-backward');
    const headerForward = dom.querySelector('.rs-calendar-header-backward');
    const monthDropDown = dom.querySelector('.rs-calendar-month-dropdown');
    const yearActiveDom = dom.querySelector('.rs-calendar-month-dropdown-year-active');
    const dropdownActiveCellDom = dom.querySelector(
      '.rs-calendar-month-dropdown-cell-active .rs-calendar-month-dropdown-cell-content'
    );
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
    const instanceRef = React.createRef();
    render(<Calendar bordered ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    const tableCellDom = dom.querySelector('.rs-calendar-table-cell');
    assert.equal(
      getStyle(tableCellDom, 'borderBottom'),
      `1px solid ${toRGB('#f2f2f5')}`,
      'TableCellDom border'
    );
  });

  itChrome('Should be bordered on month row', () => {
    const { getByTestId } = render(
      <Calendar defaultState={CalendarState.MONTH} bordered data-testid="body" />
    );

    const row = getByTestId('body').querySelector('.rs-calendar-month-dropdown-row');

    expect(getStyle(row, 'borderBottom')).to.equal(`1px dotted ${toRGB('#e5e5ea')}`);
  });

  it('Should render compact calendar', () => {
    const instanceRef = React.createRef();
    render(<Calendar compact ref={instanceRef} />);
    const tableCellContentDom = getDOMNode(instanceRef.current).querySelector(
      '.rs-calendar-table-row:not(.rs-calendar-table-header-row) .rs-calendar-table-cell-content'
    );
    assert.equal(getStyle(tableCellContentDom, 'height'), '50px');
  });
});
