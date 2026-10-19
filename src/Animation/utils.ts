import getLegacyTransitionEnd from 'dom-lib/getTransitionEnd';

export function getAnimationEnd() {
  const style = document.createElement('div').style;
  if ('animation' in style) {
    return 'animationend';
  }

  if ('webkitAnimation' in style) {
    return 'webkitAnimationEnd';
  }

  return 'animationend';
}

export function getTransitionEnd() {
  const style = document.createElement('div').style;
  if ('transition' in style) {
    return 'transitionend';
  }

  return getLegacyTransitionEnd();
}
