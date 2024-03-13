import React from 'react';
import sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import ListCheckItem from '../ListCheckItem';

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
    const onSelect = sinon.spy();
    render(<ListCheckItem title="title" onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = sinon.spy();
    render(<ListCheckItem title="title" onKeyDown={onKeyDown} />);

    fireEvent.keyDown(screen.getByRole('checkbox'));
    expect(onKeyDown).to.have.been.calledOnce;
  });

  it('Should call onCheck callback', () => {
    const onSelect = sinon.spy();
    const onCheck = sinon.spy();

    render(<ListCheckItem title="title" onCheck={onCheck} onSelectItem={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onCheck).to.have.been.calledOnce;
    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should call onSelectItem callback', () => {
    const onSelectItem = sinon.spy();
    render(<ListCheckItem title="title" onSelectItem={onSelectItem} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onSelectItem).to.have.been.calledOnce;
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
