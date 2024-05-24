import { isAndroid } from './BrowserDetection';

const strNone = 'none';

/**
 * Sets the selection range of an HTMLInputElement safely.
 */
export function safeSetSelection(
  element: HTMLInputElement,
  selectionStart: number,
  selectionEnd: number
) {
  if (document.activeElement === element) {
    if (isAndroid()) {
      requestAnimationFrame(() => element.setSelectionRange(selectionStart, selectionEnd, strNone));
    } else {
      element.setSelectionRange(selectionStart, selectionEnd, strNone);
    }
  }
}

export default safeSetSelection;
