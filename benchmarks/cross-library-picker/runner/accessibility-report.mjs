export const auditStates = ['closed', 'open', 'keyboard-scrolled', 'empty-search'];

/** Fixture ID-reference checks supplement axe; they do not assess ARIA conformance. */
export function referenceFailures(relationships) {
  return relationships.flatMap(element => {
    const failures = [];
    for (const reference of element.references) {
      // Closed popups may be unmounted. Expanded fixture popups must own a listbox.
      if (reference.attribute === 'aria-controls' && !element.expanded) continue;
      if (reference.attribute === 'aria-controls' && !reference.targets.length) {
        failures.push({
          attribute: reference.attribute,
          reason: 'Expanded combobox has no controlled popup'
        });
      }
      for (const target of reference.targets) {
        if (!target.exists) {
          failures.push({
            attribute: reference.attribute,
            id: target.id,
            reason: 'Missing ID reference'
          });
        } else if (reference.attribute === 'aria-controls' && target.role !== 'listbox') {
          failures.push({
            attribute: reference.attribute,
            id: target.id,
            reason: 'Fixture popup is not a listbox'
          });
        }
      }
    }
    return failures;
  });
}

export function auditSummary(report, expectedCases) {
  const states = report.cases.flatMap(record => record.states);
  const confirmedViolations = states.reduce((sum, state) => sum + state.axe.violations.length, 0);
  const referenceFailures = states.reduce((sum, state) => sum + state.referenceFailures.length, 0);
  const incompleteRules = states.reduce((sum, state) => sum + state.axe.incomplete.length, 0);
  const failedCases = report.cases.filter(record => record.status !== 'completed').length;
  const browserErrors = report.cases.reduce(
    (sum, record) => sum + (record.browserErrors?.length ?? 0),
    0
  );
  const missingStates = report.cases.some(
    record => record.states.map(state => state.state).join(',') !== auditStates.join(',')
  );
  const engineControlPassed = report.controls.some(
    control => control.knownUnlabelledInputDetected === true
  );
  return {
    expectedCases,
    completedCases: report.cases.filter(record => record.status === 'completed').length,
    failedCases,
    browserErrors,
    auditedStates: states.length,
    confirmedViolations,
    referenceFailures,
    incompleteRules,
    manualReviewRequired: true,
    conformance: 'not assessed',
    engineControlPassed,
    exitCode:
      !report.complete ||
      report.cases.length !== expectedCases ||
      failedCases ||
      missingStates ||
      confirmedViolations ||
      referenceFailures ||
      browserErrors ||
      !engineControlPassed ||
      report.error
        ? 1
        : 0
  };
}
