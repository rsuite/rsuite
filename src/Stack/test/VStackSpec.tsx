import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import VStack from '../VStack';

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

    expect(screen.getByText('Test')).to.have.style('flex-direction', 'column-reverse');
  });
});
