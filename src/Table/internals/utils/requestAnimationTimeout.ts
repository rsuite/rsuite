import requestAnimationFramePolyfill from 'dom-lib/requestAnimationFramePolyfill';
import cancelAnimationFramePolyfill from 'dom-lib/cancelAnimationFramePolyfill';

export interface AnimationFrameHandle {
  id: number;
}

export const cancelAnimationTimeout = (frame: AnimationFrameHandle) =>
  cancelAnimationFramePolyfill(frame.id);

/**
 * Recursively calls requestAnimationFrame until a specified delay has been met or exceeded.
 * When the delay time has been reached the function you're timing out will be called.
 *
 * Credit: Joe Lambert (https://gist.github.com/joelambert/1002116#file-requesttimeout-js)
 */
export const requestAnimationTimeout = (
  callback: () => void,
  delay: number
): AnimationFrameHandle => {
  let start: number;
  // wait for end of processing current event handler, because event handler may be long
  Promise.resolve().then(() => {
    start = Date.now();
  });

  let frame: AnimationFrameHandle = { id: 0 };

  const timeout = () => {
    if (Date.now() - start >= delay) {
      callback.call(null);
    } else {
      frame.id = requestAnimationFramePolyfill(timeout) as number;
    }
  };

  frame = {
    id: requestAnimationFramePolyfill(timeout) as number
  };

  return frame;
};
