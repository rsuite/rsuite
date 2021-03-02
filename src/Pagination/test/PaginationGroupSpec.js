import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import PaginationGroup from '../PaginationGroup';
import { getDOMNode, getInstance, innerText } from '@test/testUtils';

describe('Pagination Group', () => {
  it('Should output a PaginationGroup', () => {
    const instance = getDOMNode(<PaginationGroup total={10} />);
    assert.include(instance.className, 'rs-pagination-group');
  });

  it('Should output a prev button', () => {
    const instance = getInstance(<PaginationGroup total={10} prev />);
    assert.ok(instance.querySelector('[aria-label="page previous"]'));
  });

  it('Should output a next button', () => {
    const instance = getInstance(<PaginationGroup total={10} next />);
    assert.ok(instance.querySelector('[aria-label="page next"]'));
  });

  it('Should output a first button', () => {
    const instance = getInstance(<PaginationGroup total={10} first />);
    assert.ok(instance.querySelector('[aria-label="page top"]'));
  });

  it('Should output a last button', () => {
    const instance = getInstance(<PaginationGroup total={10} last />);
    assert.ok(instance.querySelector('[aria-label="page end"]'));
  });

  it('Should render 10  buttons', () => {
    const instance = getDOMNode(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={1000}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );

    assert.equal(instance.querySelectorAll('.rs-pagination-btn').length, 10);
  });

  it('Should render 6  buttons by `maxButtons`', () => {
    const instance = getDOMNode(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={6}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-pagination-btn').length, 6);
  });

  it('Should active page 2', () => {
    const instance = getDOMNode(
      <PaginationGroup
        total={100}
        limit={10}
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

  it('Should show total', () => {
    const instance = getDOMNode(<PaginationGroup layout={['total']} total={100} />);
    assert.equal(instance.querySelector('.rs-pagination-group-total').innerText, 'Total Rows: 100');
  });

  it('Should call onChangePage callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <PaginationGroup
        last={false}
        next={false}
        prev={false}
        first={false}
        total={100}
        onChangePage={doneOp}
      />
    );
    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-pagination-btn')[1]);
  });

  it('Should render a limit picker', () => {
    const instance = getInstance(
      <PaginationGroup
        layout={['limit']}
        total={100}
        limit={10}
        maxButtons={6}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );

    assert.ok(instance.querySelector('.rs-picker-select'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<PaginationGroup className="custom" total={10} />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PaginationGroup style={{ fontSize }} total={10} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should be disabled', () => {
    // total={60}  ==> pages 2
    const instance = getDOMNode(
      <PaginationGroup layout={['pager', 'limit']} total={60} disabled first last prev next />
    );
    assert.equal(instance.querySelectorAll('.rs-pagination-btn-disabled').length, 6);
    assert.ok(instance.querySelector('.rs-picker-disabled'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(
      <PaginationGroup
        layout={['pager', 'limit']}
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
    const disabledDOMs = instance.querySelectorAll('.rs-pagination-btn-disabled');
    assert.ok(instance.querySelector('.rs-picker-disabled'));
    assert.equal(disabledDOMs.length, 1);
    assert.equal(innerText(disabledDOMs[0]), '2');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PaginationGroup total={10} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render the maximum', () => {
    const instance = getDOMNode(
      <PaginationGroup
        total={100}
        limit={10}
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
    assert.equal(instance.querySelector('button:last-child').innerText, '10');
  });

  it('Should render a `more` icon', () => {
    const instance = getDOMNode(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={3}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
        ellipsis={true}
      />
    );
    assert.ok(instance.querySelector('[aria-label="more"]'));
  });
});
