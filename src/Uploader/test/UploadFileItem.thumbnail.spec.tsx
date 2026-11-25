import React, { StrictMode } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UploadFileItem from '../UploadFileItem';

class ControlledReader {
  static LOADING = 1;
  static DONE = 2;
  static readers: ControlledReader[] = [];
  readyState = 0;
  result: string | null = null;
  onloadend: (() => void) | null = null;
  queued: (() => void) | null = null;
  abort = vi.fn(() => {
    this.readyState = ControlledReader.DONE;
    this.onloadend?.();
  });
  readAsDataURL = vi.fn(() => {
    this.readyState = ControlledReader.LOADING;
    this.queued = this.onloadend;
    ControlledReader.readers.push(this);
  });
  finish(value: string) {
    this.result = value;
    this.readyState = ControlledReader.DONE;
    // A previously queued callback may still arrive after its request is replaced.
    this.queued?.();
  }
}

const blob = (text: string) => new File([text], `${text}.png`, { type: 'image/png' });
const firstImage = 'data:image/png;base64,YQ==';
const secondImage = 'data:image/png;base64,Yg==';
const latest = () => ControlledReader.readers[ControlledReader.readers.length - 1];
const finish = (reader: ControlledReader, value: string) => act(() => reader.finish(value));

beforeEach(() => {
  ControlledReader.readers = [];
  vi.stubGlobal('FileReader', ControlledReader);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe.each(['picture', 'picture-text'] as const)('%s thumbnail ownership', listType => {
  const view = (
    file: React.ComponentProps<typeof UploadFileItem>['file'],
    maxPreviewFileSize?: number
  ) => (
    <UploadFileItem
      listType={listType}
      file={{ fileKey: 'same', name: 'image.png', ...file }}
      maxPreviewFileSize={maxPreviewFileSize}
    />
  );

  it('renders the current explicit URL, including after a URL is added or replaced', () => {
    const { container, rerender } = render(view({}));
    expect(container.querySelector('img')).toBeNull();
    rerender(view({ url: firstImage }));
    expect(container.querySelector('img')?.getAttribute('src')).toBe(firstImage);
    rerender(view({ url: secondImage }));
    expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
    expect(ControlledReader.readers).toHaveLength(0);
  });

  it('clears a removed URL when no blob is available', () => {
    const { container, rerender } = render(view({ url: firstImage }));
    rerender(view({}));
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('.rs-uploader-file-item-icon')).not.toBeNull();
  });

  it('clears the old blob thumbnail before a replacement read finishes', () => {
    const { container, rerender } = render(view({ blobFile: blob('a') }));
    finish(latest(), firstImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(firstImage);
    rerender(view({ blobFile: blob('b') }));
    expect(container.querySelector('img')).toBeNull();
    finish(latest(), secondImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
  });

  it('keeps the replacement thumbnail when an older read completes last', () => {
    const { container, rerender } = render(view({ blobFile: blob('a') }));
    const old = latest();
    rerender(view({ blobFile: blob('b') }));
    finish(latest(), secondImage);
    finish(old, firstImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
    expect(old.abort).toHaveBeenCalledTimes(1);
  });

  it('gives a new explicit URL priority over a pending blob result', () => {
    const file = blob('a');
    const { container, rerender } = render(view({ blobFile: file }));
    const old = latest();
    rerender(view({ blobFile: file, url: secondImage }));
    finish(old, firstImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
    expect(old.abort).toHaveBeenCalledTimes(1);
  });

  it('reads the current blob after an explicit URL is removed', () => {
    const file = blob('b');
    const { container, rerender } = render(view({ blobFile: file, url: firstImage }));
    expect(ControlledReader.readers).toHaveLength(0);
    rerender(view({ blobFile: file }));
    expect(container.querySelector('img')).toBeNull();
    finish(latest(), secondImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
  });

  it('clears a thumbnail when its blob is removed', () => {
    const { container, rerender } = render(view({ blobFile: blob('a') }));
    finish(latest(), firstImage);
    rerender(view({}));
    expect(container.querySelector('img')).toBeNull();
  });

  it('invalidates a pending read when the size limit excludes the blob', () => {
    const file = blob('ab');
    const { container, rerender } = render(view({ blobFile: file }, 2));
    const old = latest();
    rerender(view({ blobFile: file }, 1));
    finish(old, firstImage);
    expect(container.querySelector('img')).toBeNull();
    expect(old.abort).toHaveBeenCalledTimes(1);
    rerender(view({ blobFile: file }, 2));
    finish(latest(), secondImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
  });

  it('does not read again for progress, name, or status updates to the same blob', () => {
    const file = blob('a');
    const { container, rerender } = render(view({ blobFile: file, progress: 0 }));
    const reader = latest();
    rerender(view({ blobFile: file, progress: 50, status: 'uploading', name: 'renamed.png' }));
    expect(ControlledReader.readers).toHaveLength(1);
    expect(reader.abort).not.toHaveBeenCalled();
    finish(reader, firstImage);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(firstImage);
  });

  it('aborts pending work on unmount without publishing a late result', () => {
    const { container, unmount } = render(view({ blobFile: blob('a') }));
    const reader = latest();
    unmount();
    expect(reader.abort).toHaveBeenCalledTimes(1);
    expect(reader.onloadend).toBeNull();
    finish(reader, firstImage);
    expect(container.innerHTML).toBe('');
  });
});

it('invalidates a pending preview when changing to the text layout', () => {
  const file = { fileKey: 'same', blobFile: blob('a') };
  const { container, rerender } = render(<UploadFileItem file={file} listType="picture" />);
  const old = latest();
  rerender(<UploadFileItem file={file} listType="text" />);
  finish(old, firstImage);
  expect(old.abort).toHaveBeenCalledTimes(1);
  rerender(<UploadFileItem file={{ ...file, blobFile: blob('b') }} listType="picture-text" />);
  expect(container.querySelector('img')).toBeNull();
  finish(latest(), secondImage);
  expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
});

it('cleans up StrictMode replay and ignores its obsolete callback', () => {
  const { container } = render(
    <StrictMode>
      <UploadFileItem file={{ blobFile: blob('a') }} listType="picture" />
    </StrictMode>
  );
  expect(ControlledReader.readers).toHaveLength(2);
  const [old, current] = ControlledReader.readers;
  finish(current, secondImage);
  finish(old, firstImage);
  expect(old.abort).toHaveBeenCalledTimes(1);
  expect(container.querySelector('img')?.getAttribute('src')).toBe(secondImage);
});
