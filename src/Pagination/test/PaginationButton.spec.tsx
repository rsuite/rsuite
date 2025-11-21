import React, { Ref } from 'react';
import PaginationButton from '../PaginationButton';
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
    expect(button).to.have.attr('disabled');
    expect(button).to.have.attr('aria-disabled', 'true');
    expect(button).to.have.attr('data-disabled', 'true');
  });

  it('Should be active', () => {
    render(<PaginationButton eventKey="" active />);
    const button = screen.getByRole('button');
    expect(button).to.have.attr('data-active', 'true');
    expect(button).to.have.attr('aria-current', 'page');
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

  it('Should pass eventKey to custom element', () => {
    const Button = React.forwardRef(function Button(props: any, ref: Ref<HTMLButtonElement>) {
      return (
        <button ref={ref} {...props}>
          button
        </button>
      );
    });
    render(<PaginationButton eventKey={1} as={Button} />);
    expect(screen.getByText('button')).to.have.attr('data-event-key', '1');
  });
});
