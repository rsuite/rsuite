import React from 'react';
import Burger from '../Burger';
import sinon from 'sinon';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps, testColorStyle } from '@test/utils';

describe('Burger', () => {
  testStandardProps(<Burger />);
  testColorStyle(Burger, { props: { name: 'burger' } });

  it('Should render a button by default', () => {
    render(<Burger />);
    const button = screen.getByRole('button');
    expect(button.tagName).to.equal('BUTTON');
  });

  it('Should allow custom element via as', () => {
    render(<Burger as="a" aria-label="Toggle navigation" />);
    const element = screen.getByLabelText('Toggle navigation');
    expect(element.tagName).to.equal('A');
  });

  it('Should forward ref to the element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Burger ref={ref} />);
    expect(ref.current).to.exist;
    expect(ref.current?.tagName).to.equal('BUTTON');
  });

  it('Should apply opened class when open', () => {
    render(<Burger open />);
    const button = screen.getByRole('button');
    expect(button).to.have.attr('data-opened', 'true');
  });

  it('Should set aria-pressed according to open', () => {
    const { rerender } = render(<Burger open={false} />);
    let button = screen.getByRole('button');
    expect(button).to.have.attr('aria-pressed', 'false');
    rerender(<Burger open={true} />);
    button = screen.getByRole('button');
    expect(button).to.have.attr('aria-pressed', 'true');
  });

  it('Should call onClick when clicked', () => {
    const handleClick = sinon.spy();
    render(<Burger onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).to.have.been.calledOnce;
  });
});
