import React from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Uploader, { type FileType, type UploaderInstance, type UploaderProps } from '../Uploader';

const fault = new Error('application failure');
let failureStage: string | undefined;
let requests: RequestMock[];
class RequestMock {
  readyState = 1;
  status = 200;
  responseText = '{}';
  onload: ((event: ProgressEvent) => void) | null = null;
  onerror: ((event: ProgressEvent) => void) | null = null;
  onabort: ((event: ProgressEvent) => void) | null = null;
  ontimeout: ((event: ProgressEvent) => void) | null = null;
  upload = { onprogress: null };
  open() {
    if (failureStage === 'open') throw fault;
  }
  setRequestHeader() {
    if (failureStage === 'headers') throw fault;
  }
  send() {
    if (failureStage === 'send') throw fault;
  }
  abort() {
    this.readyState = 0;
    this.onabort?.(new ProgressEvent('abort'));
  }
  settle(mode = 'success') {
    this.readyState = 4;
    if (mode === 'error') this.onerror?.(new ProgressEvent('error'));
    else if (mode === 'timeout') this.ontimeout?.(new ProgressEvent('timeout'));
    else {
      this.status = mode === 'server' ? 500 : 200;
      this.onload?.(new ProgressEvent('load'));
    }
  }
}
const file = (name: string): FileType => ({
  name: `${name}.txt`,
  fileKey: name,
  blobFile: new File([name], `${name}.txt`),
  status: 'inited'
});
beforeEach(() => {
  failureStage = undefined;
  requests = [];
  vi.stubGlobal(
    'XMLHttpRequest',
    vi.fn(() => {
      if (failureStage === 'constructor') throw fault;
      const request = new RequestMock();
      requests.push(request);
      return request;
    })
  );
});
afterEach(() => vi.unstubAllGlobals());

for (const active of [false, true]) {
  it.each(['constructor', 'open', 'headers', 'send'])(
    `rolls back a failed %s without changing actual requests (active=${active})`,
    stage => {
      const ref = React.createRef<UploaderInstance>();
      const completion = vi.fn();
      const upload = vi.fn();
      render(<Uploader ref={ref} action="/upload" onUpload={upload} onCompletion={completion} />);
      if (active) act(() => ref.current!.start(file('alpha')));
      failureStage = stage;
      act(() => expect(() => ref.current!.start(file('invalid'))).toThrow(fault));
      expect(upload).toHaveBeenCalledTimes(active ? 1 : 0);
      expect(completion).not.toHaveBeenCalled();
      failureStage = undefined;
      if (active) {
        act(() => requests[0].settle());
        expect(completion).toHaveBeenCalledOnce();
        expect(completion.mock.calls[0][0].map(file => file.name)).toEqual(['alpha.txt']);
        expect(completion.mock.calls[0][1]).toEqual([]);
      }
      act(() => ref.current!.start(file('beta')));
      act(() => requests.at(-1)!.settle());
      expect(completion).toHaveBeenCalledTimes(active ? 2 : 1);
      expect(completion.mock.calls.at(-1)![0].map(file => file.name)).toEqual(['beta.txt']);
      expect(completion.mock.calls.at(-1)![1]).toEqual([]);
    }
  );
}

for (const reentrant of [false, true]) {
  it.each(['success', 'server', 'error', 'timeout'])(
    `settles %s even when its callback throws (reentrant=${reentrant})`,
    mode => {
      const ref = React.createRef<UploaderInstance>();
      const completion = vi.fn();
      const callback = vi.fn((_response, current: FileType) => {
        if (current.name === 'alpha.txt') {
          if (reentrant) ref.current!.start(file('beta'));
          throw fault;
        }
      });
      render(
        <Uploader
          ref={ref}
          action="/upload"
          timeout={5000}
          onSuccess={callback}
          onError={callback}
          onCompletion={completion}
        />
      );
      act(() => ref.current!.start(file('alpha')));
      act(() => expect(() => requests[0].settle(mode)).toThrow(fault));
      expect(callback).toHaveBeenCalledOnce();
      if (reentrant) {
        expect(completion).not.toHaveBeenCalled();
        act(() => requests[1].settle());
      }
      expect(completion).toHaveBeenCalledOnce();
      expect(completion.mock.calls[0][0].map(file => file.name)).toEqual([
        ...(mode === 'success' ? ['alpha.txt'] : []),
        ...(reentrant ? ['beta.txt'] : [])
      ]);
      expect(completion.mock.calls[0][1].map(file => file.name)).toEqual(
        mode === 'success' ? [] : ['alpha.txt']
      );
      act(() => requests[0].settle(mode));
      expect(completion).toHaveBeenCalledOnce();
      act(() => ref.current!.start(file('gamma')));
      act(() => requests.at(-1)!.settle());
      expect(completion).toHaveBeenCalledTimes(2);
      expect(completion.mock.calls[1][0].map(file => file.name)).toEqual(['gamma.txt']);
    }
  );
}

it.each(['upload', 'completion'])('keeps actual requests owned when %s throws', mode => {
  const ref = React.createRef<UploaderInstance>();
  const completion = vi.fn<NonNullable<UploaderProps['onCompletion']>>(completed => {
    if (mode === 'completion' && completed[0]?.name === 'alpha.txt') throw fault;
  });
  render(
    <Uploader
      ref={ref}
      action="/upload"
      onUpload={current => {
        if (mode === 'upload' && current.name === 'alpha.txt') throw fault;
      }}
      onCompletion={completion}
    />
  );
  act(() => {
    if (mode === 'upload') expect(() => ref.current!.start(file('alpha'))).toThrow(fault);
    else ref.current!.start(file('alpha'));
  });
  expect(completion).not.toHaveBeenCalled();
  act(() => {
    if (mode === 'completion') expect(() => requests[0].settle()).toThrow(fault);
    else requests[0].settle();
  });
  expect(completion).toHaveBeenCalledOnce();
  act(() => ref.current!.start(file('beta')));
  act(() => requests[1].settle());
  expect(completion).toHaveBeenCalledTimes(2);
  expect(completion.mock.calls[1][0].map(file => file.name)).toEqual(['beta.txt']);
  expect(completion.mock.calls[1][1]).toEqual([]);
});
