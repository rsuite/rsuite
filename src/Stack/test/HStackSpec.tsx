import React from 'react';
import HStack from '../HStack';
import { render, screen } from '@testing-library/react';
import { testStandardProps, getCssVarValue } from '@test/utils';

describe('HStack', () => {
  testStandardProps(<HStack />);

  it('Should render a reverse direction', () => {
    render(<HStack reverse>Test</HStack>);

    expect(getCssVarValue(screen.getByText('Test'), '--rs-stack-direction')).to.equal(
      'row-reverse'
    );
  });
});
