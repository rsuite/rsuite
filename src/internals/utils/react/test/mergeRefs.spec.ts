import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import mergeRefs from '../mergeRefs';

function runCleanup(cleanup: void | (() => void)) {
  expect(cleanup).to.be.a('function');
  if (typeof cleanup === 'function') {
    cleanup();
  }
}

describe('internals/utils/mergeRefs', () => {
  it('assigns and clears object refs without returning a cleanup', () => {
    const first = React.createRef<HTMLElement>();
    const second = React.createRef<HTMLElement>();
    const node = document.createElement('div');
    const ref = mergeRefs(first, second);

    expect(ref(node)).toBeUndefined();
    expect(first.current).toBe(node);
    expect(second.current).toBe(node);

    ref(null);

    expect(first.current).toBeNull();
    expect(second.current).toBeNull();
  });

  it('calls legacy callback refs with null on detach', () => {
    const first = vi.fn();
    const second = vi.fn();
    const node = document.createElement('div');
    const ref = mergeRefs(first, second);

    expect(ref(node)).toBeUndefined();
    ref(null);

    expect(first.mock.calls).toEqual([[node], [null]]);
    expect(second.mock.calls).toEqual([[node], [null]]);
  });

  it('clears existing object refs and calls callbacks when initially passed null', () => {
    const objectRef = { current: document.createElement('div') as HTMLElement | null };
    const callback = vi.fn();
    const ref = mergeRefs(objectRef, callback);

    expect(ref(null)).toBeUndefined();

    expect(objectRef.current).toBeNull();
    expect(callback.mock.calls).toEqual([[null]]);
  });

  it('accepts absent refs', () => {
    const ref = mergeRefs<HTMLElement>(undefined, null);

    expect(ref(document.createElement('div'))).toBeUndefined();
    expect(() => ref(null)).not.toThrow();
  });

  it('runs both callback cleanups exactly once without passing null', () => {
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    const first = vi.fn(() => firstCleanup);
    const second = vi.fn(() => secondCleanup);
    const node = document.createElement('div');
    const ref = mergeRefs(first, second);
    const cleanup = ref(node);

    runCleanup(cleanup);
    runCleanup(cleanup);
    ref(null);

    expect(firstCleanup).toHaveBeenCalledTimes(1);
    expect(secondCleanup).toHaveBeenCalledTimes(1);
    expect(first.mock.calls).toEqual([[node]]);
    expect(second.mock.calls).toEqual([[node]]);
  });

  it('clears object refs when a callback cleanup is returned', () => {
    const objectRef = React.createRef<HTMLElement>();
    const callbackCleanup = vi.fn();
    const callback = vi.fn(() => callbackCleanup);
    const node = document.createElement('div');
    const ref = mergeRefs(objectRef, callback);
    const cleanup = ref(node);

    expect(objectRef.current).toBe(node);
    runCleanup(cleanup);

    expect(objectRef.current).toBeNull();
    expect(callbackCleanup).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls).toEqual([[node]]);
  });

  it('detaches legacy refs in a nested composition with callback cleanup', () => {
    const objectRef = React.createRef<HTMLElement>();
    const legacyCallback = vi.fn();
    const callbackCleanup = vi.fn();
    const callback = vi.fn(() => callbackCleanup);
    const node = document.createElement('div');
    const ref = mergeRefs(mergeRefs(objectRef, legacyCallback), callback);

    runCleanup(ref(node));

    expect(objectRef.current).toBeNull();
    expect(legacyCallback.mock.calls).toEqual([[node], [null]]);
    expect(callbackCleanup).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls).toEqual([[node]]);
  });

  it('uses the callback cleanup when React detaches by passing null', () => {
    const callbackCleanup = vi.fn();
    const callback = vi.fn(() => callbackCleanup);
    const node = document.createElement('div');
    const ref = mergeRefs(callback);
    const cleanup = ref(node);

    ref(null);
    runCleanup(cleanup);

    expect(callbackCleanup).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls).toEqual([[node]]);
  });

  it('keeps a later attachment intact when its previous cleanup is called again', () => {
    const objectRef = React.createRef<HTMLElement>();
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    const callback = vi.fn().mockReturnValueOnce(firstCleanup).mockReturnValueOnce(secondCleanup);
    const ref = mergeRefs(objectRef, callback);
    const firstNode = document.createElement('div');
    const secondNode = document.createElement('div');
    const cleanup = ref(firstNode);

    runCleanup(cleanup);
    const nextCleanup = ref(secondNode);
    runCleanup(cleanup);

    expect(objectRef.current).toBe(secondNode);
    expect(firstCleanup).toHaveBeenCalledTimes(1);
    expect(secondCleanup).not.toHaveBeenCalled();

    runCleanup(nextCleanup);

    expect(objectRef.current).toBeNull();
    expect(secondCleanup).toHaveBeenCalledTimes(1);
  });

  it('clears the other ref even when a callback cleanup throws', () => {
    const objectRef = React.createRef<HTMLElement>();
    const callback = () => () => {
      throw new Error('Cleanup failed');
    };
    const ref = mergeRefs(callback, objectRef);
    const cleanup = ref(document.createElement('div'));

    expect(() => runCleanup(cleanup)).toThrow('Cleanup failed');
    expect(objectRef.current).toBeNull();
    expect(() => ref(null)).not.toThrow();
  });
});
