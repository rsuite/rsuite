import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseArgs, isDeepStrictEqual } from 'node:util';
import { spawnSync } from 'node:child_process';
import { chromium, firefox } from 'playwright';
import { inputs, packageFingerprint, hash } from './integrity.mjs';
import { serve } from './runner/server.mjs';
import { bounded } from './runner/diagnostics.mjs';
import { runAsyncScenario } from './runner/async-workloads.mjs';
import { asyncScenarios, asyncSummary } from './runner/async-report.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    browser: { type: 'string', default: 'chromium' },
    libraries: { type: 'string', default: 'rsuite,antd,chakra,heroui' },
    modes: { type: 'string', default: 'standard,virtualized' },
    scenarios: { type: 'string', default: asyncScenarios.join(',') },
    output: { type: 'string', default: 'results/async-' + Date.now() + '.json' },
    'skip-build': { type: 'boolean', default: false }
  }
});
const libraries = values.libraries.split(',');
const modes = values.modes.split(',');
const scenarios = values.scenarios.split(',');
if (
  !['chromium', 'firefox'].includes(values.browser) ||
  libraries.some(x => !['rsuite', 'antd', 'chakra', 'heroui'].includes(x)) ||
  modes.some(x => !['standard', 'virtualized'].includes(x)) ||
  scenarios.some(x => !asyncScenarios.includes(x)) ||
  [libraries, modes, scenarios].some(list => new Set(list).size !== list.length)
)
  throw new Error('Invalid async fixture options');
if (!values['skip-build']) {
  const build = spawnSync(process.execPath, ['build-async.mjs'], { cwd: root, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'async-dist/build-inputs.json')));
if (
  !isDeepStrictEqual(manifest.sourceInputs, inputs(root)) ||
  manifest.candidateFingerprint !== packageFingerprint(root) ||
  manifest.candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib'))
)
  throw new Error('Async fixture build/source/package mismatch');
for (const library of libraries)
  for (const artifact of manifest.builds[library].artifacts)
    if (
      hash(fs.readFileSync(path.join(root, 'async-dist', library, artifact.file))) !==
      artifact.sha256
    )
      throw new Error('Async built artifact changed: ' + library + '/' + artifact.file);
const report = {
  startedAt: new Date().toISOString(),
  config: values,
  manifest,
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    os: os.release(),
    cpu: os.cpus()[0]?.model
  },
  scope:
    'Application owns fetch, response ordering, pending/error presentation and controlled value. Component outcomes use native input and public adapters. A failed retention workflow may reflect interaction-model differences, not a defect or conformance violation. No performance or library-wide ranking is assessed.',
  cases: [],
  complete: false
};
const output = path.resolve(root, values.output);
fs.mkdirSync(path.dirname(output), { recursive: true });
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
save();
let server, browser;
try {
  server = await serve(path.join(root, 'async-dist'));
  browser = await { chromium, firefox }[values.browser].launch();
  report.environment.browserVersion = browser.version();
  for (const mode of modes)
    for (const scenario of scenarios)
      for (const library of libraries) {
        const record = { library, mode, scenario, status: 'active', states: [] };
        report.cases.push(record);
        save();
        const context = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          deviceScaleFactor: 1,
          reducedMotion: 'reduce',
          locale: 'en-US'
        });
        const page = await context.newPage();
        page.setDefaultTimeout(12000);
        const browserErrors = [];
        page.on('pageerror', error => browserErrors.push(String(error)));
        try {
          await bounded(
            () =>
              runAsyncScenario(
                page,
                server.url + '/' + library + '/?mode=' + mode,
                scenario,
                record,
                save
              ),
            90000,
            'Async capability case'
          );
          if (browserErrors.length) throw new Error('Browser errors: ' + browserErrors.join('; '));
          record.status = 'completed';
          console.log('PASS', library, mode, scenario);
        } catch (error) {
          record.status = 'failed';
          record.error = String(error);
          record.errorStack = String(error.stack ?? '');
          save();
          record.artifactErrors = [];
          try {
            record.failureSnapshot = await bounded(
              () => page.evaluate(() => window.pickerAsync?.snapshot()),
              3000,
              'Async failure snapshot'
            );
          } catch (captureError) {
            record.artifactErrors.push(String(captureError));
          }
          try {
            record.screenshot = path.join(
              path.dirname(output),
              path.basename(output, '.json') + '-' + library + '-' + mode + '-' + scenario + '.png'
            );
            await bounded(
              () => page.screenshot({ path: record.screenshot, timeout: 3000 }),
              3000,
              'Async failure screenshot'
            );
          } catch (captureError) {
            record.artifactErrors.push(String(captureError));
          }
          console.log('FAIL', library, mode, scenario, record.phase, record.error);
        } finally {
          record.browserErrors = browserErrors;
          save();
          await context.close();
        }
      }
  report.complete = true;
} catch (error) {
  report.error = String(error);
} finally {
  report.completedAt = new Date().toISOString();
  report.summary = asyncSummary(report, libraries.length * modes.length * scenarios.length);
  save();
  await browser?.close();
  await server?.close();
}
console.log('Report:', output, report.summary);
process.exitCode = report.summary.exitCode;
