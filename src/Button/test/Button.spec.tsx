import React from 'react';
import Button from '../Button';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Button', () => {
  testStandardProps(<Button />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should output a button', () => {
    render(<Button>Title</Button>);

    const button = screen.getByRole('button');
    expect(button).to.have.text('Title');
    expect(button).to.have.tagName('BUTTON');
    expect(button).to.have.attr('data-appearance', 'default');
  });

  it('Should show the submit type', () => {
    render(<Button type="submit">Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('type', 'submit');
  });

  it('Should show the default type', () => {
    render(<Button>Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('type', 'button');
  });

  it('Should output an anchor if called with a href', () => {
    const href = '/url';
    render(<Button href={href}>Title</Button>);

    expect(screen.getByRole('link')).to.have.attr('href', href);
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Title</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should be disabled', () => {
    render(<Button disabled>Title</Button>);

    expect(screen.getByRole('button')).to.have.property('disabled', true);
  });

  it('Should be loading', () => {
    render(<Button loading>Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('data-loading', 'true');
    expect(screen.getByRole('button')).to.contain('.rs-btn-spin');
  });

  it('Should be disabled link', () => {
    const onClick = vi.fn();

    render(
      <Button disabled href="https://rsuitejs.com" onClick={onClick}>
        Title
      </Button>
    );

    fireEvent.click(screen.getByText('Title'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('Should have block class', () => {
    render(<Button block>Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('data-block', 'true');
  });

  it('Should apply appearance', () => {
    const { rerender } = render(<Button appearance="ghost">Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'ghost');

    rerender(<Button appearance="primary">Title</Button>);
    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'primary');

    rerender(<Button appearance="subtle">Title</Button>);
    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'subtle');

    rerender(<Button appearance="link">Title</Button>);
    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'link');
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    render(
      <Button className="bob" appearance="ghost">
        Title
      </Button>
    );

    expect(screen.getByRole('button')).to.have.class('bob');
    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'ghost');
  });

  it('Should be active', () => {
    render(<Button active>Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('data-active', 'true');
  });

  it('Should have a correct role', () => {
    const { rerender } = render(<Button as="span" />);

    expect(screen.getByRole('button')).to.have.attr('role', 'button');
    expect(screen.getByRole('button')).to.have.tagName('SPAN');

    rerender(<Button as="span" role="combobox" />);

    expect(screen.getByRole('combobox')).to.have.tagName('SPAN');
  });

  it('Should access the underlying <button> element via `ref` attribute', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();

    render(<Button ref={buttonRef}>Text</Button>);

    expect(buttonRef.current).to.be.instanceOf(HTMLButtonElement);
  });

  it('Should render `startIcon` before text', () => {
    render(<Button startIcon={<i>Icon</i>}>Text</Button>);

    expect(screen.getByRole('button')).to.have.text('IconText');
  });

  it('Should render `endIcon` after text', () => {
    render(<Button endIcon={<i>Icon</i>}>Text</Button>);

    expect(screen.getByRole('button')).to.have.text('TextIcon');
  });

  it('Should be toggleable', () => {
    render(<Button toggleable>button</Button>);

    expect(screen.getByRole('button')).to.not.have.attr('data-active', 'true');

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).to.have.attr('data-active', 'true');

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).to.not.have.attr('data-active', 'true');
  });

  it('Should call onToggle callback', () => {
    const onToggle = vi.fn();

    render(
      <Button toggleable onToggle={onToggle}>
        button
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true, expect.anything());

    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(false, expect.anything());
  });
});
