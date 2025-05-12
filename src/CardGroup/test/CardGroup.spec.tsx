import React from 'react';
import CardGroup from '../CardGroup';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/utils';
import { render } from '@testing-library/react';

describe('CardGroup', () => {
  testStandardProps(<CardGroup />);

  it('Should render a columns CSS variable', () => {
    const { container } = render(<CardGroup columns={2} />);

    expect(container.firstChild).to.have.style('--rs-card-group-columns', '2');
  });

  it('Should render a spacing CSS variable', () => {
    const { container, rerender } = render(<CardGroup spacing={20} />);

    expect(container.firstChild).to.have.style('--rs-card-group-spacing', '20px');

    rerender(<CardGroup spacing="1rem" />);

    expect(container.firstChild).to.have.style('--rs-card-group-spacing', '1rem');
  });
});
