import React from 'react';
import { getDOMNode } from '@test/testUtils';
import ControlLabel from '../ControlLabel';
import FormGroup from '../../FormGroup';

describe('ControlLabel', () => {
  it('Should render a ControlLabel', () => {
    let title = 'Test';
    let instance = getDOMNode(<ControlLabel>{title}</ControlLabel>);
    assert.include(instance.className, 'control-label');
    assert.equal(instance.innerHTML, title);
    assert.equal(instance.tagName, 'LABEL');
  });

  it('Should have sr-only className', () => {
    let title = 'Test';
    let instance = getDOMNode(<ControlLabel srOnly>{title}</ControlLabel>);
    assert.ok(instance.className.match(/\bsr-only\b/));
  });

  it('Should have `for` in label when set controlId of FormGroup', () => {
    let instance = getDOMNode(
      <FormGroup controlId="test">
        <ControlLabel />
      </FormGroup>
    );
    assert.equal(instance.children[0].getAttribute('for'), 'test');
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<ControlLabel className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<ControlLabel style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ControlLabel classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
