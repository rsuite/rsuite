import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Pagination from '../src/Pagination';
import innerText from './innerText';

describe('Pagination', () => {
  it('Should render a ul', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Pagination />);
    assert.equal(findDOMNode(instance).tagName, 'UL');
  });

  it('Should render 20 li', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Pagination pages={20} />);
    assert.equal(findDOMNode(instance).querySelectorAll('li').length, 20);
  });

  it('Should render 20 button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} buttonComponentClass="button" />
    );
    assert.equal(findDOMNode(instance).querySelectorAll('button').length, 20);
  });

  it('Should render 2 li', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Pagination pages={20} maxButtons={2} />);
    assert.equal(findDOMNode(instance).querySelectorAll('li').length, 2);
  });

  it('Should render `ellipsis` button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} ellipsis />
    );
    assert.equal(findDOMNode(instance).querySelectorAll('li').length, 3);
    assert.ok(findDOMNode(instance).querySelector('i.rs-icon-more'));
  });

  it('Should be ellipsis', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} ellipsis={'abc'} />
    );
    assert.equal(findDOMNode(instance).querySelectorAll('li').length, 3);
    assert.equal(
      innerText(findDOMNode(instance).querySelector('li.rs-pagination-btn-disabled')),
      'abc'
    );
  });

  it('Should render `first` button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} first />
    );
    assert.ok(findDOMNode(instance).querySelector('span[aria-label="First"]'));
  });

  it('Should render `last` button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} last />
    );
    assert.ok(findDOMNode(instance).querySelector('span[aria-label="Last"]'));
  });

  it('Should render `prev` button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} prev />
    );
    assert.ok(findDOMNode(instance).querySelector('span[aria-label="Previous"]'));
  });

  it('Should render `next` button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} next />
    );
    assert.ok(findDOMNode(instance).querySelector('span[aria-label="Next"]'));
  });

  it('Should render boundary links', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination pages={20} maxButtons={2} ellipsis boundaryLinks />
    );
    assert.equal(innerText(findDOMNode(instance).querySelector('li:last-child')), '20');
  });

  it('Should active page 5', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Pagination pages={20} activePage={5} />);
    assert.equal(
      innerText(findDOMNode(instance).querySelector('li.rs-pagination-btn-active')),
      '5'
    );
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(<Pagination pages={20} onSelect={doneOp} />);

    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[1]);
  });

  it('Should apply size class', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Pagination size="lg">Title</Pagination>);
    assert.ok(findDOMNode(instance).className.match(/\bpagination-lg\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Pagination className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Pagination style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
