import React from 'react';
import { getDOMNode } from '@test/testUtils';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../../FormGroup';

describe('FormControlLabel', () => {
  it('Should render a FormControlLabel', () => {
    let title = 'Test';
    let instance = getDOMNode(<FormControlLabel>{title}</FormControlLabel>);
    assert.include(instance.className, 'form-control-label');
    assert.equal(instance.innerHTML, title);
    assert.equal(instance.tagName, 'LABEL');
  });

  it('Should have `for` in label when set controlId of FormGroup', () => {
    let instance = getDOMNode(
      <FormGroup controlId="test">
        <FormControlLabel />
      </FormGroup>
    );
    assert.equal(instance.children[0].getAttribute('for'), 'test');
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<FormControlLabel className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<FormControlLabel style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<FormControlLabel classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
