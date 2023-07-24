import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import UploadTrigger from '../UploadTrigger';
import { render } from '@testing-library/react';

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
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.ok(container.querySelector('input[multiple]'));
  });

  it('Should have a accept', () => {
    const { container } = render(<UploadTrigger accept=".jpg" />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.ok(container.querySelector('input[accept=".jpg"]'));
  });

  it('Should render custom component', () => {
    const { container } = render(<UploadTrigger as={'a'} />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.equal((container.querySelector('.rs-uploader-trigger-btn') as HTMLElement).tagName, 'A');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const { container } = render(<UploadTrigger onChange={onChange} />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    ReactTestUtils.Simulate.change(container.querySelector('input') as HTMLElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a name', () => {
    const { container } = render(<UploadTrigger name="file" />);
    console.log(container);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.ok(container.querySelector('input[name="file"]'));
  });

  it('Should have a custom className', () => {
    const { container } = render(<UploadTrigger className="custom" />);
    expect(container.firstChild).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const { container } = render(<UploadTrigger style={{ fontSize }} />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.equal((container.querySelector('button') as HTMLElement).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const { container } = render(<UploadTrigger classPrefix="custom-prefix" />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.ok(container.querySelector('.rs-custom-prefix')?.className.match(/\bcustom-prefix\b/));
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    const { container } = render(<UploadTrigger draggable onDragEnter={onDragEnterSpy} />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const button = container.querySelector('button') as HTMLElement;

    ReactTestUtils.Simulate.dragEnter(button);
    assert.ok(onDragEnterSpy.calledOnce);
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    const { container } = render(<UploadTrigger draggable onDragOver={onDragOverSpy} />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const button = container.querySelector('button') as HTMLElement;

    ReactTestUtils.Simulate.dragOver(button);
    assert.ok(onDragOverSpy.calledOnce);
  });

  it('Should call `onDragLeave` callback', () => {
    const onDragLeaveSpy = sinon.spy();
    const { container } = render(<UploadTrigger draggable onDragLeave={onDragLeaveSpy} />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const button = container.querySelector('button') as HTMLElement;

    ReactTestUtils.Simulate.dragLeave(button);
    assert.ok(onDragLeaveSpy.calledOnce);
  });
});
