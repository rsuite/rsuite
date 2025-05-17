import React from 'react';
import Header from '../Header';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Header', () => {
  testStandardProps(<Header />);

  it('Should render a Header', () => {
    const title = 'Test';
    render(<Header>{title}</Header>);
    expect(screen.getByText(title)).to.have.class('rs-header');
  });
});
