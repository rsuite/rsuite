import React from 'react';
import ListItem from '../ListItem';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

describe('picker - ListItem', () => {
  it('Should output a item', () => {
    render(<ListItem title="title" />);

    expect(screen.getByRole('option')).to.exist;
  });

  it('Should be active', () => {
    render(<ListItem classPrefix="item" title="title" active />);

    expect(screen.getByRole('option')).to.contain('.rs-item-active');
  });

  it('Should be disabled', () => {
    render(<ListItem classPrefix="item" title="title" disabled />);

    expect(screen.getByRole('option')).to.contain('.rs-item-disabled');
  });

  it('Should be focus', () => {
    render(<ListItem classPrefix="item" title="title" focus />);

    expect(screen.getByRole('option')).to.contain('.rs-item-focus');
  });

  it('Should call onSelect callback', () => {
    const onSelect = vi.fn();
    render(<ListItem title="title" onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('option'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = vi.fn();
    render(<ListItem title="title" onKeyDown={onKeyDown} />);

    fireEvent.keyDown(screen.getByRole('option'));
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Should have a custom className', () => {
    render(<ListItem className="custom" />);
    expect(screen.getByRole('option')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    render(<ListItem style={{ fontSize: 12 }} />);
    expect(screen.getByRole('option')).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    render(<ListItem classPrefix="custom-prefix" />);
    expect(screen.getByRole('option')).to.contain('.rs-custom-prefix');
  });
});
