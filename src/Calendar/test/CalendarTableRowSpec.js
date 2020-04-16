import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import TableRow from '../TableRow';
import { getDate, format } from 'date-fns';

describe('Calendar-TableRow', () => {
  it('Should render a div with `table-row` class', () => {
    const instance = getDOMNode(<TableRow />);
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btable-row\b/));
  });

  it('Should be active today', () => {
    const instance = getDOMNode(<TableRow />);
    const instanceDOM = instance;

    assert.equal(
      instanceDOM.querySelector('.rs-calendar-table-cell-is-today').innerText,
      getDate(new Date()) + ''
    );
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<TableRow onSelect={doneOp} />);
    const instanceDOM = instance;
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-table-cell'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TableRow className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TableRow style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TableRow classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a week number', () => {
    const instance = getDOMNode(<TableRow showWeekNumbers />);
    assert.equal(
      instance.querySelector('.rs-calendar-table-cell-week-number').innerText,
      format(new Date(), 'W')
    );
  });
});
