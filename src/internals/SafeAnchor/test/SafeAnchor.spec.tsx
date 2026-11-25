import React from 'react';
import SafeAnchor from '../SafeAnchor';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SafeAnchor', () => {
  it('Should output a Anchor', () => {
    const { container } = render(<SafeAnchor>Title</SafeAnchor>);

    expect(container.firstChild).to.have.attr('href', '#');
    expect(container.firstChild).to.have.attr('role', 'button');
    expect(container.firstChild).to.have.text('Title');
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();
    render(<SafeAnchor onClick={onClick}>Title</SafeAnchor>);

    fireEvent.click(screen.getByText('Title'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();
    render(
      <SafeAnchor onClick={onClick} href="#">
        Title
      </SafeAnchor>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should not prevent the default value when href is provided', () => {
    const handleClick = vi.fn(event => {
      event.persist();
    });
    render(
      <SafeAnchor onClick={handleClick} href="#foo">
        Title
      </SafeAnchor>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick.mock.calls[0][0].defaultPrevented).toBe(false);
  });

  it('Should disabled onClick callback and tabIndex = -1', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <SafeAnchor onClick={handleClick} disabled>
        Title
      </SafeAnchor>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(handleClick).not.toHaveBeenCalled();
    expect(container.firstChild).to.have.attr('tabindex', '-1');
  });

  it('Should output an anchor and has href', () => {
    const href = '/url';
    const { container } = render(<SafeAnchor href={href}>Title</SafeAnchor>);

    expect(container.firstChild).to.not.have.attr('role');
    expect(container.firstChild).to.have.attr('href', href);
  });

  it('Should have a custom className', () => {
    const { container } = render(<SafeAnchor className="custom" />);
    expect(container.firstChild).to.have.class('custom');
  });
});
