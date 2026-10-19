import { useCallback, useRef } from 'react';
import { useEventCallback, useIsMounted, useWillUnmount } from '@/internals/hooks';
import type { FileType } from './Uploader';

export type PendingUploadApproval = { file: FileType };

/** Own each asynchronous approval until it settles or its file is canceled. */
export default function usePendingUploadApprovals(onCancel: (count: number) => void) {
  const pending = useRef(new Set<PendingUploadApproval>());
  const isMounted = useIsMounted();

  const createApproval = useCallback((file: FileType) => {
    const approval = { file };
    pending.current.add(approval);
    return approval;
  }, []);

  const consumeApproval = useCallback(
    (approval: PendingUploadApproval) => pending.current.delete(approval),
    []
  );

  const cancelApprovals = useEventCallback((shouldCancel: (file: FileType) => boolean) => {
    const files: FileType[] = [];
    let count = 0;

    pending.current.forEach(approval => {
      if (shouldCancel(approval.file)) {
        pending.current.delete(approval);
        count++;
        if (!files.some(file => file.fileKey === approval.file.fileKey)) {
          files.push(approval.file);
        }
      }
    });

    if (count) onCancel(count);
    return files;
  });

  useWillUnmount(() => {
    cancelApprovals(() => true);
  });

  return { createApproval, consumeApproval, cancelApprovals, isMounted };
}
