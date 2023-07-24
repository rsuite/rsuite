import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';

import UploadTrigger from '../UploadTrigger';
import { testStandardProps } from '@test/commonCases';

describe.only('UploadTrigger', () => {
  testStandardProps(<UploadTrigger />, {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getRootElement: view => view.getByRole('button')
  });
  it('Should output a UploadTrigger', () => {
    const instance = getDOMNode(<UploadTrigger />);
    assert.include(instance.className, 'rs-uploader-trigger');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<UploadTrigger disabled />);
    assert.include(instance.className, 'rs-uploader-trigger-disabled');
  });

  it('Should be multipled', () => {
    const instance = getDOMNode(<UploadTrigger multiple />);
    assert.ok(instance.querySelector('input[multiple]'));
  });

  it('Should have a accept', () => {
    const instance = getDOMNode(<UploadTrigger accept=".jpg" />);
    assert.ok(instance.querySelector('input[accept=".jpg"]'));
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(<UploadTrigger as={'a'} />);
    assert.equal((instance.querySelector('.rs-uploader-trigger-btn') as HTMLElement).tagName, 'A');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const instance = getDOMNode(<UploadTrigger onChange={onChange} />);
    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a name', () => {
    const instance = getDOMNode(<UploadTrigger name="file" />);
    assert.ok(instance.querySelector('input[name="file"]'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<UploadTrigger className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<UploadTrigger style={{ fontSize }} />);
    assert.equal((instance.querySelector('button') as HTMLElement).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<UploadTrigger classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    const instance = getDOMNode(<UploadTrigger draggable onDragEnter={onDragEnterSpy} />);
    const button = instance.querySelector('button') as HTMLElement;

    ReactTestUtils.Simulate.dragEnter(button);
    assert.ok(onDragEnterSpy.calledOnce);
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    const instance = getDOMNode(<UploadTrigger draggable onDragOver={onDragOverSpy} />);
    const button = instance.querySelector('button') as HTMLElement;

    ReactTestUtils.Simulate.dragOver(button);
    assert.ok(onDragOverSpy.calledOnce);
  });

  it('Should call `onDragLeave` callback', () => {
    const onDragLeaveSpy = sinon.spy();
    const instance = getDOMNode(<UploadTrigger draggable onDragLeave={onDragLeaveSpy} />);
    const button = instance.querySelector('button') as HTMLElement;

    ReactTestUtils.Simulate.dragLeave(button);
    assert.ok(onDragLeaveSpy.calledOnce);
  });
});
