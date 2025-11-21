import React from 'react';
import FormStack from '../index';
import FormGroup from '../../FormGroup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import '../styles/index.scss';

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

    expect(screen.getByText('Stack Content')).to.have.style('gap', '10px');
  });

  it('Should support string spacing', () => {
    render(<FormStack spacing="1rem">Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.style('gap', '16px'); // 1rem = 16px
  });

  it('Should support responsive spacing', () => {
    // Current browser window size set to: 1280x800
    render(<FormStack spacing={{ xs: 10, md: 20, lg: 30 }}>Stack Content</FormStack>);
    expect(screen.getByText('Stack Content')).to.have.style('gap', '30px');
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
