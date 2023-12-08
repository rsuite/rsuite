import { isAndroid } from './BrowserDetection';

const defer = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;
const strNone = 'none';

function safeSetSelection(element: HTMLInputElement, selectionStart: number, selectionEnd: number) {
  if (document.activeElement === element) {
    if (isAndroid()) {
      defer(() => element.setSelectionRange(selectionStart, selectionEnd, strNone), 0);
    } else {
      element.setSelectionRange(selectionStart, selectionEnd, strNone);
    }
  }
}

export default safeSetSelection;
