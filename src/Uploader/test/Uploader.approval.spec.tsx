import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Uploader, { type FileType, type UploaderInstance } from '../Uploader';

const deferred = () => {
  let resolve!: (value: boolean) => void;
  const promise = new Promise<boolean>(accept => {
    resolve = accept;
  });
  return { promise, resolve: (value: boolean) => act(async () => resolve(value)) };
};
const createFile = (name = 'alpha', fileKey = name): FileType => ({
  name: `${name}.txt`,
  fileKey,
  blobFile: new File(['test bytes'], `${name}.txt`),
  status: 'inited'
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

beforeEach(() => {
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

afterEach(() => vi.unstubAllGlobals());

const setup = (
  options: {
    controlled?: boolean;
    file?: FileType;
    strict?: boolean;
    start?: boolean;
    shouldUpload?: (file: FileType) => boolean | Promise<boolean>;
  } = {}
) => {
  const approval = deferred();
  const file = options.file || createFile();
  const shouldUpload = vi.fn(
    options.shouldUpload ||
      ((file: FileType) => (file.fileKey === 'alpha' ? approval.promise : true))
  );
  const ref = React.createRef<UploaderInstance>();
  const onUpload = vi.fn();
  const onSuccess = vi.fn();
  const onProgress = vi.fn();
  const onError = vi.fn();
  const onRemove = vi.fn();
  const onChange = vi.fn();
  const onCompletion = vi.fn();
  const props = {
    ref,
    action: '/upload',
    autoUpload: false,
    shouldUpload,
    onUpload,
    onSuccess,
    onProgress,
    onError,
    onRemove,
    onChange,
    onCompletion
  };
  const wrap = (child: React.ReactElement) =>
    options.strict ? <React.StrictMode>{child}</React.StrictMode> : child;
  const owner = render(
    wrap(
      <Uploader
        {...props}
        {...(options.controlled ? { fileList: [file] } : { defaultFileList: [file] })}
      />
    )
  );
  const start = () => act(() => ref.current!.start());
  if (options.start !== false) start();
  const remove = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Remove file: alpha.txt' }));
  const setFiles = (files: FileType[]) =>
    owner.rerender(wrap(<Uploader {...props} fileList={files} />));
  const finishRequests = () =>
    act(() => {
      requests.filter(request => request.readyState === 1).forEach(request => request.succeed());
    });
  const expectNoUpload = () => {
    expect(requests).toHaveLength(0);
    expect(onUpload).not.toHaveBeenCalled();
    expect(onProgress).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  };
  const nextBatch = () => {
    setFiles([createFile('beta')]);
    start();
    finishRequests();
  };
  return {
    approval,
    ref,
    owner,
    shouldUpload,
    onUpload,
    onSuccess,
    onProgress,
    onError,
    onRemove,
    onChange,
    onCompletion,
    start,
    remove,
    setFiles,
    finishRequests,
    expectNoUpload,
    nextBatch
  };
};

describe('Uploader pending shouldUpload approvals', () => {
  it('uploads a retained file after approval and completes its batch', async () => {
    const test = setup();
    await test.approval.resolve(true);
    expect(requests).toHaveLength(1);
    test.finishRequests();
    expect(test.onSuccess).toHaveBeenCalledOnce();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][0][0]).toMatchObject({
      fileKey: 'alpha',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[0][1]).toEqual([]);
  });

  it('settles a false approval without uploading or recording a failed file', async () => {
    const test = setup();
    await test.approval.resolve(false);
    test.expectNoUpload();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0]).toEqual([[], []]);
  });

  it('retains active XHR removal and canceled batch completion', async () => {
    const test = setup();
    await test.approval.resolve(true);
    test.remove();
    expect(requests[0].abort).toHaveBeenCalledOnce();
    expect(test.onSuccess).not.toHaveBeenCalled();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][1][0]).toMatchObject({ fileKey: 'alpha' });
  });

  it('cancels a removed pending approval without starting a late upload', async () => {
    const test = setup();
    test.remove();
    expect(test.onRemove).toHaveBeenCalledOnce();
    expect(test.onChange.mock.calls[0][0]).toEqual([]);
    await test.approval.resolve(true);
    test.expectNoUpload();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][1][0]).toMatchObject({ fileKey: 'alpha' });
  });

  it('settles pending approvals removed by the controlled queue', async () => {
    const test = setup({ controlled: true });
    test.setFiles([]);
    expect(screen.queryByRole('button', { name: 'Remove file: alpha.txt' })).toBeNull();
    await test.approval.resolve(true);
    test.expectNoUpload();
    expect(test.onRemove).not.toHaveBeenCalled();
    expect(test.onChange).not.toHaveBeenCalled();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][1][0]).toMatchObject({ fileKey: 'alpha' });
  });

  it('waits for retained approvals when a controlled batch removes another pending file', async () => {
    const alpha = deferred();
    const beta = deferred();
    const test = setup({
      controlled: true,
      start: false,
      shouldUpload: file => (file.fileKey === 'alpha' ? alpha.promise : beta.promise)
    });
    const retainedFile = createFile('beta');
    test.setFiles([createFile(), retainedFile]);
    test.start();
    test.setFiles([retainedFile]);
    expect(test.onCompletion).not.toHaveBeenCalled();
    await alpha.resolve(true);
    test.expectNoUpload();
    await beta.resolve(true);
    expect(test.onUpload.mock.calls.map(call => call[0].fileKey)).toEqual(['beta']);
    test.finishRequests();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][0][0]).toMatchObject({
      fileKey: 'beta',
      status: 'finished'
    });
    expect(test.onCompletion.mock.calls[0][1]).toHaveLength(1);
    expect(test.onCompletion.mock.calls[0][1][0]).toMatchObject({ fileKey: 'alpha' });
  });

  it('ignores a late approval after unmount without completion callbacks', async () => {
    const test = setup();
    test.owner.unmount();
    await test.approval.resolve(true);
    test.expectNoUpload();
    expect(test.onCompletion).not.toHaveBeenCalled();
  });

  it('completes a new batch after a removed approval resolves true', async () => {
    const test = setup();
    test.remove();
    await test.approval.resolve(true);
    test.finishRequests();
    test.nextBatch();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({
      fileKey: 'beta',
      status: 'finished'
    });
    expect(test.onUpload.mock.calls.map(call => call[0].fileKey)).toEqual(['beta']);
  });

  it('does not settle a removed false approval twice before a new batch', async () => {
    const test = setup();
    test.remove();
    await test.approval.resolve(false);
    test.expectNoUpload();
    test.nextBatch();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({ fileKey: 'beta' });
  });

  it('cancels every pending start for one file without leaking its batch count', async () => {
    const first = deferred();
    const second = deferred();
    let count = 0;
    const test = setup({
      shouldUpload: file => (file.fileKey === 'alpha' ? [first, second][count++].promise : true)
    });
    test.start();
    test.remove();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    await first.resolve(true);
    await second.resolve(false);
    test.expectNoUpload();
    test.nextBatch();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[0][1]).toHaveLength(1);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({ fileKey: 'beta' });
  });

  it('keeps old approval tokens canceled when the queue reuses a fileKey', async () => {
    const oldApproval = deferred();
    const newApproval = deferred();
    const test = setup({
      controlled: true,
      shouldUpload: file => (file.name === 'alpha.txt' ? oldApproval.promise : newApproval.promise)
    });
    test.setFiles([]);
    test.setFiles([createFile('new-alpha', 'alpha')]);
    test.start();
    await oldApproval.resolve(true);
    test.expectNoUpload();
    await newApproval.resolve(true);
    expect(requests).toHaveLength(1);
    expect(test.onUpload.mock.calls[0][0]).toMatchObject({
      fileKey: 'alpha',
      name: 'new-alpha.txt'
    });
    test.finishRequests();
    expect(test.onCompletion).toHaveBeenCalledTimes(2);
    expect(test.onCompletion.mock.calls[1][0][0]).toMatchObject({ name: 'new-alpha.txt' });
  });

  it('approves a live owner after StrictMode cleanup and setup', async () => {
    const test = setup({ strict: true });
    await test.approval.resolve(true);
    expect(requests).toHaveLength(1);
    test.finishRequests();
    expect(test.onCompletion).toHaveBeenCalledOnce();
  });

  it.each([undefined, 0, ''] as const)(
    'keeps a controlled file with generated key from %j',
    async fileKey => {
      const approval = deferred();
      const file = { ...createFile('generated'), fileKey };
      const test = setup({ controlled: true, file, shouldUpload: () => approval.promise });
      await approval.resolve(true);
      expect(requests).toHaveLength(1);
      expect(test.onUpload.mock.calls[0][0]).toMatchObject({
        name: file.name,
        blobFile: file.blobFile
      });
      test.finishRequests();
      expect(test.onCompletion).toHaveBeenCalledOnce();
    }
  );

  it('ignores a false approval after StrictMode unmount', async () => {
    const test = setup({ strict: true });
    test.owner.unmount();
    await test.approval.resolve(false);
    test.expectNoUpload();
    expect(test.onCompletion).not.toHaveBeenCalled();
  });

  it('preserves start(file) as the direct upload path', () => {
    const test = setup({ start: false, shouldUpload: () => false });
    act(() => test.ref.current!.start(createFile('direct')));
    expect(test.shouldUpload).not.toHaveBeenCalled();
    expect(requests).toHaveLength(1);
    test.finishRequests();
    expect(test.onCompletion.mock.calls[0][0][0]).toMatchObject({ fileKey: 'direct' });
  });

  it('does not debit an unstarted removed file from a later batch', () => {
    const test = setup({ start: false });
    test.remove();
    expect(test.onCompletion).not.toHaveBeenCalled();
    test.nextBatch();
    expect(test.onCompletion).toHaveBeenCalledOnce();
    expect(test.onCompletion.mock.calls[0][0][0]).toMatchObject({ fileKey: 'beta' });
  });
});
