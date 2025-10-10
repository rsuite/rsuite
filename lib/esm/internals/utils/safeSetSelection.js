'use client';
import { isAndroid } from "./BrowserDetection.js";
var strNone = 'none';

/**
 * Sets the selection range of an HTMLInputElement safely.
 */
export function safeSetSelection(element, selectionStart, selectionEnd) {
  if (document.activeElement === element) {
    if (isAndroid()) {
      requestAnimationFrame(function () {
        return element.setSelectionRange(selectionStart, selectionEnd, strNone);
      });
    } else {
      element.setSelectionRange(selectionStart, selectionEnd, strNone);
    }
  }
}
export default safeSetSelection;