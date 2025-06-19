import React from 'react';
import Footer from '../index';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '../styles/index.scss';

describe('Footer styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).to.have.style('flex', '0 0 auto');
  });
});
