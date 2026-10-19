type ErrorUpdate = (errors: any) => any;

/** Keep accepted field changes in proposals held by synchronous owner callbacks. */
export function createFormErrorFrames() {
  const active = new Set<{ errors: any }>();

  return {
    apply(update: ErrorUpdate) {
      for (const frame of active) frame.errors = update(frame.errors);
    },
    run(errors: any, callback: () => void) {
      const frame = { errors };
      active.add(frame);
      try {
        callback();
        return frame.errors;
      } finally {
        // Never retain proposals across async work or a throwing owner callback.
        active.delete(frame);
      }
    }
  };
}
