import React from 'react';
import VStack from '../VStack';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('VStack', () => {
  testStandardProps(<VStack />);

  it('Should render a default gap', () => {
    render(<VStack>Test</VStack>);

    expect(screen.getByText('Test')).to.have.style('gap', '6px');
  });

  it('Should render a default align', () => {
    render(<VStack>Test</VStack>);

    expect(screen.getByText('Test')).to.have.style('align-items', 'flex-start');
  });

  it('Should render a reverse direction', () => {
    render(<VStack reverse>Test</VStack>);

    expect(screen.getByText('Test')).to.have.class('rs-stack-column-reverse');
  });
});
