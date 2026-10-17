const { verifyCoverageReports, writeCoverageOutput } = require('./verify-coverage-reports-ci.cjs');

function verifySSRCoverage(directory) {
  const expected = ['React18', 'React19', 'React19.3']
    .map(react => `server-coverage-${react}`)
    .sort();
  return verifyCoverageReports(directory, expected, {
    description: 'Coverage must contain exactly one SSR report for each React runtime.',
    requireExecution: true
  });
}

module.exports = { verifySSRCoverage };

if (require.main === module) {
  writeCoverageOutput(verifySSRCoverage(process.argv[2]));
}
