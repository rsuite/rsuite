import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Plaintext from '../Plaintext';

describe('Plaintext', () => {
  testStandardProps(<Plaintext />);

  it('Should render a Plaintext', () => {
    render(<Plaintext>Test</Plaintext>);

    expect(screen.getByText('Test')).to.have.class('rs-plaintext');
  });
});
