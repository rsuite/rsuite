/**
 * placementPolyfill('bottomLeft');
 * output 'bottomStart'
 */

function placementPolyfill<T = string>(placement: T): T {
  if (typeof placement === 'string') {
    return (placement.replace(/Left|Top/, 'Start').replace(/Right|Bottom/, 'End') as unknown) as T;
  }
  return placement;
}

export default placementPolyfill;
