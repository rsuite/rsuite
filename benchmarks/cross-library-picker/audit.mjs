import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseArgs, isDeepStrictEqual } from 'node:util';
import { spawnSync } from 'node:child_process';
import { chromium, firefox } from 'playwright';
import { inputs, packageFingerprint, candidateDependencies, hash } from './integrity.mjs';
import { serve } from './runner/server.mjs';
import { bounded, captureFailureArtifacts } from './runner/diagnostics.mjs';
import { auditPicker, axeOptions, verifyEngineControl } from './runner/accessibility.mjs';
import { auditSummary } from './runner/accessibility-report.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    browser: { type: 'string', default: 'chromium' },
    libraries: { type: 'string', default: 'rsuite,antd,chakra,heroui' },
    sizes: { type: 'string', default: '1000' },
    modes: { type: 'string', default: 'virtualized' },
    output: { type: 'string', default: 'results/a11y-' + Date.now() + '.json' },
    'skip-build': { type: 'boolean', default: false }
  }
});
const libraries = values.libraries.split(',');
const sizes = values.sizes.split(',').map(Number);
const modes = values.modes.split(',');
if (
  !['chromium', 'firefox'].includes(values.browser) ||
  libraries.some(value => !['rsuite', 'antd', 'chakra', 'heroui'].includes(value)) ||
  new Set(libraries).size !== libraries.length ||
  modes.some(value => !['standard', 'virtualized'].includes(value)) ||
  new Set(modes).size !== modes.length ||
  sizes.some(value => !Number.isSafeInteger(value) || value < 100 || value > 100000) ||
  new Set(sizes).size !== sizes.length
)
  throw new Error('Invalid accessibility audit options');
if (!values['skip-build']) {
  const build = spawnSync(process.execPath, ['build.mjs'], { cwd: root, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/build-inputs.json')));
if (
  !isDeepStrictEqual(manifest.sourceInputs, inputs(root)) ||
  !isDeepStrictEqual(manifest.candidateDependencies, candidateDependencies(root)) ||
  manifest.candidateFingerprint !== packageFingerprint(root) ||
  manifest.candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib'))
) {
  throw new Error('Build/source/package mismatch: rebuild before auditing');
}
for (const library of libraries)
  for (const artifact of manifest.builds[library].artifacts) {
    if (
      hash(fs.readFileSync(path.join(root, 'dist', library, artifact.file))) !== artifact.sha256
    ) {
      throw new Error('Built artifact changed: ' + library + '/' + artifact.file);
    }
  }
const axePath = path.join(root, 'node_modules/axe-core/axe.min.js');
const axeVersion = JSON.parse(
  fs.readFileSync(path.join(root, 'node_modules/axe-core/package.json'))
).version;
if (
  axeVersion !== manifest.versions['axe-core'] ||
  hash(fs.readFileSync(axePath)) !== manifest.auditEngine?.sourceSHA256
) {
  throw new Error('Installed axe version/source changed: rebuild before auditing');
}
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
  axe: { version: axeVersion, sourceSHA256: hash(fs.readFileSync(axePath)), options: axeOptions },
  scope:
    'Automated WCAG A/AA-tagged rules and fixture ID references in four picker states. Incomplete results and broader accessibility require manual review. This does not certify conformance, screen readers, IME, mobile, all library components or relative leadership.',
  complete: false,
  cases: [],
  controls: []
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
  report.controls.push(await verifyEngineControl(browser, axePath));
  save();
  for (const size of sizes)
    for (const mode of modes)
      for (const library of libraries) {
        const record = { library, size, mode, status: 'active', states: [] };
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
              auditPicker(
                page,
                server.url + '/' + library + '/?size=' + size + '&mode=' + mode,
                axePath,
                axeVersion,
                record,
                save
              ),
            120000,
            'Accessibility case'
          );
          if (browserErrors.length) throw new Error('Browser errors: ' + browserErrors.join('; '));
          record.status = 'completed';
          record.phase = 'completed';
          console.log(
            'AUDITED',
            library,
            mode,
            size,
            record.states.map(state => ({
              state: state.state,
              violations: state.axe.violations.map(rule => rule.id),
              references: state.referenceFailures.length,
              incomplete: state.axe.incomplete.map(rule => rule.id)
            }))
          );
        } catch (error) {
          record.status = 'failed';
          record.error = String(error);
          record.errorStack = String(error.stack ?? '');
          record.screenshot = path.join(
            path.dirname(output),
            path.basename(output, '.json') + '-' + library + '-' + mode + '-' + size + '.png'
          );
          save();
          await captureFailureArtifacts(page, record);
          console.log('FAIL', library, mode, size, String(error));
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
  report.summary = auditSummary(report, libraries.length * sizes.length * modes.length);
  save();
  await browser?.close();
  await server?.close();
}
process.exitCode = report.summary.exitCode;
console.log('Report:', output, report.summary);
