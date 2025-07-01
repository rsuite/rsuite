import React from 'react';
import Loader from '../Loader';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Loader', () => {
  testStandardProps(<Loader />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should render a Loader', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).to.have.class('rs-loader');
  });

  it('Should be center', () => {
    render(<Loader center />);
    expect(screen.getByRole('status')).to.have.attr('data-center', 'true');
  });

  it('Should be inverse', () => {
    render(<Loader inverse />);
    expect(screen.getByRole('status')).to.have.attr('data-inverse', 'true');
  });

  it('Should have a backdrop', () => {
    render(<Loader backdrop />);
    expect(screen.getByRole('status')).to.have.contain('.rs-loader-backdrop');
  });

  it('Should have content', () => {
    render(<Loader content="content" />);
    expect(screen.getByRole('status')).to.have.text('content');
  });

  it('Should render speed', () => {
    const { rerender } = render(<Loader speed="fast" />);
    expect(screen.getByRole('status')).to.have.attr('data-speed', 'fast');

    rerender(<Loader speed="normal" />);
    expect(screen.getByRole('status')).to.have.attr('data-speed', 'normal');

    rerender(<Loader speed="slow" />);
    expect(screen.getByRole('status')).to.have.attr('data-speed', 'slow');

    rerender(<Loader speed="paused" />);
    expect(screen.getByRole('status')).to.have.attr('data-speed', 'paused');
  });

  describe('Accessibility', () => {
    it('Should have role status', () => {
      render(<Loader />);
      expect(screen.queryByRole('status')).to.exist;
    });

    it('Should have aria-labelledby when content is provided', () => {
      render(<Loader content="content" />);
      expect(screen.getByRole('status')).to.have.attr('aria-labelledby');
    });
  });
});
