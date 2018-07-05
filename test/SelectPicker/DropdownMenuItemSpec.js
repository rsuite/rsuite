import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import DropdownMenuItem from '../../src/SelectPicker/DropdownMenuItem';

describe('<SelectPicker> - DropdownMenuItem', () => {
  it('Should output a li', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem title="title">{Title}</DropdownMenuItem>
    );

    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'LI');
    assert.ok(instanceDom.querySelector('a').className.match(/\bmenu-item\b/));
    assert.equal(instanceDom.innerText, Title);
  });

  it('Should be active', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem title="title" active />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.querySelector('a').className.match(/\bactive\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem title="title" disabled />);

    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.querySelector('a').className.match(/\bdisabled\b/));
  });

  it('Should be focus', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem title="title" focus />);

    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.querySelector('a').className.match(/\bfocus\b/));
  });

  it('Should call onSelect callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem title="title" onSelect={doneOp} />
    );

    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector('a'));
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem title="title" onKeyDown={doneOp} />
    );

    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.keyDown(instanceDom.querySelector('a'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
