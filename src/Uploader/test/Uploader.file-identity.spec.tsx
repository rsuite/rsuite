import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Uploader, { type FileType, type UploaderInstance, type UploaderProps } from '../Uploader';

type Request = {
  readyState: number;
  open: ReturnType<typeof vi.fn>;
  send: ReturnType<typeof vi.fn>;
  setRequestHeader: ReturnType<typeof vi.fn>;
  abort: ReturnType<typeof vi.fn>;
  upload: object;
  onload: null | ((event: ProgressEvent) => void);
  status: number;
  responseText: string;
  succeed: () => void;
};
let requests: Request[];

beforeEach(() => {
  requests = [];
  vi.stubGlobal(
    'XMLHttpRequest',
    vi.fn(() => {
      const request: Request = {
        readyState: 1,
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        abort: vi.fn(() => {
          request.readyState = 0;
        }),
        upload: {},
        onload: null,
        status: 200,
        responseText: '{}',
        succeed: () => {
          request.readyState = 4;
          request.onload?.(new ProgressEvent('load'));
        }
      };
      requests.push(request);
      return request;
    })
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const file = (name: string, fileKey?: string | number): FileType => ({
  name,
  fileKey,
  blobFile: new File(['test bytes'], name),
  status: 'inited'
});

function setup(
  files: FileType[],
  options: { controlled?: boolean; shouldUpload?: UploaderProps['shouldUpload'] } = {}
) {
  const ref = React.createRef<UploaderInstance>();
  const onUpload = vi.fn();
  const onRemove = vi.fn();
  const onChange = vi.fn();
  const onCompletion = vi.fn();
  const props = {
    ref,
    action: '/upload',
    autoUpload: false,
    onUpload,
    onRemove,
    onChange,
    onCompletion,
    shouldUpload: options.shouldUpload,
    renderFileInfo: (file: FileType) => <span data-testid={file.name}>{file.name}</span>
  };
  const view = render(
    <Uploader
      {...props}
      {...(options.controlled ? { fileList: files } : { defaultFileList: files })}
    />
  );
  return {
    onUpload,
    onRemove,
    onChange,
    onCompletion,
    start: () => act(() => ref.current!.start()),
    setFiles: (next: FileType[]) => view.rerender(<Uploader {...props} fileList={next} />),
    remove: (name: string) =>
      fireEvent.click(screen.getByRole('button', { name: `Remove file: ${name}` }))
  };
}

describe('Uploader file identity', () => {
  describe.each([false, true])('controlled: %s', controlled => {
    it.each([0, ''])('preserves an explicit %j key through upload and removal', fileKey => {
      const test = setup([file('choice.txt', fileKey)], { controlled });
      test.start();
      expect(requests).toHaveLength(1);
      expect(test.onUpload.mock.calls[0][0].fileKey).toBe(fileKey);

      act(() => requests[0].succeed());
      expect(test.onCompletion.mock.calls[0][0][0].fileKey).toBe(fileKey);
      test.remove('choice.txt');
      expect(test.onRemove.mock.calls[0][0].fileKey).toBe(fileKey);
      expect(test.onChange.mock.calls[0][0]).toEqual([]);
      expect(requests[0].abort).not.toHaveBeenCalled();
    });
  });

  it.each([0, 1])('cancels only typed-key file at index %i and settles the batch', removed => {
    const files = [file('number.txt', 7), file('string.txt', '7')];
    const test = setup(files);
    test.start();
    expect(requests).toHaveLength(2);

    test.remove(files[removed].name!);
    expect(requests[removed].abort).toHaveBeenCalledTimes(1);
    expect(requests[1 - removed].abort).not.toHaveBeenCalled();
    expect(test.onCompletion).not.toHaveBeenCalled();
    act(() => requests[1 - removed].succeed());
    expect(test.onCompletion).toHaveBeenCalledTimes(1);
    const [completed, failed] = test.onCompletion.mock.calls[0];
    expect(completed.map((item: FileType) => item.fileKey)).toEqual([files[1 - removed].fileKey]);
    expect(failed.map((item: FileType) => item.fileKey)).toEqual([files[removed].fileKey]);
  });

  it.each(['__proto__', 'constructor', 'toString'])(
    'removes an unstarted file named by the %s key without a request error',
    fileKey => {
      const test = setup([file('choice.txt', fileKey)]);
      const errors: unknown[] = [];
      const captureError = (event: ErrorEvent) => {
        errors.push(event.error);
        event.preventDefault();
      };
      window.addEventListener('error', captureError);
      try {
        test.remove('choice.txt');
        expect(errors).toEqual([]);
        expect(test.onRemove.mock.calls[0][0].fileKey).toBe(fileKey);
        expect(test.onChange.mock.calls[0][0]).toEqual([]);
        expect(test.onCompletion).not.toHaveBeenCalled();
        expect(requests).toHaveLength(0);
      } finally {
        window.removeEventListener('error', captureError);
      }
    }
  );

  it('retains each rendered file when numeric and string keys are reordered', () => {
    const files = [file('number.txt', 7), file('string.txt', '7')];
    const test = setup(files, { controlled: true });
    const number = screen.getByTestId('number.txt');
    const string = screen.getByTestId('string.txt');

    test.setFiles([files[1], files[0]]);
    expect(screen.getByTestId('number.txt')).toBe(number);
    expect(screen.getByTestId('string.txt')).toBe(string);
    test.remove('number.txt');
    expect(screen.getByTestId('string.txt')).toBe(string);
    expect(test.onRemove.mock.calls[0][0].fileKey).toBe(7);
    expect(test.onChange.mock.calls[0][0].map((item: FileType) => item.fileKey)).toEqual(['7']);
  });

  it('cancels a removed string-key approval even when the numeric-key file shares its blob', async () => {
    const numeric = file('shared.txt', 0);
    const string = { ...numeric, fileKey: '0' };
    let approveNumber!: (value: boolean) => void;
    let approveString!: (value: boolean) => void;
    const numberApproval = new Promise<boolean>(resolve => {
      approveNumber = resolve;
    });
    const stringApproval = new Promise<boolean>(resolve => {
      approveString = resolve;
    });
    const test = setup([numeric, string], {
      controlled: true,
      shouldUpload: item => (item.fileKey === '0' ? stringApproval : numberApproval)
    });
    test.start();
    test.setFiles([numeric]);
    await act(async () => approveString(true));
    expect(requests).toHaveLength(0);
    expect(test.onCompletion).not.toHaveBeenCalled();

    await act(async () => approveNumber(true));
    expect(requests).toHaveLength(1);
    expect(test.onUpload.mock.calls[0][0].fileKey).toBe(0);
    act(() => requests[0].succeed());
    expect(test.onCompletion).toHaveBeenCalledTimes(1);
    const [completed, failed] = test.onCompletion.mock.calls[0];
    expect(completed.map((item: FileType) => item.fileKey)).toEqual([0]);
    expect(failed.map((item: FileType) => item.fileKey)).toEqual(['0']);
  });

  it('generates a key for a file whose key is absent', () => {
    const test = setup([file('generated.txt')], { controlled: true });
    test.start();
    const uploaded = test.onUpload.mock.calls[0][0];
    expect(typeof uploaded.fileKey).toBe('string');
    expect(uploaded.fileKey).not.toBe('');
    act(() => requests[0].succeed());
    expect(test.onCompletion.mock.calls[0][0][0].fileKey).toBe(uploaded.fileKey);
  });
});
