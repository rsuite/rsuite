import React from 'react';
import ListCheckItem from '../ListCheckItem';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

describe('picker - ListCheckItem', () => {
  it('Should output a item', () => {
    render(<ListCheckItem title="title">title</ListCheckItem>);

    expect(screen.getByRole('option')).to.exist;
  });

  it('Should be active', () => {
    render(<ListCheckItem title="title" active />);

    expect(screen.getByRole('checkbox')).to.have.attribute('aria-checked', 'true');
  });

  it('Should be disabled', () => {
    render(<ListCheckItem title="title" disabled />);

    expect(screen.getByRole('checkbox')).to.have.attribute('aria-disabled', 'true');
  });

  it('Should be focus', () => {
    render(<ListCheckItem title="title" focus />);

    expect(screen.getByRole('option')).to.contain('.rs-check-item-focus');
  });

  it('Should call onSelect callback', () => {
    const onSelect = vi.fn();
    render(<ListCheckItem title="title" onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = vi.fn();
    render(<ListCheckItem title="title" onKeyDown={onKeyDown} />);

    fireEvent.keyDown(screen.getByRole('checkbox'));
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Should call onCheck callback', () => {
    const onSelect = vi.fn();
    const onCheck = vi.fn();

    render(<ListCheckItem title="title" onCheck={onCheck} onSelectItem={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('Should call onSelectItem callback', () => {
    const onSelectItem = vi.fn();
    render(<ListCheckItem title="title" onSelectItem={onSelectItem} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onSelectItem).toHaveBeenCalledTimes(1);
  });

  it('Should have a custom className', () => {
    render(<ListCheckItem className="custom" />);
    expect(screen.getByRole('option')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    render(<ListCheckItem style={{ fontSize: 12 }} />);
    expect(screen.getByRole('option')).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    render(<ListCheckItem classPrefix="custom-prefix" />);
    expect(screen.getByRole('option')).to.contain('.rs-custom-prefix');
  });
});
