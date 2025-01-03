import React from 'react';
import sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

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

    expect(container.querySelector('.rs-uploader-file-items')).to.not.exist;
  });

  it('Should render custom component', () => {
    render(<Uploader action="" toggleAs={Button} appearance="link" />);

    expect(screen.getByRole('button')).to.have.class('rs-btn-link');
  });

  it('Should have draggable className', () => {
    const { container } = render(<Uploader action="" draggable />);
    expect(container.firstChild).to.have.class('rs-uploader-draggable');
  });

  it('Should call `onUpload` callback', () => {
    const onUpload = sinon.spy();
    const file = {
      blobFile: new File(['foo'], 'foo.txt', { type: 'text/plain' })
    };

    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} />);

    ref.current.start(file);

    expect(onUpload.args[0][1] instanceof FormData).to.equal(true);
    expect(onUpload).to.been.calledOnce;
  });

  it('Should call `onUpload` callback', () => {
    const onUpload = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };
    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} />);
    ref.current.start(file);

    expect(onUpload).to.been.calledOnce;
  });

  it('Should upload a FormData', () => {
    const onUpload = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };
    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} />);

    ref.current.start(file);

    expect(onUpload.args[0][1] instanceof FormData).to.equal(true);
  });

  it('Should upload a File', () => {
    const onUpload = sinon.spy();
    const file = { blobFile: new File(['foo'], 'foo.txt') };
    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} disableMultipart />);

    ref.current.start(file);

    expect(onUpload.args[0][1] instanceof File).to.equal(true);
  });

  it('Should call `onChange` callback', async () => {
    const onChange = sinon.spy();

    render(<Uploader name="file" action="" onChange={onChange} />);

    const input = screen.getByRole('button', { name: 'Upload' }).previousElementSibling;

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [new File(['foo'], 'foo.txt')] }
    });

    expect(onChange).to.been.calledOnce;
    expect(onChange.firstCall.args[1].target).to.equal(input);
    expect(onChange.firstCall.args[0][0].blobFile).to.instanceOf(File);
  });

  it('Should call `onRemove` callback', () => {
    const onRemove = sinon.spy();
    const file = {
      blobFile: new File(['foo'], 'foo.txt'),
      status: 'finished',
      name: 'foo.txt'
    } as const;

    render(<Uploader name="file" action="" onRemove={onRemove} defaultFileList={[file]} />);

    userEvent.click(screen.getByRole('button', { name: 'Remove file: foo.txt' }));

    expect(onRemove).to.have.been.calledOnce;
  });

  it('Should apply appearance', () => {
    render(<Uploader action="" appearance="primary" color="red" />);

    expect(screen.getByRole('button')).to.have.class('rs-btn-primary');
    expect(screen.getByRole('button')).to.have.class('rs-btn-red');
  });
});
