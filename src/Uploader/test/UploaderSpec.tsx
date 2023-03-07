import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode, getInstance } from '@test/testUtils';

import Uploader from '../Uploader';
import Button from '../../Button';
import userEvent from '@testing-library/user-event';

describe('Uploader', () => {
  it('Should output a Uploader', () => {
    const instance = getDOMNode(<Uploader action="" />);

    assert.include(instance.className, 'rs-uploader');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Uploader action="" disabled />);

    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(instance.querySelector('.rs-uploader-trigger-disabled'));
  });

  it('Should render picture type', () => {
    const instance = getDOMNode(<Uploader action="" listType="picture" />);
    assert.include(instance.className, 'rs-uploader-picture');
  });

  it('Should not render the file list', () => {
    const fileList = [
      {
        name: 'a.png',
        fileKey: 1,
        url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png'
      }
    ];
    const instance = getDOMNode(<Uploader action="" fileList={fileList} fileListVisible={false} />);
    // eslint-disable-next-line testing-library/no-node-access
    assert.ok(!instance.querySelector('.rs-uploader-file-items'));
  });

  it('Should render custom component', () => {
    render(<Uploader action="" toggleAs={Button} appearance="link" />);

    expect(screen.getByRole('button')).to.have.tagName('BUTTON');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Uploader action="" className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Uploader action="" style={{ fontSize }} />);

    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Uploader action="" classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should have draggable className', () => {
    const instance = getDOMNode(<Uploader action="" draggable />);
    assert.include(instance.className, 'rs-uploader-draggable');
  });

  it('Should call `onUpload` callback', () => {
    const onUploadSpy = sinon.spy();
    const file = {
      blobFile: new File(['foo'], 'foo.txt', { type: 'text/plain' })
    };

    const instance = getInstance(<Uploader name="file" action="" onUpload={onUploadSpy} />);
    instance.start(file);

    assert.ok(onUploadSpy.args[0][1] instanceof FormData);
    assert.ok(onUploadSpy.calledOnce);
  });

  it('Should call `onUpload` callback', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };

    const instance = getInstance(<Uploader name="file" action="" onUpload={onUploadSpy} />);
    instance.start(file);
    assert.ok(onUploadSpy.calledOnce);
  });

  it('Should upload a FormData', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };

    const instance = getInstance(<Uploader name="file" action="" onUpload={onUploadSpy} />);
    instance.start(file);

    assert.ok(onUploadSpy.args[0][1] instanceof FormData);
  });

  it('Should upload a File', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };

    const instance = getInstance(
      <Uploader name="file" action="" onUpload={onUploadSpy} disableMultipart />
    );
    instance.start(file);

    assert.ok(onUploadSpy.args[0][1] instanceof File);
  });

  it('Should call `onChange` callback', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt'), status: 'inited' } as const;

    const instance = getInstance(
      <Uploader name="file" action="" onChange={onUploadSpy} defaultFileList={[file]} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.root.querySelector('input');
    ReactTestUtils.Simulate.change(input);
    assert.ok(onUploadSpy.calledOnce);
  });

  it('Should call `onRemove` callback', () => {
    const onRemoveSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt'), status: 'finished' } as const;

    render(<Uploader name="file" action="" onRemove={onRemoveSpy} defaultFileList={[file]} />);

    userEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onRemoveSpy).to.have.been.calledOnce;
  });

  it('Should apply appearance', () => {
    render(<Uploader action="" appearance="primary" color="red" />);

    expect(screen.getByRole('button')).to.have.class('rs-btn-primary');
    expect(screen.getByRole('button')).to.have.class('rs-btn-red');
  });

  it('Should apply size class', () => {
    render(<Uploader action="" size="lg" />);
    expect(screen.getByRole('button')).to.have.class('rs-btn-lg');
  });
});
