import React from 'react';
import VStack from '../VStack';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../styles/index.scss';

describe('VStack', () => {
  it('Should render a default align', () => {
    render(<VStack>Test</VStack>);

    expect(screen.getByText('Test')).to.have.style('align-items', 'flex-start');
  });
});
