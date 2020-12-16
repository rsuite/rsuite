import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, innerText } from '@test/testUtils';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('Should render a <div>', () => {
    const instance = getDOMNode(<Pagination />);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should render 20 <a>', () => {
    const instance = getDOMNode(<Pagination pages={20} />);
    assert.equal(instance.querySelectorAll('a').length, 20);
  });

  it('Should render 20 button', () => {
    const instance = getDOMNode(<Pagination pages={20} linkAs="button" />);
    assert.equal(instance.querySelectorAll('button').length, 20);
  });

  it('Should render 2 <a>', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} />);
    assert.equal(instance.querySelectorAll('a').length, 2);
  });

  it('Should render `ellipsis` button', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} ellipsis />);
    assert.equal(instance.querySelectorAll('a').length, 3);
    assert.ok(instance.querySelector('[aria-label="more"]'));
  });

  it('Should be ellipsis', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} ellipsis={'abc'} />);
    assert.equal(instance.querySelectorAll('a').length, 3);
    assert.equal(innerText(instance.querySelector('a.rs-pagination-btn-disabled')), 'abc');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Pagination pages={2} disabled first last prev next />);
    assert.equal(instance.querySelectorAll('a.rs-pagination-btn-disabled').length, 6);
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(
      <Pagination
        pages={10}
        disabled={eventKey => {
          if (eventKey === 2) {
            return true;
          }
          return false;
        }}
      />
    );
    const disabledDOMs = instance.querySelectorAll('a.rs-pagination-btn-disabled');
    assert.equal(disabledDOMs.length, 1);
    assert.equal(innerText(disabledDOMs[0]), '2');
  });

  it('Should render `first` button', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} first />);
    assert.ok(instance.querySelector('a[aria-label="First"]'));
  });

  it('Should render `last` button', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} last />);
    assert.ok(instance.querySelector('a[aria-label="Last"]'));
  });

  it('Should render `prev` button', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} prev />);
    assert.ok(instance.querySelector('a[aria-label="Previous"]'));
  });

  it('Should render `next` button', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} next />);
    assert.ok(instance.querySelector('a[aria-label="Next"]'));
  });

  it('Should render boundary links', () => {
    const instance = getDOMNode(<Pagination pages={20} maxButtons={2} ellipsis boundaryLinks />);
    assert.equal(innerText(instance.querySelector('a:last-child')), '20');
  });

  it('Should active page 5', () => {
    const instance = getDOMNode(<Pagination pages={20} activePage={5} />);
    assert.equal(innerText(instance.querySelector('a.rs-pagination-btn-active')), '5');
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };

    const instance = getDOMNode(<Pagination pages={20} onSelect={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelectorAll('a')[1]);
  });

  it('Should apply size class', () => {
    let instance = getDOMNode(<Pagination size="lg">Title</Pagination>);
    assert.ok(instance.className.match(/\bpagination-lg\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Pagination className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Pagination style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Pagination classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
