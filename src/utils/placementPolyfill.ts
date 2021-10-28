/**
 * placementPolyfill('bottomLeft');
 * output 'bottomStart'
 */

function placementPolyfill<T = string>(placement: T, rtl = false): T {
  if (typeof placement === 'string') {
    if (rtl) {
      (placement as unknown as string) = placement.replace(/left|right/, m =>
        m === 'left' ? 'right' : 'left'
      );
    }
    return (placement as unknown as string)
      .replace(/Left|Top/, 'Start')
      .replace(/Right|Bottom/, 'End') as unknown as T;
  }
  return placement;
}

export default placementPolyfill;
