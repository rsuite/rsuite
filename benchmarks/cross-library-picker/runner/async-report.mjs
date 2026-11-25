export const asyncScenarios = ['response-order', 'error-recovery'];
export const expectedAsyncStates = {
  'response-order': [
    'alpha-pending',
    'newer-response-retained',
    'disabled-result-skipped-and-selected'
  ],
  'error-recovery': ['failed-search', 'empty-search', 'recovered-selection']
};
export function asyncSummary(report, expectedCases) {
  const failedCases = report.cases.filter(row => row.status !== 'completed').length;
  const browserErrors = report.cases.reduce(
    (sum, row) => sum + (row.browserErrors?.length ?? 0),
    0
  );
  const missingStates = report.cases.some(
    row =>
      !expectedAsyncStates[row.scenario] ||
      row.states?.map(state => state.name).join(',') !== expectedAsyncStates[row.scenario].join(',')
  );
  return {
    expectedCases,
    completedCases: report.cases.filter(row => row.status === 'completed').length,
    failedCases,
    browserErrors,
    scope: 'Fixed async application workflow; no universal component conformance or ranking.',
    exitCode:
      !report.complete ||
      report.error ||
      report.cases.length !== expectedCases ||
      failedCases ||
      browserErrors ||
      missingStates
        ? 1
        : 0
  };
}
