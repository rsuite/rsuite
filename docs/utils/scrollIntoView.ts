import { canUseDOM } from 'dom-lib';

export default function scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
  if (!canUseDOM) {
    return;
  }

  if (location.hash) {
    try {
      document.querySelector(decodeURIComponent(location.hash))?.scrollIntoView(arg);
    } catch (error) {
      console.log(error);
    }
  }
}
