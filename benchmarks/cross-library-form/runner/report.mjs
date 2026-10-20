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
export function summarize(report, expectedCases) {
  const passed = row =>
    !!states[row.scenario] &&
    row.status === 'completed' &&
    !row.browserErrors?.length &&
    JSON.stringify(row.states?.map(state => state.name)) === JSON.stringify(states[row.scenario]) &&
    !(row.states ?? []).some(state => state.state?.invalidReferences?.length);
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
