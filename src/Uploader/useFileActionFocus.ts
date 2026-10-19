import { useReducer, useRef, type MouseEvent, type RefObject } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { isFocusableElement } from '@/internals/utils';
import type { FileType } from './Uploader';
import type { UploadTriggerInstance } from './UploadTrigger';

type FileKey = FileType['fileKey'];
interface FocusRequest {
  source: HTMLElement;
  focusRoot: Document | ShadowRoot;
  fileKey: FileKey;
  neighbors: FileKey[];
  action: 'remove' | 'retry';
  cleanup: () => void;
}

interface Options {
  rootRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<UploadTriggerInstance | null>;
  triggerAvailable: boolean;
  files: FileType[];
}

export default function useFileActionFocus({
  rootRef,
  triggerRef,
  triggerAvailable,
  files
}: Options) {
  const fileElements = useRef(new Map<FileKey, HTMLElement>());
  const pending = useRef<FocusRequest | null>(null);
  const [, requestCommit] = useReducer(value => value + 1, 0);
  const cancel = useEventCallback(() => {
    pending.current?.cleanup();
    pending.current = null;
  });

  useIsomorphicLayoutEffect(() => cancel, [cancel]);

  const registerFile = useEventCallback((key: FileKey, element: HTMLElement | null) => {
    if (element) fileElements.current.set(key, element);
    else fileElements.current.delete(key);
  });

  const requestFocus = useEventCallback(
    (fileKey: FileKey, event: MouseEvent, action: FocusRequest['action']) => {
      cancel();
      const source = event.currentTarget as HTMLElement;
      const focusRoot = source.getRootNode() as Document | ShadowRoot;
      if (focusRoot.activeElement !== source || !rootRef.current?.contains(source)) return;

      const ownerDocument = source.ownerDocument;
      const keys = files.map(file => file.fileKey);
      const index = keys.indexOf(fileKey);
      const handleFocus = (event: FocusEvent) => {
        const target = event.composedPath()[0];
        if (target !== source && (source.isConnected || target !== ownerDocument.body)) cancel();
      };
      ownerDocument.addEventListener('focusin', handleFocus, true);
      pending.current = {
        source,
        focusRoot,
        fileKey,
        neighbors: [...keys.slice(index + 1), ...keys.slice(0, index).reverse()],
        action,
        cleanup: () => {
          ownerDocument.removeEventListener('focusin', handleFocus, true);
        }
      };
      // Also expire requests for manual retries, which may not change the file list.
      requestCommit();
    }
  );

  const completeFocusRequest = useEventCallback(() => {
    const request = pending.current;
    // Check after consumer callbacks: Chromium also emits blur during DOM removal,
    // before the source is disconnected. That blur must not cancel recovery.
    if (request?.source.isConnected && request.focusRoot.activeElement !== request.source) cancel();
  });

  useIsomorphicLayoutEffect(() => {
    const request = pending.current;
    if (!request) return;
    cancel();

    const root = rootRef.current;
    const active = request.focusRoot.activeElement;
    if (
      !root?.isConnected ||
      request.source.isConnected ||
      (active && active !== root.ownerDocument.body)
    )
      return;

    const focus = (element: HTMLElement | null | undefined) => {
      if (
        !element?.isConnected ||
        !root.contains(element) ||
        element.matches(':disabled, [aria-disabled="true"]') ||
        element.closest('[hidden], [inert], [aria-hidden="true"]') ||
        !element.getClientRects().length
      )
        return false;
      const visibility = element.ownerDocument.defaultView?.getComputedStyle(element).visibility;
      if (visibility === 'hidden' || visibility === 'collapse') return false;
      element.focus();
      return (element.getRootNode() as Document | ShadowRoot).activeElement === element;
    };
    const focusFile = (key: FileKey) => {
      const row = fileElements.current.get(key);
      if (!row || row.dataset.disabled === 'true') return false;
      for (const action of ['remove', 'retry', 'preview']) {
        if (focus(row.querySelector<HTMLElement>(`[data-rs-uploader-action="${action}"]`)))
          return true;
      }
      return focus(row);
    };

    if (request.action === 'retry' && focusFile(request.fileKey)) return;
    for (const key of request.neighbors) if (focusFile(key)) return;
    const trigger = triggerRef.current?.root;
    if (trigger && triggerAvailable) {
      for (const element of trigger.querySelectorAll<HTMLElement>('*')) {
        if (
          !element.hasAttribute('data-rs-uploader-input') &&
          isFocusableElement(element) &&
          focus(element)
        )
          return;
      }
    }
    focus(root);
  });

  return { registerFile, requestFocus, completeFocusRequest };
}
