import scrollTop from 'dom-lib/scrollTop';
import requestAnimationFramePolyfill from 'dom-lib/requestAnimationFramePolyfill';

export default function scrollTopAnimation(
  target: Element,
  nextTop: number,
  animation = true,
  callback?: (top: number) => void
) {
  let top = scrollTop(target);
  const step = () => {
    scrollTop(target, top > nextTop ? nextTop : top);
    if (top <= nextTop) {
      requestAnimationFramePolyfill(step);
    }
    callback?.(top);
    top += 20;
  };
  if (animation) {
    requestAnimationFramePolyfill(step);
  } else {
    scrollTop(target, nextTop);
  }
}
