import { isAndroid } from '../BrowserDetection';

const strNone = 'none';

/**
 * Sets the selection range of an HTMLInputElement safely.
 */
export function safeSetSelection(
  element: HTMLInputElement,
  selectionStart: number,
  selectionEnd: number,
  canSetSelection?: () => boolean
) {
  if (document.activeElement === element) {
    if (isAndroid()) {
      requestAnimationFrame(() => {
        if (!canSetSelection || canSetSelection()) {
          element.setSelectionRange(selectionStart, selectionEnd, strNone);
        }
      });
    } else {
      if (!canSetSelection || canSetSelection()) {
        element.setSelectionRange(selectionStart, selectionEnd, strNone);
      }
    }
  }
}

export default safeSetSelection;
