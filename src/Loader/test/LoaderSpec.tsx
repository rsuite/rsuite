import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Loader from '../Loader';

describe('Loader', () => {
  testStandardProps(<Loader />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should render a Loader', () => {
    render(<Loader />);
    expect(screen.getByRole('status').firstChild).to.have.class('rs-loader');
  });

  it('Should be center', () => {
    render(<Loader center />);
    expect(screen.getByRole('status')).to.have.class('rs-loader-center');
  });

  it('Should be inverse', () => {
    render(<Loader inverse />);
    expect(screen.getByRole('status')).to.have.class('rs-loader-inverse');
  });

  it('Should have a backdrop', () => {
    render(<Loader backdrop />);
    expect(screen.getByRole('status').firstChild).to.have.class('rs-loader-backdrop');
  });

  it('Should have content', () => {
    render(<Loader content="content" />);
    expect(screen.getByRole('status')).to.have.text('content');
  });

  it('Should have a speed', () => {
    render(<Loader speed="fast" />);
    expect(screen.getByRole('status')).to.have.class('rs-loader-speed-fast');
  });

  it('Should be paused', () => {
    render(<Loader speed="paused" />);
    expect(screen.getByRole('status')).to.have.class('rs-loader-speed-paused');
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
