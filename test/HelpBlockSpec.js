import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import HelpBlock from '../src/HelpBlock';
import FormGroup from '../src/FormGroup';

describe('HelpBlock', () => {
  it('Should render a HelpBlock', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<HelpBlock>{title}</HelpBlock>);
    assert.equal(findDOMNode(instance).className, 'rs-help-block');
    assert.equal(findDOMNode(instance).tagName, 'SPAN');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have `for` in span when set controlId of FormGroup', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <FormGroup controlId="test">
        <HelpBlock />
      </FormGroup>
    );
    assert.equal(findDOMNode(instance).children[0].getAttribute('for'), 'test');
  });

  it('Should have `for` in span ', () => {
    const id = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<HelpBlock htmlFor={id} />);
    assert.ok(findDOMNode(instance).getAttribute('for'), id);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<HelpBlock className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<HelpBlock style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
