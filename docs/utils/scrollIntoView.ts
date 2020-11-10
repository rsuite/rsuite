import { canUseDOM } from 'dom-lib';

export default function scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
  if (!canUseDOM) {
    return;
  }

  if (location.hash) {
    // TODO: 处理中文
    document.querySelector(location.hash)?.scrollIntoView(arg);
  }
}
