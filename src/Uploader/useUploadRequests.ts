import { useCallback, useRef } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { FileType } from './Uploader';

/** Own every active attempt, including several requests for the same file. */
export default function useUploadRequests(onUnmount: (count: number) => void) {
  const requests = useRef(new Map<XMLHttpRequest, FileType>());
  const active = useRef(true);
  const registerRequest = useCallback((xhr: XMLHttpRequest, file: FileType) => {
    requests.current.set(xhr, file);
  }, []);
  const finishRequest = useCallback((xhr: XMLHttpRequest) => requests.current.delete(xhr), []);
  const isActiveRequest = useCallback((xhr: XMLHttpRequest) => requests.current.has(xhr), []);
  const isUploaderActive = useCallback(() => active.current, []);
  const cancelRequests = useCallback((shouldCancel: (file: FileType) => boolean) => {
    const canceled = [...requests.current].filter(([, file]) => shouldCancel(file));
    // Release ownership before abort dispatches synchronous native callbacks.
    canceled.forEach(([xhr]) => requests.current.delete(xhr));
    canceled.forEach(([xhr]) => xhr.abort());
    return canceled.length;
  }, []);
  const cancelOnUnmount = useEventCallback(() => onUnmount(cancelRequests(() => true)));

  useIsomorphicLayoutEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      cancelOnUnmount();
    };
  }, [cancelOnUnmount]);

  return { registerRequest, finishRequest, isActiveRequest, isUploaderActive, cancelRequests };
}
