import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import TablePagination from '../TablePagination';
import { getDOMNode, getInstance, innerText } from '@test/testUtils';

describe('Table-Pagination', () => {
  it('Should output a TablePagination', () => {
    const instance = getDOMNode(<TablePagination total={10} />);
    assert.include(instance.className, 'rs-table-pagination-toolbar');
  });

  it('Should reverse start and end position', () => {
    const instance = getDOMNode(<TablePagination reverse />);
    assert.include(instance.childNodes[0].className, 'rs-table-pagination-end');
    assert.include(instance.childNodes[1].className, 'rs-table-pagination-start');
  });

  it('Should output a prev button', () => {
    const instance = getInstance(<TablePagination total={10} prev />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-icon-page-previous');
  });

  it('Should output a next button', () => {
    const instance = getInstance(<TablePagination total={10} next />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-icon-page-next');
  });

  it('Should output a first button', () => {
    const instance = getInstance(<TablePagination total={10} first />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-icon-page-top');
  });

  it('Should output a last button', () => {
    const instance = getInstance(<TablePagination total={10} last />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-icon-page-end');
  });

  it('Should render 10  buttons', () => {
    const instance = getDOMNode(
      <TablePagination
        total={100}
        displayLength={10}
        maxButtons={1000}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );
    assert.equal(instance.querySelectorAll('li.rs-pagination-btn').length, 10);
  });

  it('Should render 6  buttons by `maxButtons`', () => {
    const instance = getDOMNode(
      <TablePagination
        total={100}
        displayLength={10}
        maxButtons={6}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );
    assert.equal(instance.querySelectorAll('li.rs-pagination-btn').length, 6);
  });

  it('Should active page 2', () => {
    const instance = getDOMNode(
      <TablePagination
        total={100}
        displayLength={10}
        maxButtons={6}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );
    assert.equal(instance.querySelector('.rs-pagination-btn-active').innerText, '2');
  });

  it('Should show info', () => {
    const instance = getDOMNode(<TablePagination showInfo total={100} />);
    assert.equal(instance.querySelector('.rs-table-pagination-page-info').innerText, 'Total: 100');
  });

  it('Should call onChangePage callback', done => {
    const doneOp = checked => {
      done();
    };
    const instance = getDOMNode(
      <TablePagination
        last={false}
        next={false}
        prev={false}
        first={false}
        total={100}
        onChangePage={doneOp}
      />
    );
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-pagination-btn a')[1]);
  });

  it('Should render a subtle SelectPicker', () => {
    const instance = getInstance(
      <TablePagination
        total={100}
        displayLength={10}
        maxButtons={6}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-picker-subtle');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TablePagination className="custom" total={10} />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TablePagination style={{ fontSize }} total={10} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should be disabled', () => {
    // total={60}  ==> pages 2
    const instance = getDOMNode(<TablePagination total={60} disabled first last prev next />);
    assert.equal(instance.querySelectorAll('li.rs-pagination-btn-disabled').length, 6);
    assert.ok(instance.querySelector('.rs-picker-disabled'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(
      <TablePagination
        total={60}
        first={false}
        last={false}
        prev={false}
        next={false}
        disabled={eventKey => {
          if (eventKey === 2 || eventKey === 'picker') {
            return true;
          }
          return false;
        }}
      />
    );
    const disabledDOMs = instance.querySelectorAll('li.rs-pagination-btn-disabled');
    assert.ok(instance.querySelector('.rs-picker-disabled'));
    assert.equal(disabledDOMs.length, 1);
    assert.equal(innerText(disabledDOMs[0]), '2');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TablePagination total={10} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render the maximum', () => {
    const instance = getDOMNode(
      <TablePagination
        total={100}
        displayLength={10}
        maxButtons={3}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
        ellipsis={true}
        boundaryLinks={true}
      />
    );
    assert.equal(instance.querySelector('li:last-child').innerText, '10');
  });

  it('Should render a `more` icon', () => {
    const instance = getDOMNode(
      <TablePagination
        total={100}
        displayLength={10}
        maxButtons={3}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
        ellipsis={true}
      />
    );
    assert.ok(instance.querySelector('li:last-child .rs-icon-more'));
  });
});
