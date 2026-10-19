const assert = require('node:assert/strict');
const { verifyCoverageReports, writeCoverageOutput } = require('./verify-coverage-reports-ci.cjs');

function verifyBrowserCoverage(directory, browser) {
  assert(['chromium', 'firefox'].includes(browser), 'Choose chromium or firefox.');
  const expected = ['React18', 'React19', 'React19.3']
    .flatMap(react => [1, 2].map(shard => `browser-coverage-${browser}-${react}-${shard}`))
    .sort();
  return verifyCoverageReports(directory, expected, {
    description: 'Coverage must contain exactly both shards for each React runtime.'
  });
}

module.exports = { verifyBrowserCoverage };

if (require.main === module) {
  writeCoverageOutput(verifyBrowserCoverage(process.argv[2], process.argv[3]));
}
