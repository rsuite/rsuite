import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMounted } from '@/internals/hooks';

export interface UseClipboardOptions {
  /** Milliseconds before resetting `copied`. Set to 0 to disable automatic reset. */
  timeout?: number;
}

export interface UseClipboardReturn {
  /** Whether the latest copy operation succeeded. */
  copied: boolean;
  /** The error from the latest copy operation, if any. */
  error: Error | null;
  /** Copy text and return whether the clipboard write succeeded. */
  copy: (text: string) => Promise<boolean>;
  /** Clear feedback and ignore the result of any pending copy operation. */
  reset: () => void;
}

/**
 * Copy text to the clipboard with success and error feedback.
 * Requires a browser with the Clipboard API in a secure context.
 * @see https://rsuitejs.com/components/use-clipboard/
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { timeout = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const request = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiresAt = useRef<number | null>(null);
  const isMounted = useIsMounted();

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const scheduleReset = useCallback(
    (delay: number) => {
      clearTimer();
      timer.current = setTimeout(() => {
        timer.current = null;
        expiresAt.current = null;
        setCopied(false);
      }, delay);
    },
    [clearTimer]
  );

  const reset = useCallback(() => {
    request.current += 1;
    clearTimer();
    expiresAt.current = null;
    setCopied(false);
    setError(null);
  }, [clearTimer]);

  useEffect(() => {
    // Activity preserves feedback state while disconnecting effects. Resume the
    // original deadline when effects reconnect instead of restarting the timeout.
    if (expiresAt.current !== null) {
      const remaining = expiresAt.current - Date.now();
      if (remaining > 0) {
        scheduleReset(remaining);
      } else {
        expiresAt.current = null;
        setCopied(false);
      }
    }

    return () => {
      request.current += 1;
      clearTimer();
    };
  }, [clearTimer, scheduleReset]);

  const copy = useCallback(
    async (text: string) => {
      const currentRequest = ++request.current;
      clearTimer();
      expiresAt.current = null;
      setCopied(false);
      setError(null);

      try {
        if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
          throw new Error('The Clipboard API is not available in this environment.');
        }

        await navigator.clipboard.writeText(text);

        if (isMounted() && currentRequest === request.current) {
          setCopied(true);

          if (timeout > 0) {
            expiresAt.current = Date.now() + timeout;
            scheduleReset(timeout);
          }
        }

        return true;
      } catch (cause) {
        if (isMounted() && currentRequest === request.current) {
          setError(cause instanceof Error ? cause : new Error(String(cause)));
        }

        return false;
      }
    },
    [clearTimer, isMounted, scheduleReset, timeout]
  );

  return { copied, error, copy, reset };
}

export default useClipboard;
