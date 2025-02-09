import React from 'react';
import Kbd from '../Kbd';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import type { SizeType } from '@/internals/types';

describe('Kbd', () => {
  testStandardProps(<Kbd />);

  it('Should render a kbd element', () => {
    const { container } = render(<Kbd />);
    expect(container.firstChild).to.have.tagName('kbd');
  });

  it('Should render a kbd element with given children', () => {
    render(<Kbd>Test</Kbd>);
    expect(screen.getByText('Test')).to.exist;
  });

  ['sm', 'md', 'lg', 'xl'].forEach(size => {
    it(`Should render a kbd element with ${size} size`, () => {
      render(<Kbd size={size as SizeType}>Test</Kbd>);
      expect(screen.getByText('Test')).to.have.class(`rs-kbd-${size}`);
    });
  });
});
