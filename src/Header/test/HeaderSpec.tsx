import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Header from '../Header';

describe('Header', () => {
  testStandardProps(<Header />);

  it('Should render a Header', () => {
    const title = 'Test';
    render(<Header>{title}</Header>);
    expect(screen.getByText(title)).to.have.class('rs-header');
  });
});
