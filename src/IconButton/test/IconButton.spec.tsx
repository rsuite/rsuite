import React from 'react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from '../IconButton';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

describe('IconButton', () => {
  testStandardProps(<IconButton />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should output a button', () => {
    render(<IconButton />);
    const iconButton = screen.getByRole('button');

    expect(iconButton).to.have.class('rs-btn-icon');
    expect(iconButton).to.have.tagName('button');
  });

  it('Should output an icon', async () => {
    render(<IconButton icon={<AddOutlineIcon data-testid="icon" />} />);
    const icon = await screen.findByTestId('icon');

    expect(icon).to.exist;
  });

  it('Should apply circle class when circle prop is true', () => {
    render(<IconButton circle />);
    expect(screen.getByRole('button')).to.have.attr('data-shape', 'circle');
  });

  it('Should not apply circle class when circle prop is false', () => {
    render(<IconButton circle={false} />);
    expect(screen.getByRole('button')).not.to.have.attr('data-shape', 'circle');
  });

  it('Should add circle class to className when circle prop is true', () => {
    render(<IconButton circle />);
    expect(screen.getByRole('button')).to.have.attr('data-shape', 'circle');
  });

  it('Should apply default placement when not specified', () => {
    render(<IconButton />);
    expect(screen.getByRole('button')).to.have.attr('data-placement', 'start');
  });

  it('Should apply correct placement prop', () => {
    const placements = ['left', 'right', 'start', 'end'] as const;

    render(
      <>
        {placements.map(placement => (
          <IconButton key={placement} placement={placement} data-testid={`btn-${placement}`} />
        ))}
      </>
    );

    placements.forEach(placement => {
      const button = screen.getByTestId(`btn-${placement}`);
      expect(button).to.have.attr('data-placement', placement);
    });
  });

  it('Should add data-with-text attribute when children is provided', () => {
    render(<IconButton>Text</IconButton>);
    expect(screen.getByRole('button')).to.have.attr('data-with-text', 'true');
  });

  it('Should not add data-with-text attribute when no children', () => {
    render(<IconButton />);
    expect(screen.getByRole('button')).not.to.have.attr('data-with-text');
  });
});
