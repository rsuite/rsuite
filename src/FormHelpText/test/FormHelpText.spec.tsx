import React from 'react';
import FormHelpText from '../FormHelpText';
import FormGroup from '../../FormGroup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('FormHelpText', () => {
  testStandardProps(<FormHelpText />);

  it('Should render a FormHelpText', () => {
    render(<FormHelpText>Help Text</FormHelpText>);

    expect(screen.getByText('Help Text')).to.have.class('rs-form-help-text');
  });

  it('Should render a tooltip ', async () => {
    render(<FormHelpText tooltip>Help Text</FormHelpText>);

    expect(screen.getByLabelText('help')).to.exist;
  });

  it('Should have `id` in FormHelpText when set controlId of FormGroup', () => {
    render(
      <FormGroup controlId="test">
        <FormHelpText>Help Text</FormHelpText>
      </FormGroup>
    );

    expect(screen.getByText('Help Text')).to.have.attribute('id', 'test-help-text');
  });
});
