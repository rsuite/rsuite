import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getInstance, testStandardProps } from '@test/utils';

import Uploader from '../Uploader';
import Button from '../../Button';
import userEvent from '@testing-library/user-event';

describe('Uploader', () => {
  testStandardProps(<Uploader action="" />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => screen.getByRole('button')
  });

  it('Should output a Uploader', () => {
    render(<Uploader action="" />);

    expect(screen.getByRole('button')).to.have.class('rs-uploader-trigger-btn');
  });

  it('Should be disabled', () => {
    render(<Uploader action="" disabled />);

    expect(screen.getByRole('button')).to.have.attr('disabled');
  });

  it('Should render picture type', () => {
    const { container } = render(<Uploader action="" listType="picture" />);
    expect(container.firstChild).to.have.class('rs-uploader-picture');
  });

  it('Should not render the file list', () => {
    const fileList = [
      {
        name: 'a.png',
        fileKey: 1,
        url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png'
      }
    ];
    const { container } = render(
      <Uploader action="" fileList={fileList} fileListVisible={false} />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.rs-uploader-file-items')).to.not.exist;
  });

  it('Should render custom component', () => {
    render(<Uploader action="" toggleAs={Button} appearance="link" />);

    expect(screen.getByRole('button')).to.have.tagName('BUTTON');
  });

  it('Should have draggable className', () => {
    const { container } = render(<Uploader action="" draggable />);
    expect(container.firstChild).to.have.class('rs-uploader-draggable');
  });

  it('Should call `onUpload` callback', () => {
    const onUploadSpy = sinon.spy();
    const file = {
      blobFile: new File(['foo'], 'foo.txt', { type: 'text/plain' })
    };

    const instance = getInstance(<Uploader name="file" action="" onUpload={onUploadSpy} />);
    instance.start(file);

    expect(onUploadSpy.args[0][1] instanceof FormData).to.equal(true);
    expect(onUploadSpy).to.been.calledOnce;
  });

  it('Should call `onUpload` callback', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };

    const instance = getInstance(<Uploader name="file" action="" onUpload={onUploadSpy} />);
    instance.start(file);

    expect(onUploadSpy).to.been.calledOnce;
  });

  it('Should upload a FormData', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };

    const instance = getInstance(<Uploader name="file" action="" onUpload={onUploadSpy} />);
    instance.start(file);

    expect(onUploadSpy.args[0][1] instanceof FormData).to.equal(true);
  });

  it('Should upload a File', () => {
    const onUploadSpy = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };

    const instance = getInstance(
      <Uploader name="file" action="" onUpload={onUploadSpy} disableMultipart />
    );
    instance.start(file);

    expect(onUploadSpy.args[0][1] instanceof File).to.equal(true);
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

    expect(onUploadSpy).to.been.calledOnce;
  });

  it('Should call `onRemove` callback', () => {
    const onRemoveSpy = sinon.spy();
    const file = {
      blobFile: new File(['foo'], 'foo.txt'),
      status: 'finished',
      name: 'foo.txt'
    } as const;

    render(<Uploader name="file" action="" onRemove={onRemoveSpy} defaultFileList={[file]} />);

    userEvent.click(screen.getByRole('button', { name: 'Remove file: foo.txt' }));

    expect(onRemoveSpy).to.have.been.calledOnce;
  });

  it('Should apply appearance', () => {
    render(<Uploader action="" appearance="primary" color="red" />);

    expect(screen.getByRole('button')).to.have.class('rs-btn-primary');
    expect(screen.getByRole('button')).to.have.class('rs-btn-red');
  });
});
