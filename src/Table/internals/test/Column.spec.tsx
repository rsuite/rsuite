import React from 'react';
import Column from '../Column';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Column', () => {
  it('Should output a null', () => {
    const { container } = render(<Column />);

    expect(container.innerHTML).to.be.equal('');
  });
});
