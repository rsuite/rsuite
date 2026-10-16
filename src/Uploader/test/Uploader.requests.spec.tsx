import React, { useLayoutEffect } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Uploader, { type FileType, type UploaderInstance } from '../Uploader';

class RequestMock {
  readyState = 1;
  status = 200;
  responseText = '{}';
  open = vi.fn();
  send = vi.fn();
  setRequestHeader = vi.fn();
  onload: ((event: ProgressEvent) => void) | null = null;
  onerror: ((event: ProgressEvent) => void) | null = null;
  onabort: ((event: ProgressEvent) => void) | null = null;
  ontimeout: ((event: ProgressEvent) => void) | null = null;
  upload: { onprogress: ((event: ProgressEvent) => void) | null } = { onprogress: null };
  abort = vi.fn(() => {
    this.readyState = 0;
    this.onabort?.(new ProgressEvent('abort'));
  });
  succeed() {
    this.readyState = 4;
    this.onload?.(new ProgressEvent('load'));
  }
}
let requests: RequestMock[];
beforeEach(() => {
  requests = [];
  vi.stubGlobal(
    'XMLHttpRequest',
    vi.fn(function () {
      const request = new RequestMock();
      requests.push(request);
      return request;
    })
  );
});
afterEach(() => vi.unstubAllGlobals());
const createFile = (name: string): FileType => ({
  name: `${name}.txt`,
  fileKey: name,
  blobFile: new File(['bytes'], `${name}.txt`),
  status: 'inited'
});

it.each(['remove', 'unmount', 'success', 'error', 'abort'] as const)(
  'ignores queued callbacks after %s and settles each attempt once',
  mode => {
    const file = createFile('alpha');
    const ref = React.createRef<UploaderInstance>();
    const success = vi.fn(),
      error = vi.fn(),
      progress = vi.fn(),
      completion = vi.fn();
    const view = render(
      <Uploader
        ref={ref}
        action="/upload"
        timeout={5000}
        defaultFileList={[file]}
        onSuccess={success}
        onError={error}
        onProgress={progress}
        onCompletion={completion}
      />
    );
    const instance = ref.current!;
    act(() => instance.start(file));
    const request = requests[0];
    const late = {
      load: request.onload!,
      error: request.onerror!,
      timeout: request.ontimeout!,
      progress: request.upload.onprogress!
    };
    act(() => {
      if (mode === 'remove')
        fireEvent.click(screen.getByRole('button', { name: 'Remove file: alpha.txt' }));
      else if (mode === 'unmount') view.unmount();
      else if (mode === 'success') request.succeed();
      else if (mode === 'error') request.onerror!(new ProgressEvent('error'));
      else request.abort();
    });
    expect(success).toHaveBeenCalledTimes(mode === 'success' ? 1 : 0);
    expect(error).toHaveBeenCalledTimes(mode === 'error' ? 1 : 0);
    expect(completion).toHaveBeenCalledTimes(mode === 'unmount' ? 0 : 1);
    const counts = [success, error, progress, completion].map(
      callback => callback.mock.calls.length
    );
    act(() => {
      late.load(new ProgressEvent('load'));
      late.error(new ProgressEvent('error'));
      late.timeout(new ProgressEvent('timeout'));
      late.progress(
        new ProgressEvent('progress', { lengthComputable: true, loaded: 5, total: 10 })
      );
    });
    expect(
      [success, error, progress, completion].map(callback => callback.mock.calls.length)
    ).toEqual(counts);
    act(() => instance.start(createFile('beta')));
    if (mode === 'unmount') {
      expect(requests).toHaveLength(1);
    } else {
      expect(requests).toHaveLength(2);
      act(() => requests[1].succeed());
      expect(completion).toHaveBeenCalledTimes(2);
      expect(completion.mock.calls[1][0].map(file => file.name)).toEqual(['beta.txt']);
      expect(completion.mock.calls[1][1]).toEqual([]);
    }
  }
);

it('releases StrictMode replay attempts and accepts starts from parent layout effects', () => {
  const ref = React.createRef<UploaderInstance>();
  const completion = vi.fn();
  const file = createFile('alpha');
  function Parent() {
    useLayoutEffect(() => {
      ref.current!.start(file);
    }, []);
    return (
      <Uploader ref={ref} action="/upload" defaultFileList={[file]} onCompletion={completion} />
    );
  }
  render(
    <React.StrictMode>
      <Parent />
    </React.StrictMode>
  );
  expect(requests).toHaveLength(2);
  expect(requests[0].abort).toHaveBeenCalledOnce();
  expect(requests[1].abort).not.toHaveBeenCalled();
  expect(completion).not.toHaveBeenCalled();
  act(() => requests[1].succeed());
  expect(completion).toHaveBeenCalledOnce();
  expect(completion.mock.calls[0][0].map(file => file.name)).toEqual(['alpha.txt']);
});
