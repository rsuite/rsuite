async function bounded(operation, timeoutMs, label) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(label + ' exceeded ' + timeoutMs + 'ms')),
          timeoutMs
        );
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/** Enrich an already-recorded failure without replacing its original error. */
export async function captureFailureArtifacts(page, failure, { timeoutMs = 3000 } = {}) {
  failure.screenshotCaptured = false;
  failure.screenshotError = null;
  failure.diagnostic = null;
  failure.diagnosticError = null;
  failure.diagnosticStatus = 'pending';
  try {
    await bounded(
      () => page.screenshot({ path: failure.screenshot, fullPage: true, timeout: timeoutMs }),
      timeoutMs,
      'Failure screenshot'
    );
    failure.screenshotCaptured = true;
  } catch (error) {
    failure.screenshotError = String(error);
  }
  try {
    failure.diagnostic = await bounded(
      () =>
        page.evaluate(() => ({
          snapshot: window.pickerBenchmark?.snapshot(),
          measurement: window.pickerBenchmark?.result(),
          focusedElement: document.activeElement?.outerHTML
        })),
      timeoutMs,
      'Failure snapshot'
    );
    failure.diagnosticStatus = 'captured';
  } catch (error) {
    failure.diagnosticStatus = 'failed';
    failure.diagnosticError = String(error);
  }
  return failure;
}
