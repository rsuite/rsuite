import { canUseDOM } from 'dom-lib';

export default function scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
  if (!canUseDOM) {
    return;
  }

  if (location.hash) {
    document.querySelector(location.hash)?.scrollIntoView(arg);
  }
}
