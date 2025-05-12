import React from 'react';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../../FormGroup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('FormControlLabel', () => {
  testStandardProps(<FormControlLabel />);

  it('Should render a FormControlLabel', () => {
    render(<FormControlLabel>Label</FormControlLabel>);
    expect(screen.getByText('Label')).to.have.class('rs-form-control-label');
  });

  it('Should have `for` in label when set controlId of FormGroup', () => {
    render(
      <FormGroup controlId="test">
        <FormControlLabel>Label</FormControlLabel>
      </FormGroup>
    );
    expect(screen.getByText('Label')).to.have.attribute('for', 'test');
  });
});
