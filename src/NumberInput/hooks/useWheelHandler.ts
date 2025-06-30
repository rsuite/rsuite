import { useEffect, type RefObject } from 'react';
import on from 'dom-lib/on';

/**
 * Attach wheel listener to inputRef.
 */
export function useWheelHandler(
  inputRef: RefObject<HTMLInputElement | null>,
  handleWheel: (event: React.WheelEvent<HTMLInputElement>) => void,
  scrollable: boolean
) {
  useEffect(() => {
    let wheelListener: ReturnType<typeof on>;
    if (inputRef.current) {
      wheelListener = on(inputRef.current, 'wheel', handleWheel, { passive: false });
    }
    return () => {
      wheelListener?.off();
    };
  }, [inputRef, handleWheel, scrollable]);
}
