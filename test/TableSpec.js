import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Table from '../src/Table';

describe('Table', () => {

  it('Should render a Table', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Table><tr><td>{title}</td></tr></Table>
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'TABLE');
    assert.equal(instanceDom.innerText, title);
  });

  it('Should have a `table-striped` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Table striped />
    );
    assert.ok(findDOMNode(instance).className.match(/\btable-striped\b/));
  });

  it('Should have a `table-bordered` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Table bordered />
    );
    assert.ok(findDOMNode(instance).className.match(/\btable-bordered\b/));
  });

  it('Should have a `table-condensed` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Table condensed />
    );
    assert.ok(findDOMNode(instance).className.match(/\btable-condensed\b/));
  });

  it('Should have a `table-hover` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Table hover />
    );
    assert.ok(findDOMNode(instance).className.match(/\btable-hover\b/));
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Table className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Table style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
