import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import HStack from '../HStack';

describe('HStack', () => {
  testStandardProps(<HStack />);

  it('Should render a default gap', () => {
    render(<HStack>Test</HStack>);

    expect(screen.getByText('Test')).to.have.style('gap', '6px');
  });

  it('Should render a reverse direction', () => {
    render(<HStack reverse>Test</HStack>);

    expect(screen.getByText('Test')).to.have.style('flex-direction', 'row-reverse');
  });
});
