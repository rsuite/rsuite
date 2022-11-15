import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../../FormGroup';

describe('FormControlLabel', () => {
  testStandardProps(<FormControlLabel />);

  it('Should render a FormControlLabel', () => {
    const title = 'Test';
    const instance = getDOMNode(<FormControlLabel>{title}</FormControlLabel>);
    assert.include(instance.className, 'form-control-label');
    assert.equal(instance.innerHTML, title);
    assert.equal(instance.tagName, 'LABEL');
  });

  it('Should have `for` in label when set controlId of FormGroup', () => {
    const instance = getDOMNode(
      <FormGroup controlId="test">
        <FormControlLabel />
      </FormGroup>
    );
    assert.equal(instance.children[0].getAttribute('for'), 'test');
  });
});
