import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import FormGroup from '../FormGroup';
import Input from '../../Input';
import FormControlLabel from '../../FormControlLabel';

describe('FormGroup', () => {
  testStandardProps(<FormGroup />);

  it('Should render a form group', () => {
    render(<FormGroup>Test</FormGroup>);

    expect(screen.getByRole('group')).to.have.class('rs-form-group');
  });

  it('Should be assigned a controlId', () => {
    render(
      <FormGroup controlId="name">
        <div>
          <FormControlLabel>Label</FormControlLabel>
          <Input />
        </div>
      </FormGroup>
    );
  });

  it('Should use their own htmlFor and id', () => {
    render(
      <FormGroup controlId="name">
        <div>
          <FormControlLabel htmlFor="email">Label</FormControlLabel>
          <Input id="email" />
        </div>
      </FormGroup>
    );

    expect(screen.getByText('Label')).to.have.attribute('for', 'email');
    expect(screen.getByRole('textbox')).to.have.attribute('id', 'email');
  });
});
