import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TableRow from '../TableRow';
import { getDate, format } from 'date-fns';

describe('Calendar-TableRow', () => {
  it('Should render a div with `table-row` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableRow />);
    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\btable-row\b/));
  });

  it('Should be active today', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableRow />);
    const instanceDOM = findDOMNode(instance);

    assert.equal(
      instanceDOM.querySelector('.rs-calendar-table-cell-is-today').innerText,
      getDate(new Date()) + ''
    );
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<TableRow onSelect={doneOp} />);
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-table-cell'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableRow className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<TableRow style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableRow classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('Should render a week number', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableRow showWeekNumbers />);
    assert.equal(
      findDOMNode(instance).querySelector('.rs-calendar-table-cell-week-number').innerText,
      format(new Date(), 'W')
    );
  });
});
