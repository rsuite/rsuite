import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { isDeepStrictEqual } from 'node:util';
import { inputs, packageFingerprint, candidateDependencies, hash } from '../integrity.mjs';
import { installedDependencies } from '../dependencies.mjs';
export function assertBuildState(root, built) {
  if (
    !isDeepStrictEqual(inputs(root), built.sourceInputs) ||
    !isDeepStrictEqual(candidateDependencies(root), built.candidateDependencies) ||
    packageFingerprint(root) !== built.candidateFingerprint ||
    packageFingerprint(root, path.resolve(root, '../../lib')) !== built.candidateFingerprint
  )
    throw Error('Stale source/config/candidate build');
  if (!isDeepStrictEqual(installedDependencies(root), built.installedDependencies))
    throw Error('Stale installed dependency build');
  for (const [library, build] of Object.entries(built.builds))
    for (const artifact of build.artifacts)
      if (
        hash(fs.readFileSync(path.join(root, 'dist', library, artifact.file))) !== artifact.sha256
      )
        throw Error('Stale artifact ' + library + '/' + artifact.file);
}
export function artifactGuard(root, built) {
  const expected = new Map(
    Object.entries(built.builds).flatMap(([library, build]) =>
      build.artifacts.map(a => [library + '/' + a.file.split(path.sep).join('/'), a.sha256])
    )
  );
  return {
    checked: 0,
    violations: [],
    check(file, bytes) {
      const name = path.relative(path.join(root, 'dist'), file).split(path.sep).join('/'),
        actual = hash(bytes);
      if (expected.get(name) !== actual) {
        this.violations.push({ file: name, expected: expected.get(name) ?? null, actual });
        throw Error('Unbound response artifact ' + name);
      }
      this.checked++;
    }
  };
}
export function validateRunIntegrity(report) {
  assert.equal(report.captureProtocol, 'single-task-v1');
  assert.equal(report.integrity?.protocol, 'response-and-final-v1');
  assert.equal(report.integrity.before, true);
  assert.equal(report.integrity.after, true);
  assert.ok(
    Number.isInteger(report.integrity.responsesChecked) && report.integrity.responsesChecked > 0
  );
  assert(Array.isArray(report.cases));
  assert(report.integrity.responsesChecked >= report.cases.length);
  assert.deepEqual(report.integrity.violations, []);
}

export function checkedSummary(report, summary) {
  if (report.summary !== undefined)
    assert.deepEqual(report.summary, summary, 'Report summary contradicts case outcomes');
  return summary;
}
