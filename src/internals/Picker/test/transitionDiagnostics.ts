import { observeTransitions } from '../../../Animation/test/transitionDiagnostics';

export function observePickerTransitions() {
  return observeTransitions('[data-testid="picker-popup"]');
}
