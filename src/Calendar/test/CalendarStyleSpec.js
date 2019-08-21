import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import Calendar from '../CalendarPanel';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  getDefaultPalette,
  toRGB
} from '@test/testUtils';

import '../styles/index';

const { H500, H700 } = getDefaultPalette();

describe('Calendar styles', () => {
  it('MonthToolbar should render correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Calendar ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);

    const monthToolbarDom = dom.querySelector('.rs-calendar-header-month-toolbar');
    assert.equal(getStyle(monthToolbarDom, 'float'), 'left');
    assert.equal(getStyle(monthToolbarDom, 'display'), 'block');
    assert.equal(getStyle(monthToolbarDom, 'textAlign'), 'center');
  });

  it('TodayButton should render correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Calendar ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);

    const todayButtonDom = dom.querySelector('.rs-calendar-btn-today');
    assert.equal(getStyle(todayButtonDom, 'backgroundColor'), toRGB('#f7f7fa'));
    assert.equal(getStyle(todayButtonDom, 'padding'), '8px 12px');
  });

  it('Selected item should render correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Calendar ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);

    const selectedDom = dom.querySelector(
      '.rs-calendar-table-cell-selected .rs-calendar-table-cell-content'
    );
    const contentDom = selectedDom.children[0];
    assert.equal(getStyle(selectedDom, 'borderColor'), H500, 'Selected item border-color');
    assert.equal(getStyle(contentDom, 'backgroundColor'), H500, 'Selected item background-color');
    assert.equal(getStyle(contentDom, 'color'), toRGB('#fff'), 'Selected item color');
  });

  it('Click date title button should render correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Calendar ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);

    const dateTitleDom = dom.querySelector('.rs-calendar-header-title-date');
    dateTitleDom.click();
    const headerBackward = dom.querySelector('.rs-calendar-header-backward');
    const headerForward = dom.querySelector('.rs-calendar-header-backward');
    const monthDropDown = dom.querySelector('.rs-calendar-month-dropdown');
    const yearActiveDom = dom.querySelector('.rs-calendar-month-dropdown-year-active');
    const dropdownActiveCellDom = dom.querySelector(
      '.rs-calendar-month-dropdown-cell-active .rs-calendar-month-dropdown-cell-content'
    );
    assert.equal(getStyle(headerBackward, 'visibility'), 'hidden');
    assert.equal(getStyle(headerForward, 'visibility'), 'hidden');
    assert.equal(getStyle(monthDropDown, 'display'), 'block');
    assert.equal(getStyle(yearActiveDom, 'color'), H700);
    assert.equal(
      getStyle(dropdownActiveCellDom, 'color'),
      toRGB('#fff'),
      'DropdownActiveCellDom color'
    );
    assert.equal(
      getStyle(dropdownActiveCellDom, 'borderColor'),
      H500,
      'DropdownActiveCellDom border-color'
    );
    assert.equal(
      getStyle(dropdownActiveCellDom, 'backgroundColor'),
      H500,
      'DropdownActiveCellDom background-color'
    );
  });

  it('Should render bordered calendar', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Calendar bordered ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const tableCellDom = dom.querySelector('.rs-calendar-table-cell');
    const dropdownRowDom = dom.querySelector('.rs-calendar-month-dropdown-row');
    assert.equal(
      getStyle(tableCellDom, 'borderBottom'),
      `1px solid ${toRGB('#f2f2f5')}`,
      'TableCellDom border'
    );
    assert.equal(
      getStyle(dropdownRowDom, 'borderBottom'),
      `1px dotted ${toRGB('#e5e5ea')}`,
      'DropdownRow border'
    );
  });

  it('Should render compact calendar', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Calendar compact ref={instanceRef} />, createTestContainer());
    const tableCellContentDom = getDOMNode(instanceRef.current).querySelector(
      '.rs-calendar-table-row:not(.rs-calendar-table-header-row) .rs-calendar-table-cell-content'
    );
    assert.equal(getStyle(tableCellContentDom, 'height'), '50px');
  });
});
