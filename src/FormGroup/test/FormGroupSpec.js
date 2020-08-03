import React from 'react';
import { getDOMNode } from '@test/testUtils';

import FormGroup from '../FormGroup';
import Input from '../../Input';
import FormControlLabel from '../../FormControlLabel';

describe('FormGroup', () => {
  it('Should render a FormGroup', () => {
    let title = 'Test';
    let instance = getDOMNode(<FormGroup>{title}</FormGroup>);
    assert.equal(instance.className, 'rs-form-group');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<FormGroup className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<FormGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<FormGroup classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should be assigned a controlId', () => {
    let instance = getDOMNode(
      <FormGroup controlId="name">
        <div>
          <FormControlLabel />
          <Input />
        </div>
      </FormGroup>
    );
    assert.equal(instance.querySelector('.rs-form-control-label').getAttribute('for'), 'name');
    assert.equal(instance.querySelector('.rs-input').getAttribute('id'), 'name');
  });

  it('Should use their own htmlFor and id', () => {
    let instance = getDOMNode(
      <FormGroup controlId="name">
        <div>
          <FormControlLabel htmlFor="email" />
          <Input id="email" />
        </div>
      </FormGroup>
    );
    assert.equal(instance.querySelector('.rs-form-control-label').getAttribute('for'), 'email');
    assert.equal(instance.querySelector('.rs-input').getAttribute('id'), 'email');
  });
});
