import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import FormGroup from '../FormGroup';
import Input from '../../Input';
import FormControlLabel from '../../FormControlLabel';

describe('FormGroup', () => {
  testStandardProps(<FormGroup />);

  it('Should render a FormGroup', () => {
    let title = 'Test';
    let instance = getDOMNode(<FormGroup>{title}</FormGroup>);
    assert.equal(instance.className, 'rs-form-group');
    assert.equal(instance.innerHTML, title);
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
