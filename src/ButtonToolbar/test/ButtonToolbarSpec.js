import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import ButtonToolbar from '../ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>Title</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
    const node = findDOMNode(instance);
    assert.equal(node.nodeName, 'DIV');
    assert.ok(node.className.match(/\bbtn-toolbar\b/));
    assert.equal(node.getAttribute('role'), 'toolbar');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ButtonToolbar className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<ButtonToolbar style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
