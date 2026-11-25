import { validTouchCase } from './touch.mjs';

export const states = {
  'nested-validation': ['invalid-nested-fields', 'valid-nested-submission'],
  'dynamic-fields': [
    'new-row-invalid',
    'remaining-row-shifted',
    'removed-error-cleared',
    'dynamic-submission'
  ],
  'conditional-reset': ['conditional-invalid', 'hidden-field-retired', 'reset-restores-values'],
  'async-validation': ['old-request-pending', 'new-result-retained', 'latest-value-submitted']
};
function matchesDirection(layout, direction) {
  if (!layout || !['ltr', 'rtl'].includes(direction)) return false;
  if (layout.document !== direction || layout.form !== direction) return false;
  if (!Array.isArray(layout.fieldDirections) || !layout.fieldDirections.length) return false;
  if (layout.fieldDirections.some(field => field.direction !== direction)) return false;
  if (!Array.isArray(layout.actions) || layout.actions.length !== 2) return false;

  const [submit, reset] = layout.actions;
  if (submit?.text !== 'Submit' || reset?.text !== 'Reset') return false;
  if (
    !layout.actions.every(
      item =>
        item.width > 0 && item.height > 0 && item.left >= 0 && item.right <= layout.viewportWidth
    )
  )
    return false;
  return direction === 'rtl' ? reset.right <= submit.left : submit.right <= reset.left;
}

export function summarize(report, expectedCases) {
  const passed = row =>
    !!states[row.scenario] &&
    row.status === 'completed' &&
    row.direction === report.config?.direction &&
    matchesDirection(row.directionLayout, row.direction) &&
    !row.browserErrors?.length &&
    JSON.stringify(row.states?.map(state => state.name)) === JSON.stringify(states[row.scenario]) &&
    !(row.states ?? []).some(state => state.state?.invalidReferences?.length) &&
    validTouchCase(row, states[row.scenario]);
  const failedCases = report.cases.filter(row => !passed(row)).length;
  const browserErrors = report.cases.reduce(
    (sum, row) => sum + (row.browserErrors?.length ?? 0),
    0
  );
  const brokenReferenceOccurrences = report.cases.reduce(
    (sum, row) =>
      sum +
      (row.states ?? []).reduce(
        (count, state) => count + (state.state?.invalidReferences?.length ?? 0),
        0
      ),
    0
  );
  const missingStates = report.cases.some(
    row =>
      !states[row.scenario] ||
      JSON.stringify(row.states?.map(state => state.name)) !== JSON.stringify(states[row.scenario])
  );
  return {
    expectedCases,
    passedCases: report.cases.length - failedCases,
    failedCases,
    browserErrors,
    brokenReferenceOccurrences,
    exitCode:
      !report.complete ||
      report.error ||
      report.cases.length !== expectedCases ||
      failedCases ||
      browserErrors ||
      brokenReferenceOccurrences ||
      missingStates
        ? 1
        : 0,
    scope:
      'Case outcomes are not unique defect counts, native capability attribution, conformance or a library score.'
  };
}
