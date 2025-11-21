import React from 'react';
import Plaintext from '../Plaintext';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Plaintext', () => {
  testStandardProps(<Plaintext />);

  it('Should render a Plaintext', () => {
    render(<Plaintext>Test</Plaintext>);

    expect(screen.getByText('Test')).to.have.class('rs-plaintext');
  });
});
