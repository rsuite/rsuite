import React from 'react';
import RadioTile from '../RadioTile';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('RadioTile', () => {
  testStandardProps(<RadioTile />);

  it('Should render a radio', () => {
    render(<RadioTile>Test</RadioTile>);
    expect(screen.getByRole('radio')).to.exist;
    expect(screen.getByText('Test')).to.have.class('rs-radio-tile-content');
  });

  it('Should have a `Test` label', () => {
    render(<RadioTile label="Test" />);

    expect(screen.getByText('Test')).to.have.class('rs-radio-tile-label');
  });

  it('Should have a `Test` icon', () => {
    render(<RadioTile icon="Test" />);

    expect(screen.getByText('Test')).to.have.class('rs-radio-tile-icon');
  });

  it('Should be disabled', () => {
    render(
      <RadioTile disabled data-testid="radio">
        Test
      </RadioTile>
    );

    expect(screen.getByRole('radio')).to.have.attr('disabled');
    expect(screen.getByTestId('radio')).to.have.class('rs-radio-tile-disabled');
  });

  it('Should be checked', () => {
    render(
      <RadioTile checked data-testid="radio">
        Test
      </RadioTile>
    );

    expect(screen.getByRole('radio')).to.have.attr('checked');
    expect(screen.getByTestId('radio')).to.have.class('rs-radio-tile-checked');
  });

  it('Should be defaultChecked', () => {
    render(
      <RadioTile defaultChecked data-testid="radio">
        Test
      </RadioTile>
    );

    expect(screen.getByRole('radio')).to.have.attr('checked');
    expect(screen.getByTestId('radio')).to.have.class('rs-radio-tile-checked');
  });

  it('Should have a `Test` value', () => {
    render(<RadioTile defaultValue="text">Test</RadioTile>);

    expect(screen.getByRole('radio')).to.have.attr('value', 'text');
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();

    render(<RadioTile onClick={onClick}>Title</RadioTile>);
    fireEvent.click(screen.getByText('Title'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = vi.fn();
    render(
      <RadioTile onChange={onChange} value="100">
        Title
      </RadioTile>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(onChange).toHaveBeenCalledWith('100', expect.any(Object));
  });

  it('Should call onBlur callback', () => {
    const onBlur = vi.fn();

    render(<RadioTile onBlur={onBlur}>Title</RadioTile>);
    fireEvent.blur(screen.getByRole('radio'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('Should call onFocus callback', () => {
    const onFocus = vi.fn();

    render(<RadioTile onFocus={onFocus}>Title</RadioTile>);
    fireEvent.focus(screen.getByRole('radio'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
