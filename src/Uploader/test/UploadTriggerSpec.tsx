import React from 'react';
import sinon from 'sinon';

import UploadTrigger from '../UploadTrigger';
import { fireEvent, render } from '@testing-library/react';

describe('UploadTrigger', () => {
  it('Should output a UploadTrigger', () => {
    const { container } = render(<UploadTrigger />);
    expect(container.firstChild).to.have.class('rs-uploader-trigger');
  });

  it('Should be disabled', () => {
    const { container } = render(<UploadTrigger disabled />);
    expect(container.firstChild).to.have.class('rs-uploader-trigger-disabled');
  });

  it('Should be multipled', () => {
    const { container } = render(<UploadTrigger multiple />);

    expect(container.querySelector('input[multiple]')).to.exist;
  });

  it('Should have a accept', () => {
    const { container } = render(<UploadTrigger accept=".jpg" />);

    expect(container.querySelector('input[accept=".jpg"]')).to.exist;
  });

  it('Should render custom component', () => {
    const { container } = render(<UploadTrigger as={'a'} />);
    expect(container.querySelector('.rs-uploader-trigger-btn')).to.has.tagName('A');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const { container } = render(<UploadTrigger onChange={onChange} />);

    fireEvent.change(container.querySelector('input') as HTMLElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a name', () => {
    const { container } = render(<UploadTrigger name="file" />);

    expect(container.querySelector('input[name="file"]')).to.exist;
  });

  it('Should have a custom className', () => {
    const { container } = render(<UploadTrigger className="custom" />);
    expect(container.firstChild).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const { container } = render(<UploadTrigger style={{ fontSize: 12 }} />);

    expect(container.querySelector('button')).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    const { container } = render(<UploadTrigger classPrefix="custom-prefix" />);
    expect(container.firstChild).to.have.class(/\bcustom-prefix\b/);
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnter = sinon.spy();
    const { container } = render(<UploadTrigger draggable onDragEnter={onDragEnter} />);
    const button = container.querySelector('button') as HTMLElement;

    fireEvent.dragEnter(button);
    expect(onDragEnter).to.have.been.calledOnce;
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOver = sinon.spy();
    const { container } = render(<UploadTrigger draggable onDragOver={onDragOver} />);
    const button = container.querySelector('button') as HTMLElement;

    fireEvent.dragOver(button);
    expect(onDragOver).to.have.been.calledOnce;
  });

  it('Should call `onDragLeave` callback', () => {
    const onDragLeave = sinon.spy();
    const { container } = render(<UploadTrigger draggable onDragLeave={onDragLeave} />);
    const button = container.querySelector('button') as HTMLElement;

    fireEvent.dragLeave(button);
    expect(onDragLeave).to.have.been.calledOnce;
  });
});
