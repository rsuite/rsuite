import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import TablePagination from '../src/TablePagination';
import { getDOMNode, getInstance } from './TestWrapper';

describe('Table-Pagination', () => {
  it('Should output a TablePagination', () => {
    const instance = getDOMNode(<TablePagination total={10} />);
    assert.include(instance.className, 'rs-table-pagination-pagination-wrapper');
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
    assert.equal(instance.querySelector('.rs-table-pagination-page-info').innerText, 'total: 100');
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
});
