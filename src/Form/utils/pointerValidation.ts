interface PointerValidationConnection {
  isPressing: () => boolean;
  enqueue: (callback: () => void) => () => void;
  release: () => void;
}

interface DocumentEntry {
  users: number;
  isPressing: () => boolean;
  enqueue: (callback: () => void) => () => void;
  dispose: () => void;
}

const documents = new WeakMap<Document, DocumentEntry>();

function createEntry(document: Document, view: Window): DocumentEntry {
  const pointers = new Set<number>();
  const callbacks = new Set<() => void>();
  let timer: number | undefined;

  const flush = () => {
    view.clearTimeout(timer);
    timer = undefined;
    const pending = [...callbacks];
    try {
      pending.forEach(callback => {
        // An earlier validation can unmount another field or form during this flush.
        if (callbacks.delete(callback)) callback();
      });
    } finally {
      pending.forEach(callback => callbacks.delete(callback));
    }
  };

  const finish = () => {
    if (pointers.size) return;
    view.clearTimeout(timer);
    // Native mouseup/click finish in the input task before this fallback.
    timer = view.setTimeout(flush, 0);
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.isPrimary && event.button === 0) pointers.add(event.pointerId);
  };
  const onPointerUp = (event: PointerEvent) => {
    if (pointers.delete(event.pointerId)) finish();
  };
  const onPointerCancel = (event: PointerEvent) => {
    if (pointers.delete(event.pointerId) && !pointers.size) flush();
  };
  const onPointerMove = (event: PointerEvent) => {
    if (event.buttons === 0 && pointers.delete(event.pointerId)) finish();
  };
  const cancel = () => {
    pointers.clear();
    flush();
  };

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointerup', onPointerUp, true);
  document.addEventListener('pointercancel', onPointerCancel, true);
  document.addEventListener('pointermove', onPointerMove, true);
  document.addEventListener('click', flush, true);
  document.addEventListener('dragend', cancel, true);
  view.addEventListener('blur', cancel);

  return {
    users: 0,
    isPressing: () => pointers.size > 0,
    enqueue: callback => {
      callbacks.add(callback);
      return () => callbacks.delete(callback);
    },
    dispose: () => {
      callbacks.clear();
      pointers.clear();
      view.clearTimeout(timer);
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('pointerup', onPointerUp, true);
      document.removeEventListener('pointercancel', onPointerCancel, true);
      document.removeEventListener('pointermove', onPointerMove, true);
      document.removeEventListener('click', flush, true);
      document.removeEventListener('dragend', cancel, true);
      view.removeEventListener('blur', cancel);
    }
  };
}

export function retainPointerValidation(
  document: Document
): PointerValidationConnection | undefined {
  const view = document.defaultView;
  if (!view) return;
  let entry = documents.get(document);
  if (!entry) {
    entry = createEntry(document, view);
    documents.set(document, entry);
  }
  const current = entry;
  current.users++;
  let released = false;
  return {
    isPressing: current.isPressing,
    enqueue: current.enqueue,
    release: () => {
      if (released) return;
      released = true;
      if (--current.users === 0) {
        current.dispose();
        documents.delete(document);
      }
    }
  };
}
