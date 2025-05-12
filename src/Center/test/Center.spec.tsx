import React from 'react';
import Center from '../Center';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Center', () => {
  testStandardProps(<Center />);

  it('Should render a div by default', () => {
    render(<Center>Content</Center>);
    const center = screen.getByText('Content');

    expect(center.tagName).to.equal('DIV');
    expect(center).to.have.class('rs-center');
  });

  it('Should render with inline attribute when inline prop is provided', () => {
    render(<Center inline>Content</Center>);
    const center = screen.getByText('Content');

    expect(center).to.have.attr('data-inline', 'true');
  });
});
