import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Uploader, { type FileType, type UploaderInstance } from '..';

const deferred = () => {
  let resolve!: (value: boolean) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<boolean>((accept, decline) => {
    resolve = accept;
    reject = decline;
  });
  return {
    promise,
    resolve: (value: boolean) => act(async () => resolve(value)),
    reject: () => act(async () => reject(new Error('Upload approval rejected')))
  };
};
const createFile = (name = 'alpha', fileKey = name): FileType => ({
  name: `${name}.txt`,
  fileKey,
  status: 'inited',
  blobFile: new File(['contents'], `${name}.txt`)
});
type RequestMock = {
  readyState: number;
  open: ReturnType<typeof vi.fn>;
  send: ReturnType<typeof vi.fn>;
  setRequestHeader: ReturnType<typeof vi.fn>;
  abort: ReturnType<typeof vi.fn>;
  upload: { onprogress: null | ((event: ProgressEvent) => void) };
  onload: null | ((event: ProgressEvent) => void);
  onerror: null | ((event: ProgressEvent) => void);
  ontimeout: null | ((event: ProgressEvent) => void);
  status: number;
  responseText: string;
  succeed: () => void;
};
let requests: RequestMock[];
let unhandled: PromiseRejectionEvent[];
const observeRejection = (event: PromiseRejectionEvent) => {
  unhandled.push(event);
  event.preventDefault();
  console.info('Uploader actual unhandled rejection', {
    reason: event.reason instanceof Error ? event.reason.message : String(event.reason),
    trusted: event.isTrusted
  });
};

beforeEach(() => {
  unhandled = [];
  window.addEventListener('unhandledrejection', observeRejection, { capture: true });
  requests = [];
  vi.stubGlobal(
    'XMLHttpRequest',
    vi.fn(() => {
      const request: RequestMock = {
        readyState: 1,
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        abort: vi.fn(() => {
          request.readyState = 0;
        }),
        upload: { onprogress: null },
        onload: null,
        onerror: null,
        ontimeout: null,
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

afterEach(async () => {
  try {
    // Native rejection events are dispatched after the promise microtask checkpoint.
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    expect(unhandled).toHaveLength(0);
  } finally {
    window.removeEventListener('unhandledrejection', observeRejection, { capture: true });
    cleanup();
    vi.unstubAllGlobals();
  }
});

const setup = (
  shouldUpload: (file: FileType) => boolean | Promise<boolean>,
  options: { files?: FileType[]; controlled?: boolean; strict?: boolean } = {}
) => {
  const files = options.files || [createFile()];
  const ref = React.createRef<UploaderInstance>();
  const onCompletion = vi.fn();
  const onUpload = vi.fn();
  const onError = vi.fn();
  const onChange = vi.fn();
  const props = {
    ref,
    action: '/upload',
    autoUpload: false,
    shouldUpload,
    onCompletion,
    onUpload,
    onError,
    onChange
  };
  const wrap = (element: React.ReactElement) =>
    options.strict ? <React.StrictMode>{element}</React.StrictMode> : element;
  const owner = render(
    wrap(
      <Uploader
        {...props}
        {...(options.controlled ? { fileList: files } : { defaultFileList: files })}
      />
    )
  );
  const start = () => act(() => ref.current!.start());
  const setFiles = (nextFiles: FileType[]) =>
    owner.rerender(wrap(<Uploader {...props} fileList={nextFiles} />));
  const finish = () =>
    act(() =>
      requests.filter(request => request.readyState === 1).forEach(request => request.succeed())
    );
  const remove = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Remove file: alpha.txt' }));
  return { ref, owner, start, setFiles, finish, remove, onCompletion, onUpload, onError, onChange };
};

describe('Uploader rejected shouldUpload approvals', () => {
  it('settles a rejected approval like false and keeps the file available for retry', async () => {
    const approval = deferred();
    const shouldUpload = vi.fn().mockReturnValueOnce(approval.promise).mockReturnValue(true);
    const test = setup(shouldUpload);
    test.start();
    await approval.reject();
    expect(requests).toHaveLength(0);
    expect(test.onUpload).not.toHaveBeenCalled();
    expect(test.onError).not.toHaveBeenCalled();
    expect(test.onChange).not.toHaveBeenCalled();
    expect(test.onCompletion.mock.calls).toEqual([[[], []]]);
    expect(screen.getByRole('button', { name: 'Remove file: alpha.txt' })).toBeInTheDocument();
    test.start();
    expect(requests).toHaveLength(1);
    test.finish();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({
      fileKey: 'alpha',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[1][1]).toEqual([]);
  });

  it('settles an already rejected approval without starting an XHR', async () => {
    const test = setup(() => Promise.reject(new Error('Upload approval rejected')));
    test.start();
    await act(async () => {});
    expect(requests).toHaveLength(0);
    expect(test.onCompletion.mock.calls).toEqual([[[], []]]);
    expect(test.onError).not.toHaveBeenCalled();
  });

  it('does not leave a rejected approval counted in a later successful batch', async () => {
    const approval = deferred();
    const test = setup(file => (file.fileKey === 'alpha' ? approval.promise : true));
    test.start();
    await approval.reject();
    test.setFiles([createFile('beta')]);
    test.start();
    test.finish();
    expect(requests).toHaveLength(1);
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({
      fileKey: 'beta',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[1][1]).toEqual([]);
  });

  it('finishes a mixed batch after its outstanding approval rejects', async () => {
    const approval = deferred();
    const test = setup(file => (file.fileKey === 'alpha' ? approval.promise : true), {
      files: [createFile(), createFile('beta')]
    });
    test.start();
    expect(requests).toHaveLength(1);
    test.finish();
    expect(test.onCompletion).not.toHaveBeenCalled();
    await approval.reject();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][0]).toHaveLength(1);
    expect(test.onCompletion.mock.calls[0][0][0]).toMatchObject({
      fileKey: 'beta',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[0][1]).toEqual([]);
  });

  it('waits for every rejected approval before completing the batch once', async () => {
    const alpha = deferred();
    const beta = deferred();
    const test = setup(file => (file.fileKey === 'alpha' ? alpha.promise : beta.promise), {
      files: [createFile(), createFile('beta')]
    });
    test.start();
    await beta.reject();
    expect(test.onCompletion).not.toHaveBeenCalled();
    await alpha.reject();
    expect(test.onCompletion.mock.calls).toEqual([[[], []]]);
    expect(requests).toHaveLength(0);
  });

  it('consumes each rejected start for the same file before a later retry', async () => {
    const first = deferred();
    const second = deferred();
    const shouldUpload = vi
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)
      .mockReturnValue(true);
    const test = setup(shouldUpload);
    test.start();
    test.start();
    await first.reject();
    expect(test.onCompletion).not.toHaveBeenCalled();
    await second.reject();
    expect(test.onCompletion.mock.calls).toEqual([[[], []]]);
    test.start();
    test.finish();
    expect(requests).toHaveLength(1);
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({
      fileKey: 'alpha',
      status: 'finished'
    });
  });

  it('handles a rejection after unmount without late callbacks or uploads', async () => {
    const approval = deferred();
    const test = setup(() => approval.promise);
    test.start();
    test.owner.unmount();
    await approval.reject();
    expect(requests).toHaveLength(0);
    expect(test.onCompletion).not.toHaveBeenCalled();
    expect(test.onError).not.toHaveBeenCalled();
    expect(test.onUpload).not.toHaveBeenCalled();
  });

  it('does not settle a removed approval again when it rejects', async () => {
    const approval = deferred();
    const test = setup(file => (file.fileKey === 'alpha' ? approval.promise : true));
    test.start();
    test.remove();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    await approval.reject();
    expect(requests).toHaveLength(0);
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][1][0]).toMatchObject({ fileKey: 'alpha' });
    test.setFiles([createFile('beta')]);
    test.start();
    test.finish();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({
      fileKey: 'beta',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[1][1]).toEqual([]);
  });

  it('ignores an old rejected token when the controlled queue reuses its key', async () => {
    const old = deferred();
    const next = deferred();
    const test = setup(file => (file.name === 'alpha.txt' ? old.promise : next.promise), {
      controlled: true
    });
    test.start();
    test.setFiles([]);
    test.setFiles([createFile('replacement', 'alpha')]);
    test.start();
    await old.reject();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(requests).toHaveLength(0);
    await next.resolve(true);
    test.finish();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({
      name: 'replacement.txt',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[1][1]).toEqual([]);
  });

  it('settles rejected approvals for a live StrictMode owner', async () => {
    const approval = deferred();
    const test = setup(() => approval.promise, { strict: true });
    test.start();
    await approval.reject();
    expect(test.onCompletion.mock.calls).toEqual([[[], []]]);
    expect(requests).toHaveLength(0);
  });

  it('preserves a fulfilled false approval as a non-uploading completion', async () => {
    const approval = deferred();
    const test = setup(() => approval.promise);
    test.start();
    await approval.resolve(false);
    expect(test.onCompletion.mock.calls).toEqual([[[], []]]);
    expect(requests).toHaveLength(0);
    expect(test.onError).not.toHaveBeenCalled();
  });

  it('preserves a fulfilled true approval as a normal upload', async () => {
    const approval = deferred();
    const test = setup(() => approval.promise);
    test.start();
    await approval.resolve(true);
    test.finish();
    expect(requests).toHaveLength(1);
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][0][0]).toMatchObject({
      fileKey: 'alpha',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[0][1]).toEqual([]);
  });
});
