import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Button from '../src/Button';
import ButtonGroup from '../src/ButtonGroup';
import ButtonToolbar from '../src/ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>
            Title
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
    let node = ReactDOM.findDOMNode(instance);
    assert.equal(node.nodeName, 'DIV');
    assert.ok(node.className.match(/\bbtn-toolbar\b/));
    assert.equal(node.getAttribute('role'), 'toolbar');
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ButtonToolbar style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });


});
