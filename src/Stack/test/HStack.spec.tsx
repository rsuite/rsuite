import React from 'react';
import HStack from '../HStack';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('HStack', () => {
  testStandardProps(<HStack />);

  it('Should render a reverse direction', () => {
    render(<HStack reverse>Test</HStack>);

    expect(screen.getByText('Test')).to.have.class('rs-stack-row-reverse');
  });
});
