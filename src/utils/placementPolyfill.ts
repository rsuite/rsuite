/**
 * placementPolyfill('bottomLeft');
 * output 'bottomStart'
 */

export default (placement: string, rtl = false) => {
  if (typeof placement === 'string') {
    if (rtl) {
      placement = placement.replace(/left|right/, m => (m === 'left' ? 'right' : 'left'));
    }
    return placement.replace(/Left|Top/, 'Start').replace(/Right|Bottom/, 'End');
  }
  return placement;
};
