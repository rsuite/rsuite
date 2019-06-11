import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from './TestWrapper';
import HelpBlock from '../src/HelpBlock';
import FormGroup from '../src/FormGroup';

describe('HelpBlock', () => {
  it('Should render a HelpBlock', () => {
    const title = 'Test';
    const instance = getDOMNode(<HelpBlock>{title}</HelpBlock>);
    assert.equal(instance.className, 'rs-help-block');
    assert.equal(instance.tagName, 'SPAN');
    assert.equal(instance.innerHTML, title);
  });

  it('Should render a tooltip ', () => {
    const instance = getInstance(<HelpBlock tooltip />);
    assert.include(getDOMNode(instance).className, 'rs-help-block-tooltip');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-icon-question-circle-o');
  });

  it('Should have `for` in span when set controlId of FormGroup', () => {
    const instance = getDOMNode(
      <FormGroup controlId="test">
        <HelpBlock />
      </FormGroup>
    );
    assert.equal(instance.children[0].getAttribute('for'), 'test');
  });

  it('Should have `for` in span ', () => {
    const id = 'Test';
    const instance = getDOMNode(<HelpBlock htmlFor={id} />);
    assert.ok(instance.getAttribute('for'), id);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<HelpBlock className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<HelpBlock style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<HelpBlock classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
