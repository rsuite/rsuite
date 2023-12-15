import React from 'react';
import { testStandardProps } from '@test/utils';
import FlexboxGridItem from '../FlexboxGridItem';
import Col from '../../Col';
import { render } from '@testing-library/react';

describe('FlexboxGridItem', () => {
  testStandardProps(<FlexboxGridItem />);

  it('Should render a FlexboxGridItem', () => {
    const { container } = render(<FlexboxGridItem>Test</FlexboxGridItem>);
    expect(container.firstChild).to.have.class('rs-flex-box-grid-item');
  });

  it('Should be colspan', () => {
    const { container } = render(<FlexboxGridItem colspan={1} />);
    expect(container.firstChild).to.have.class('rs-flex-box-grid-item-1');
  });

  it('Should be order', () => {
    const { container } = render(<FlexboxGridItem order={1} />);
    expect(container.firstChild).to.have.class('rs-flex-box-grid-item-order-1');
  });

  it('Should render a col', () => {
    const { container } = render(<FlexboxGridItem as={Col} md={1} />);
    expect(container.firstChild).to.have.class('rs-col');
    expect(container.firstChild).to.have.class('rs-col-md-1');
  });
});
