import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseArgs, isDeepStrictEqual } from 'node:util';
import { spawnSync } from 'node:child_process';
import { chromium, firefox } from 'playwright';
import { inputs, packageFingerprint, candidateDependencies, hash } from './integrity.mjs';
import { serve } from '../cross-library-picker/runner/server.mjs';
import { bounded } from '../cross-library-picker/runner/diagnostics.mjs';
import { runScenario } from './runner/workflows.mjs';
import { states, summarize } from './runner/report.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    browser: { type: 'string', default: 'chromium' },
    libraries: { type: 'string', default: 'rsuite,antd,chakra,heroui' },
    scenarios: { type: 'string', default: Object.keys(states).join(',') },
    'submit-modes': { type: 'string', default: 'pointer,keyboard' },
    output: { type: 'string', default: 'results/form-' + Date.now() + '.json' },
    'skip-build': { type: 'boolean', default: false }
  }
});
const libraries = values.libraries.split(','),
  scenarios = values.scenarios.split(','),
  submitModes = values['submit-modes'].split(',');
if (
  !['chromium', 'firefox'].includes(values.browser) ||
  libraries.some(value => !['rsuite', 'antd', 'chakra', 'heroui'].includes(value)) ||
  scenarios.some(value => !Object.keys(states).includes(value)) ||
  submitModes.some(value => !['pointer', 'keyboard'].includes(value)) ||
  [libraries, scenarios, submitModes].some(list => new Set(list).size !== list.length)
)
  throw new Error('Invalid form options');
if (!values['skip-build']) {
  const result = spawnSync(process.execPath, ['build.mjs'], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/build-inputs.json')));
if (
  !isDeepStrictEqual(manifest.sourceInputs, inputs(root)) ||
  !isDeepStrictEqual(manifest.candidateDependencies, candidateDependencies(root)) ||
  manifest.candidateFingerprint !== packageFingerprint(root) ||
  manifest.candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib'))
)
  throw new Error('Form build/source/package mismatch');
for (const library of libraries)
  for (const artifact of manifest.builds[library].artifacts)
    if (artifact.sha256 !== hash(fs.readFileSync(path.join(root, 'dist', library, artifact.file))))
      throw new Error('Form built artifact changed: ' + artifact.file);
const report = {
  startedAt: new Date().toISOString(),
  config: values,
  manifest,
  complete: false,
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    os: os.release(),
    cpu: os.cpus()[0]?.model
  },
  cases: [],
  scope: manifest.scope
};
const output = path.resolve(root, values.output);
fs.mkdirSync(path.dirname(output), { recursive: true });
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
save();
let server, browser;
try {
  server = await serve(path.join(root, 'dist'));
  browser = await { chromium, firefox }[values.browser].launch();
  report.environment.browserVersion = browser.version();
  for (const submitMode of submitModes)
    for (const scenario of scenarios)
      for (const library of libraries) {
        const record = {
          library,
          scenario,
          submitMode,
          status: 'active',
          states: [],
          browserErrors: []
        };
        report.cases.push(record);
        save();
        const context = await browser.newContext({
          viewport: { width: 1280, height: 1000 },
          reducedMotion: 'reduce',
          locale: 'en-US'
        });
        const page = await context.newPage();
        page.setDefaultTimeout(12000);
        page.on('pageerror', error => record.browserErrors.push(String(error)));
        try {
          await bounded(
            () => runScenario(page, server.url + '/' + library + '/', scenario, record, save),
            90000,
            'Form workflow case'
          );
          if (record.browserErrors.length)
            throw new Error('Page errors: ' + record.browserErrors.join('; '));
          record.status = 'completed';
          console.log('PASS', library, scenario, submitMode);
        } catch (error) {
          record.status = 'failed';
          record.error = String(error);
          record.errorStack = String(error.stack ?? '');
          save();
          record.artifactErrors = [];
          try {
            record.failureSnapshot = await bounded(
              () => page.evaluate(() => window.formBenchmark?.snapshot()),
              3000,
              'Form failure snapshot'
            );
          } catch (captureError) {
            record.artifactErrors.push(String(captureError));
          }
          try {
            record.screenshot =
              output.replace(/\.json$/, '') +
              '-' +
              library +
              '-' +
              scenario +
              '-' +
              submitMode +
              '.png';
            await bounded(
              () => page.screenshot({ path: record.screenshot, timeout: 3000 }),
              3000,
              'Form failure screenshot'
            );
          } catch (captureError) {
            record.artifactErrors.push(String(captureError));
          }
          console.log('FAIL', library, scenario, submitMode, record.phase, record.error);
        } finally {
          save();
          await context.close();
        }
      }
  report.complete = true;
} catch (error) {
  report.error = String(error);
} finally {
  report.completedAt = new Date().toISOString();
  report.summary = summarize(report, libraries.length * scenarios.length * submitModes.length);
  save();
  await browser?.close();
  await server?.close();
}
console.log('Report:', output, report.summary);
process.exitCode = report.summary.exitCode;
