import React from 'react';
import { testStandardProps } from '@test/utils';
import FlexboxGrid from '../FlexboxGrid';
import { render } from '@testing-library/react';

describe('FlexboxGrid', () => {
  testStandardProps(<FlexboxGrid />);

  it('Should render a FlexboxGrid', () => {
    const { container } = render(<FlexboxGrid>Test</FlexboxGrid>);
    expect(container.firstChild).to.have.class('rs-flex-box-grid');
  });

  it('Should be aligned on the top', () => {
    const { container } = render(<FlexboxGrid align="top" />);
    expect(container.firstChild).to.have.class('rs-flex-box-grid-top');
  });

  it('Should be justify content on the center', () => {
    const { container } = render(<FlexboxGrid justify="center" />);
    expect(container.firstChild).to.have.class('rs-flex-box-grid-center');
  });
});
