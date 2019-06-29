import React from 'react';
import { getDOMNode } from '@test/testUtils';

import FormGroup from '../FormGroup';
import Input from '../../Input';
import ControlLabel from '../../ControlLabel';

describe('FormGroup', () => {
  it('Should render a FormGroup', () => {
    let title = 'Test';
    let instance = getDOMNode(<FormGroup>{title}</FormGroup>);
    assert.equal(instance.className, 'rs-form-group');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a validation State', () => {
    let instance = getDOMNode(<FormGroup validationState="warning" />);
    assert.ok(instance.className.match(/\bhas-warning\b/));
  });

  it('Should have a warning State', () => {
    let instance = getDOMNode(<FormGroup validationState="warning" isValid />);
    assert.ok(instance.className.match(/\bhas-warning\b/));
    assert.ok(!instance.className.match(/\bhas-success\b/));
  });

  it('Should have a warning State', () => {
    let instance = getDOMNode(<FormGroup validationState="warning" isValid={false} />);

    assert.ok(instance.className.match(/\bhas-warning\b/));
    assert.ok(!instance.className.match(/\bhas-error\b/));
  });

  it('Should have a error State', () => {
    let instance = getDOMNode(<FormGroup isValid={false} />);
    assert.ok(instance.className.match(/\bhas-error\b/));
  });

  it('Should have a success State', () => {
    let instance = getDOMNode(<FormGroup isValid />);
    assert.ok(instance.className.match(/\bhas-success\b/));
  });

  it('Should add size', () => {
    let instance = getDOMNode(<FormGroup size="lg" />);
    assert.ok(instance.className.match(/\bform-group-lg\b/));
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
          <ControlLabel />
          <Input />
        </div>
      </FormGroup>
    );
    assert.equal(instance.querySelector('.rs-control-label').getAttribute('for'), 'name');
    assert.equal(instance.querySelector('.rs-input').getAttribute('id'), 'name');
  });

  it('Should use their own htmlFor and id', () => {
    let instance = getDOMNode(
      <FormGroup controlId="name">
        <div>
          <ControlLabel htmlFor="email" />
          <Input id="email" />
        </div>
      </FormGroup>
    );
    assert.equal(instance.querySelector('.rs-control-label').getAttribute('for'), 'email');
    assert.equal(instance.querySelector('.rs-input').getAttribute('id'), 'email');
  });
});
