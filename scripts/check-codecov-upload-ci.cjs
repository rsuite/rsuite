const acceptedOutcomes = [
  ['success', 'skipped', 'skipped'],
  ['failure', 'success', 'skipped'],
  ['failure', 'failure', 'success']
];

function verifyUploadOutcomes(outcomes) {
  if (
    !Array.isArray(outcomes) ||
    outcomes.length !== 3 ||
    !acceptedOutcomes.some(expected => expected.every((value, index) => outcomes[index] === value))
  ) {
    throw new Error(`Coverage delivery did not complete successfully: ${JSON.stringify(outcomes)}`);
  }

  return outcomes.indexOf('success') + 1;
}

module.exports = { verifyUploadOutcomes };

if (require.main === module) {
  try {
    const attempt = verifyUploadOutcomes([
      process.env.CODECOV_ATTEMPT_1,
      process.env.CODECOV_ATTEMPT_2,
      process.env.CODECOV_ATTEMPT_3
    ]);
    console.log(`Coverage delivery succeeded on attempt ${attempt}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
