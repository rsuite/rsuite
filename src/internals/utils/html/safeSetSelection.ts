import { isAndroid } from '../BrowserDetection';

const strNone = 'none';

/**
 * Sets the selection range of an HTMLInputElement safely.
 */
export function safeSetSelection(
  element: HTMLInputElement,
  selectionStart: number,
  selectionEnd: number,
  shouldSetSelection?: () => boolean
) {
  const setSelection = () => {
    if (!shouldSetSelection || shouldSetSelection()) {
      element.setSelectionRange(selectionStart, selectionEnd, strNone);
    }
  };

  if (document.activeElement === element) {
    if (isAndroid()) {
      requestAnimationFrame(setSelection);
    } else {
      setSelection();
    }
  }
}

export default safeSetSelection;
