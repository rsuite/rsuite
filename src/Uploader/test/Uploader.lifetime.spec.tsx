import React from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Uploader, { type FileType, type UploaderInstance } from '../Uploader';

let requests: RequestMock[];
class RequestMock {
  readyState = 1;
  status = 200;
  responseText = '{}';
  onload: ((event: ProgressEvent) => void) | null = null;
  onabort: ((event: ProgressEvent) => void) | null = null;
  upload = { onprogress: null };
  open() {}
  setRequestHeader() {}
  send() {}
  abort = vi.fn(() => {
    this.readyState = 0;
    this.onabort?.(new ProgressEvent('abort'));
  });
  finish() {
    this.readyState = 4;
    this.onload?.(new ProgressEvent('load'));
  }
}
const files = (): FileType[] =>
  ['alpha', 'beta'].map(name => ({
    fileKey: name,
    name: `${name}.txt`,
    status: 'inited',
    blobFile: new File([name], `${name}.txt`)
  }));
const decision = (mode: string) => {
  if (mode === 'resolve') return Promise.resolve(true);
  if (mode === 'reject') return Promise.reject(new Error('expected approval rejection'));
  if (mode === 'pending') return new Promise<boolean>(() => {});
  return mode !== 'false';
};
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

for (const controlled of [false, true])
  for (const strict of [false, true]) {
    const label = `controlled=${controlled}, strict=${strict}`;
    const wrap = (element: React.ReactElement) =>
      strict ? <React.StrictMode>{element}</React.StrictMode> : element;
    const listProps = (list: FileType[]) =>
      controlled ? { fileList: list } : { defaultFileList: list };

    it.each(['true', 'resolve', 'reject', 'pending'])(
      `ignores retained queued start with %s approval (${label})`,
      async mode => {
        const ref = React.createRef<UploaderInstance>();
        const approve = vi.fn(() => decision(mode));
        const upload = vi.fn();
        const completion = vi.fn();
        const view = render(
          wrap(
            <Uploader
              ref={ref}
              action="/unused"
              autoUpload={false}
              {...listProps(files())}
              shouldUpload={approve}
              onUpload={upload}
              onCompletion={completion}
            />
          )
        );
        const saved = ref.current!;
        view.unmount();
        await act(async () => saved.start());
        expect(approve).not.toHaveBeenCalled();
        expect(requests).toEqual([]);
        expect(upload).not.toHaveBeenCalled();
        expect(completion).not.toHaveBeenCalled();
      }
    );

    it.each(['true', 'false', 'resolve', 'reject'])(
      `stops the queue when %s approval unmounts (${label})`,
      async mode => {
        const ref = React.createRef<UploaderInstance>();
        const completion = vi.fn();
        const approve = vi.fn(() => {
          view.unmount();
          return decision(mode);
        });
        const view = render(
          wrap(
            <Uploader
              ref={ref}
              action="/unused"
              autoUpload={false}
              {...listProps(files())}
              shouldUpload={approve}
              onCompletion={completion}
            />
          )
        );
        await act(async () => ref.current!.start());
        expect(approve).toHaveBeenCalledOnce();
        expect(approve.mock.calls[0]).toEqual([expect.objectContaining({ name: 'alpha.txt' })]);
        expect(requests).toEqual([]);
        expect(completion).not.toHaveBeenCalled();
      }
    );

    it(`stops queued approvals after onUpload unmounts (${label})`, async () => {
      const ref = React.createRef<UploaderInstance>();
      const approve = vi.fn(() => true);
      const completion = vi.fn();
      const success = vi.fn();
      const upload = vi.fn(() => view.unmount());
      const view = render(
        wrap(
          <Uploader
            ref={ref}
            action="/unused"
            autoUpload={false}
            {...listProps(files())}
            shouldUpload={approve}
            onUpload={upload}
            onSuccess={success}
            onCompletion={completion}
          />
        )
      );
      await act(async () => ref.current!.start());
      expect(approve).toHaveBeenCalledOnce();
      expect(upload).toHaveBeenCalledOnce();
      expect(requests).toHaveLength(1);
      expect(requests[0].abort).toHaveBeenCalledOnce();
      act(() => requests[0].finish());
      expect(success).not.toHaveBeenCalled();
      expect(completion).not.toHaveBeenCalled();
    });

    it(`still starts and completes the mounted queue (${label})`, async () => {
      const ref = React.createRef<UploaderInstance>();
      const approve = vi.fn(() => Promise.resolve(true));
      const completion = vi.fn();
      render(
        wrap(
          <Uploader
            ref={ref}
            action="/unused"
            autoUpload={false}
            {...listProps(files())}
            shouldUpload={approve}
            onCompletion={completion}
          />
        )
      );
      await act(async () => ref.current!.start());
      expect(approve).toHaveBeenCalledTimes(2);
      expect(requests).toHaveLength(2);
      act(() => requests[0].finish());
      expect(completion).not.toHaveBeenCalled();
      act(() => requests[1].finish());
      expect(completion).toHaveBeenCalledOnce();
      expect(completion.mock.calls[0][0].map(file => file.name)).toEqual(['alpha.txt', 'beta.txt']);
      expect(completion.mock.calls[0][1]).toEqual([]);
    });
  }
