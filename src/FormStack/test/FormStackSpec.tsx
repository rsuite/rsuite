import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import FormStack from '../index';
import FormGroup from '../../FormGroup';
import '../styles/index.less';

describe('FormStack', () => {
  testStandardProps(<FormStack />);

  it('Should render a FormStack', () => {
    render(<FormStack>Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.class('rs-form-stack');
  });

  it('Should render with fluid style', () => {
    render(<FormStack fluid>Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.class('rs-form-stack-fluid');
  });

  it('Should have spacing between items', () => {
    render(
      <FormGroup controlId="test">
        <FormStack spacing={10}>Stack Content</FormStack>
      </FormGroup>
    );

    expect(screen.getByText('Stack Content')).to.have.style('--rs-form-stack-spacing', '10px');
  });
});
