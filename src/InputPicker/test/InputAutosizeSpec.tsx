import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InputAutosize from '../InputAutosize';
import sinon from 'sinon';

describe('InputPicker - InputAutosize', () => {
  it('Should have a custom className', () => {
    const { container } = render(<InputAutosize className="custom" />);

    expect(container.firstChild).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const { container } = render(<InputAutosize style={{ fontSize: 12 }} />);
    expect(container.firstChild).to.have.style('font-size', '12px');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();

    render(<InputAutosize onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a placeholder', () => {
    const { container } = render(<InputAutosize placeholder="placeholder" />);

    expect(screen.getByRole('textbox')).to.have.attribute('placeholder', 'placeholder');
    expect(container.firstChild).to.have.text('placeholder');
  });

  it('Should have a default width', () => {
    render(<InputAutosize />);

    expect(screen.getByRole('textbox')).to.have.style('width', '10px');
  });
});
