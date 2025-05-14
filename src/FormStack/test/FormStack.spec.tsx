import React from 'react';
import FormStack from '../index';
import FormGroup from '../../FormGroup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

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

  it('Should support string spacing', () => {
    render(<FormStack spacing="1rem">Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.style('--rs-form-stack-spacing', '1rem');
  });

  it('Should support responsive spacing', () => {
    render(<FormStack spacing={[10, 20]}>Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.style('--rs-form-stack-spacing', '10px 20px');
  });

  it('Should render with different layouts', () => {
    const { rerender } = render(<FormStack layout="horizontal">Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.class('rs-form-stack-horizontal');

    rerender(<FormStack layout="vertical">Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.class('rs-form-stack-vertical');

    rerender(<FormStack layout="inline">Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.class('rs-form-stack-inline');
  });

  it('Should set fluid class when fluid prop is true', () => {
    render(<FormStack fluid>Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.class('rs-form-stack-fluid');
  });
});
