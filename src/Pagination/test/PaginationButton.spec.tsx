import React, { Ref } from 'react';
import PaginationButton, { PaginationButtonProps } from '../PaginationButton';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('PaginationButton', () => {
  testStandardProps(<PaginationButton eventKey="" />);

  it('Should render a button with correct text', () => {
    render(<PaginationButton eventKey="">Test</PaginationButton>);
    const button = screen.getByRole('button');
    expect(button).to.exist;
    expect(button).to.have.text('Test');
  });

  it('Should have correct ARIA attributes', () => {
    render(
      <PaginationButton eventKey="" active disabled>
        Test
      </PaginationButton>
    );
    const button = screen.getByRole('button');
    expect(button).to.have.attribute('aria-disabled', 'true');
    expect(button).to.have.attribute('aria-current', 'page');
  });

  it('Should be disabled', () => {
    render(<PaginationButton eventKey="" disabled />);
    const button = screen.getByRole('button');
    expect(button).to.have.attribute('disabled');
    expect(button).to.have.attribute('aria-disabled', 'true');
    expect(button).to.have.class('rs-pagination-btn-disabled');
  });

  it('Should be active', () => {
    render(<PaginationButton eventKey="" active />);
    const button = screen.getByRole('button');
    expect(button).to.have.class('rs-pagination-btn-active');
    expect(button).to.have.attribute('aria-current', 'page');
  });

  it('Should call onSelect callback with correct eventKey', () => {
    const onSelect = vi.fn();
    render(<PaginationButton onSelect={onSelect} eventKey={10} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(10, expect.any(Object));
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();
    render(<PaginationButton onClick={onClick} eventKey={10} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should not call onSelect when disabled', () => {
    const onSelect = vi.fn();
    render(<PaginationButton onSelect={onSelect} eventKey={10} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Should not call onSelect when event is prevented', () => {
    const onSelect = vi.fn();
    const onClick = (e: React.MouseEvent) => {
      e.preventDefault();
    };
    render(<PaginationButton onSelect={onSelect} onClick={onClick} eventKey={10} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Custom elements can get the active prop', () => {
    const Button = React.forwardRef(({ active }: PaginationButtonProps, ref: Ref<HTMLElement>) => {
      return <span ref={ref}>{active ? 'active' : 'inactive'}</span>;
    });

    Button.displayName = 'Button';

    const { rerender } = render(<PaginationButton eventKey="" active as={Button} />);
    expect(screen.getByText('active')).to.exist;

    rerender(<PaginationButton eventKey="" active={false} as={Button} />);
    expect(screen.getByText('inactive')).to.exist;
  });

  it('Custom elements can get the eventKey prop', () => {
    const Button = React.forwardRef(function Button(
      { eventKey, ...rest }: PaginationButtonProps,
      ref: Ref<HTMLElement>
    ) {
      return (
        <span ref={ref} {...(rest as any)}>
          {eventKey}
        </span>
      );
    });
    render(<PaginationButton eventKey={1} as={Button} />);
    expect(screen.getByText('1')).to.exist;
  });
});
