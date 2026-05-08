import React from 'react';
import Uploader from '../Uploader';
import Button from '../../Button';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

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
    expect(container.firstChild).to.have.attr('data-list-type', 'picture');
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

    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'link');
  });

  it('Should have draggable className', () => {
    const { container } = render(<Uploader action="" draggable />);
    expect(container.firstChild).to.have.attr('data-draggable', 'true');
  });

  it('Should call `onUpload` callback', () => {
    const onUpload = vi.fn();
    const file = {
      blobFile: new File(['foo'], 'foo.txt', { type: 'text/plain' })
    };

    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} />);

    ref.current.start(file);

    expect(onUpload.mock.calls[0][1] instanceof FormData).to.equal(true);
    expect(onUpload).toHaveBeenCalledTimes(1);
  });

  it('Should call `onUpload` callback', () => {
    const onUpload = vi.fn();
    const file = { blobFile: new File(['foo'], 'foo.txt') };
    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} />);
    ref.current.start(file);

    expect(onUpload).toHaveBeenCalledTimes(1);
  });

  it('Should upload a FormData', () => {
    const onUpload = vi.fn();
    const file = { blobFile: new File(['foo'], 'foo.txt') };
    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} />);

    ref.current.start(file);

    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload.mock.calls[0][1] instanceof FormData).to.equal(true);
  });

  it('Should upload a File', () => {
    const onUpload = vi.fn();
    const file = { blobFile: new File(['foo'], 'foo.txt') };
    const ref = React.createRef<any>();

    render(<Uploader ref={ref} name="file" action="" onUpload={onUpload} disableMultipart />);

    ref.current.start(file);

    expect(onUpload.mock.calls[0][1] instanceof File).to.equal(true);
  });

  it('Should call `onChange` callback', async () => {
    const onChange = vi.fn();

    render(<Uploader name="file" action="" onChange={onChange} />);

    const input = screen.getByRole('button', { name: 'Upload' }).previousElementSibling;

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [new File(['foo'], 'foo.txt')] }
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1].target).to.equal(input);
    expect(onChange.mock.calls[0][0][0].blobFile).to.instanceOf(File);
  });

  it('Should call `onRemove` callback', () => {
    const onRemove = vi.fn();
    const file = {
      blobFile: new File(['foo'], 'foo.txt'),
      status: 'finished',
      name: 'foo.txt'
    } as const;

    render(<Uploader name="file" action="" onRemove={onRemove} defaultFileList={[file]} />);

    userEvent.click(screen.getByRole('button', { name: 'Remove file: foo.txt' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('Should call `onCompletion` when all files finish uploading', () => {
    const onCompletion = vi.fn();
    const ref = React.createRef<any>();

    const xhrMocks: any[] = [];
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = vi.fn(() => {
      const xhrMock = {
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        upload: {},
        readyState: 0,
        status: 200,
        responseText: '{}',
        response: '{}',
        withCredentials: false,
        timeout: 0,
        onload: null as any,
        onerror: null as any,
        ontimeout: null as any
      };
      xhrMocks.push(xhrMock);
      return xhrMock;
    }) as any;

    render(<Uploader ref={ref} name="file" action="" onCompletion={onCompletion} />);

    ref.current.start({ blobFile: new File(['foo'], 'foo.txt'), fileKey: 'a', status: 'inited' });
    ref.current.start({ blobFile: new File(['bar'], 'bar.txt'), fileKey: 'b', status: 'inited' });

    // Simulate first file success
    xhrMocks[0].onload(new Event('load'));
    expect(onCompletion).not.toHaveBeenCalled();

    // Simulate second file success
    xhrMocks[1].onload(new Event('load'));
    expect(onCompletion).toHaveBeenCalledTimes(1);

    const [completedFiles, failedFiles] = onCompletion.mock.calls[0];
    expect(completedFiles).toHaveLength(2);
    expect(failedFiles).toHaveLength(0);

    window.XMLHttpRequest = OriginalXHR;
  });

  it('Should call `onCompletion` with failed files when uploads fail', () => {
    const onCompletion = vi.fn();
    const ref = React.createRef<any>();

    const xhrMocks: any[] = [];
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = vi.fn(() => {
      const xhrMock = {
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        upload: {},
        readyState: 0,
        status: 200,
        responseText: '{}',
        response: '{}',
        withCredentials: false,
        timeout: 0,
        onload: null as any,
        onerror: null as any,
        ontimeout: null as any
      };
      xhrMocks.push(xhrMock);
      return xhrMock;
    }) as any;

    render(<Uploader ref={ref} name="file" action="" onCompletion={onCompletion} />);

    ref.current.start({ blobFile: new File(['foo'], 'foo.txt'), fileKey: 'a', status: 'inited' });
    ref.current.start({ blobFile: new File(['bar'], 'bar.txt'), fileKey: 'b', status: 'inited' });

    // Simulate first file success
    xhrMocks[0].onload(new Event('load'));
    // Simulate second file error
    xhrMocks[1].onerror(new Event('error'));

    expect(onCompletion).toHaveBeenCalledTimes(1);

    const [completedFiles, failedFiles] = onCompletion.mock.calls[0];
    expect(completedFiles).toHaveLength(1);
    expect(failedFiles).toHaveLength(1);

    window.XMLHttpRequest = OriginalXHR;
  });

  it('Should call `onCompletion` when a file is removed mid-upload', () => {
    const onCompletion = vi.fn();
    const ref = React.createRef<any>();

    const xhrMocks: any[] = [];
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = vi.fn(() => {
      const xhrMock = {
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        upload: {},
        readyState: 0,
        status: 200,
        responseText: '{}',
        response: '{}',
        withCredentials: false,
        timeout: 0,
        onload: null as any,
        onerror: null as any,
        ontimeout: null as any,
        abort: vi.fn()
      };
      xhrMocks.push(xhrMock);
      return xhrMock;
    }) as any;

    const fileA = {
      blobFile: new File(['foo'], 'foo.txt'),
      fileKey: 'a',
      status: 'inited' as const,
      name: 'foo.txt'
    };
    const fileB = {
      blobFile: new File(['bar'], 'bar.txt'),
      fileKey: 'b',
      status: 'inited' as const,
      name: 'bar.txt'
    };

    render(
      <Uploader
        ref={ref}
        name="file"
        action=""
        onCompletion={onCompletion}
        defaultFileList={[fileA, fileB]}
        autoUpload={false}
      />
    );

    // Start batch upload
    ref.current.start();

    // Two XHRs should have been created
    expect(xhrMocks).toHaveLength(2);

    // Simulate first file success
    xhrMocks[0].onload(new Event('load'));
    expect(onCompletion).not.toHaveBeenCalled();

    // Remove the second file mid-upload
    userEvent.click(screen.getByRole('button', { name: 'Remove file: bar.txt' }));

    expect(onCompletion).toHaveBeenCalledTimes(1);

    const [completedFiles, failedFiles] = onCompletion.mock.calls[0];
    expect(completedFiles).toHaveLength(1);
    expect(failedFiles).toHaveLength(1);

    window.XMLHttpRequest = OriginalXHR;
  });

  it('Should not call `onCompletion` prematurely when shouldUpload returns a Promise', async () => {
    const onCompletion = vi.fn();
    const ref = React.createRef<any>();

    let resolveBar: (v: boolean) => void;
    const shouldUpload = vi.fn((file: any) => {
      if (file.name === 'bar.txt') {
        return new Promise<boolean>(resolve => {
          resolveBar = resolve;
        });
      }
      return true;
    });

    const xhrMocks: any[] = [];
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = vi.fn(() => {
      const xhrMock = {
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        upload: {},
        readyState: 0,
        status: 200,
        responseText: '{}',
        response: '{}',
        withCredentials: false,
        timeout: 0,
        onload: null as any,
        onerror: null as any,
        ontimeout: null as any,
        abort: vi.fn()
      };
      xhrMocks.push(xhrMock);
      return xhrMock;
    }) as any;

    const fileA = {
      blobFile: new File(['foo'], 'foo.txt'),
      fileKey: 'a',
      status: 'inited' as const,
      name: 'foo.txt'
    };
    const fileB = {
      blobFile: new File(['bar'], 'bar.txt'),
      fileKey: 'b',
      status: 'inited' as const,
      name: 'bar.txt'
    };

    render(
      <Uploader
        ref={ref}
        name="file"
        action=""
        onCompletion={onCompletion}
        shouldUpload={shouldUpload}
        defaultFileList={[fileA, fileB]}
        autoUpload={false}
      />
    );

    // Start batch upload
    ref.current.start();

    // File A starts immediately (shouldUpload returns true sync)
    // File B waits for shouldUpload promise to resolve
    expect(xhrMocks).toHaveLength(1);

    // Complete file A - should NOT trigger onCompletion since file B hasn't started
    xhrMocks[0].onload(new Event('load'));
    expect(onCompletion).not.toHaveBeenCalled();

    // Resolve file B's shouldUpload
    await act(async () => {
      resolveBar!(true);
    });

    // File B has now started
    expect(xhrMocks).toHaveLength(2);

    // Complete file B
    xhrMocks[1].onload(new Event('load'));
    expect(onCompletion).toHaveBeenCalledTimes(1);

    const [completedFiles, failedFiles] = onCompletion.mock.calls[0];
    expect(completedFiles).toHaveLength(2);
    expect(failedFiles).toHaveLength(0);

    window.XMLHttpRequest = OriginalXHR;
  });

  it('Should apply appearance', () => {
    render(<Uploader action="" appearance="primary" color="red" />);

    expect(screen.getByRole('button')).to.have.attr('data-appearance', 'primary');
    expect(screen.getByRole('button')).to.have.attr('data-color', 'red');
  });

  it('Should apply custom button className', () => {
    render(
      <Uploader action="">
        <Button className="custom-buttom">Select files</Button>
      </Uploader>
    );

    expect(screen.getByRole('button')).to.have.class('custom-buttom');
  });
});
