import canUseDOM from 'dom-lib/canUseDOM';

export default function isSupportTouchEvent() {
  return canUseDOM && 'ontouchstart' in window;
}
