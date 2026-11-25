export function restoreModalFocus(lastFocus: { current: HTMLElement | null }) {
  if (lastFocus.current) {
    lastFocus.current.focus?.();
    lastFocus.current = null;
  }
}

export function finishModalExit(setExited: (exited: boolean) => void, close: () => void) {
  setExited(true);
  // Release the trap before consumers choose their next focus destination.
  close();
}

export function getModalDialog(modal: { readonly dialog: HTMLElement | null }) {
  return modal.dialog;
}
import getTabbableElements from './getTabbableElements';
import type React from 'react';

type TabNavigation = { source: Element | null; backwards: boolean } | null;

export function clearModalTabNavigation(
  timer: { current: ReturnType<typeof setTimeout> | undefined },
  navigation: { current: TabNavigation }
) {
  clearTimeout(timer.current);
  navigation.current = null;
}

export function moveModalFocus(
  modal: { readonly dialog: HTMLElement | null },
  source: Element | null,
  backwards: boolean
) {
  const dialog = modal.dialog;
  if (!dialog) return;
  const elements = getTabbableElements(dialog, backwards, source);
  const index = elements.indexOf(source as HTMLElement);
  const next =
    index < 0
      ? backwards
        ? elements[elements.length - 1]
        : elements[0]
      : elements[(index + (backwards ? -1 : 1) + elements.length) % elements.length];
  (next || dialog).focus();
}

export function handleModalFocusGuard(
  enforceFocus: boolean,
  modal: { isTopModal(): boolean },
  navigation: { current: TabNavigation },
  clear: () => void,
  focusNext: (source: Element | null, backwards: boolean) => void,
  startGuard: { current: HTMLElement | null },
  event: React.FocusEvent
) {
  if (!enforceFocus || !modal.isTopModal()) return;
  const current = navigation.current;
  clear();
  focusNext(current?.source || null, current?.backwards ?? event.target === startGuard.current);
}
