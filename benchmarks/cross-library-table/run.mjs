import { createCapture } from './runner/capture.mjs';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chromium, firefox } from 'playwright';
import { workflow } from './runner/workflow.mjs';
import { validateReport } from './runner/report.mjs';
import { treeWorkflow } from './runner/tree-workflow.mjs';
import { treeSemantics, validateTreeReport } from './runner/tree-report.mjs';
import { treeOwnership } from './runner/tree-oracle.mjs';
import { assertBuildState, artifactGuard } from './runner/build-state.mjs';
import { virtualWorkflow } from './runner/virtual-workflow.mjs';
import { validateVirtualReport } from './runner/virtual-report.mjs';
import { virtualOwnership } from './runner/virtual-oracle.mjs';
import { lifecycleWorkflow } from './runner/lifecycle-workflow.mjs';
import { validateLifecycleReport } from './runner/lifecycle-report.mjs';
import { lifecycleOwnership } from './runner/lifecycle-oracle.mjs';
const root = import.meta.dirname,
  args = process.argv.slice(2);
const outputIndex = args.indexOf('--output'),
  browserIndex = args.indexOf('--browser'),
  workflowIndex = args.indexOf('--workflow');
const workflowName = workflowIndex < 0 ? 'selection' : args[workflowIndex + 1];
if (!['selection', 'tree', 'virtual', 'lifecycle'].includes(workflowName))
  throw Error('Invalid workflow');
const output = path.resolve(
  outputIndex < 0
    ? path.join(
        root,
        'results',
        workflowName === 'selection' ? 'table.json' : workflowName + '.json'
      )
    : args[outputIndex + 1]
);
const browserName = browserIndex < 0 ? 'all' : args[browserIndex + 1];
if (!['all', 'chromium', 'firefox'].includes(browserName)) throw Error('Invalid browser');
for (let index = 0; index < args.length; index++) {
  if (['--output', '--browser', '--workflow'].includes(args[index])) index++;
  else if (args[index] !== '--skip-build') throw Error('Unknown argument ' + args[index]);
}
if (!args.includes('--skip-build')) {
  const result = spawnSync(process.execPath, ['build.mjs'], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
const built = JSON.parse(fs.readFileSync(path.join(root, 'dist/build-inputs.json')));
assertBuildState(root, built);
const served = artifactGuard(root, built);
fs.mkdirSync(path.dirname(output), { recursive: true });
const server = http.createServer(async (request, response) => {
  try {
    const [library, ...parts] = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname
    )
      .split('/')
      .filter(Boolean);
    if (!['rsuite', 'antd', 'chakra', 'heroui'].includes(library)) throw Error('Invalid library');
    const folder = path.resolve(root, 'dist', library),
      file = path.resolve(folder, parts.join('/') || 'index.html');
    if (!file.startsWith(folder + path.sep)) throw Error('Invalid path');
    const bytes = await fs.promises.readFile(file);
    served.check(file, bytes);
    response.writeHead(200, {
      'Content-Type':
        {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.svg': 'image/svg+xml'
        }[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(bytes);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port;
const report = {
  at: new Date().toISOString(),
  captureProtocol: 'single-task-v1',
  integrity: {
    protocol: 'response-and-final-v1',
    before: true,
    after: false,
    responsesChecked: 0,
    violations: []
  },
  workflow: workflowName,
  qualification: 'Prototype: adapters and driver require review before qualified comparison',
  scope:
    workflowName === 'lifecycle'
      ? 'Loaded to loading to empty to recovered data with shared explicit application request/selection policy; native loading and composed content ownership recorded. No AT/performance/ranking claim.'
      : workflowName === 'virtual'
        ? '10k rows, application jump controls and native checkbox selection. Mounted rows, visible identity markers and complete row border boxes reported separately, including focused-row persistence. Whole-row geometry protocol 1 does not require every target row to be fully exposed. No performance/ranking/AT conformance result.'
        : workflowName === 'tree'
          ? 'Three-level hierarchy, retained selection and root reorder. Functional and limited tree semantics gates are reported separately; native/composed ownership explicit. No AT/conformance/ranking result.'
          : 'One sort/filter/ID-selection workflow; native engines versus explicit application composition. No performance/conformance/ranking result.',
  node: process.version,
  built,
  cases: [],
  validated: false,
  complete: false
};
try {
  for (const [engineName, engine] of Object.entries({ chromium, firefox })) {
    if (browserName !== 'all' && browserName !== engineName) continue;
    const browser = await engine.launch();
    try {
      for (const library of ['rsuite', 'antd', 'chakra', 'heroui'])
        for (const profile of ['pointer', 'keyboard']) {
          const context = await browser.newContext({
            viewport: { width: 1280, height: 900 },
            reducedMotion: 'reduce'
          });
          const page = await context.newPage();
          page.setDefaultTimeout(10000);
          const row = {
            browser: engineName,
            version: browser.version(),
            library,
            profile,
            checkpoints: [],
            pageErrors: [],
            httpErrors: []
          };
          if (workflowName === 'tree') {
            row.ownership = treeOwnership[library];
            row.functionalPassed = false;
          }
          if (workflowName === 'virtual') row.ownership = virtualOwnership[library];
          if (workflowName === 'lifecycle') row.ownership = lifecycleOwnership[library];
          const capture = createCapture(page, workflowName);
          report.cases.push(row);
          page.on('pageerror', error => row.pageErrors.push(String(error)));
          page.on('response', response => {
            if (response.status() >= 400) row.httpErrors.push([response.status(), response.url()]);
          });
          try {
            await page.addInitScript(() => {
              window.__nativeEvents = [];
              for (const type of ['click', 'keydown', 'pointerdown', 'pointerup'])
                document.addEventListener(
                  type,
                  event =>
                    window.__nativeEvents.push({
                      type,
                      key: event.key,
                      trusted: event.isTrusted,
                      tag: event.target.tagName,
                      role: event.target.getAttribute?.('role'),
                      buttonText: event.target.closest?.('button')?.textContent,
                      rowId: event.target
                        .closest?.('[data-virtual-row-id],tr,[role="row"]')
                        ?.querySelector('[data-row-id]')?.dataset.rowId,
                      x: event.clientX,
                      y: event.clientY
                    }),
                  true
                );
            });
            await page.goto(
              base +
                '/' +
                library +
                '/' +
                (workflowName === 'selection' ? '' : workflowName + '.html')
            );
            await (
              workflowName === 'tree'
                ? treeWorkflow
                : workflowName === 'virtual'
                  ? virtualWorkflow
                  : workflowName === 'lifecycle'
                    ? lifecycleWorkflow
                    : workflow
            )(page, profile, async (name, observation) => {
              const state = await capture();
              row.checkpoints.push({ name, state, observation });
              assert.deepEqual(state.brokenReferences, []);
              assert.deepEqual(state.duplicateIds, []);
            });
            row.events = await page.evaluate(() => window.__nativeEvents);
            assert.ok(row.events.length && row.events.every(event => event.trusted));
            assert.deepEqual(row.pageErrors, []);
            assert.deepEqual(row.httpErrors, []);
            if (workflowName === 'tree') {
              row.functionalPassed = true;
              row.semantics = treeSemantics(row.checkpoints);
              assert.equal(row.semantics.passed, true, 'Tree semantic gates failed');
            }
            row.passed = true;
          } catch (error) {
            row.passed = false;
            row.error = String(error);
            row.stack = error.stack;
            row.failureSnapshot = await capture().catch(() => null);
            row.events = await page.evaluate(() => window.__nativeEvents).catch(() => []);
            const html = path.join(
              path.dirname(output),
              engineName + '-' + library + '-' + profile + '.html'
            );
            fs.writeFileSync(html, (await page.content()).slice(0, 500000));
            row.failureHTML = html;
          } finally {
            await context.close();
          }
          console.log(engineName, library, profile, row.passed ? 'PASS' : 'FAIL ' + row.error);
        }
    } finally {
      await browser.close();
    }
  }
  try {
    assertBuildState(root, built);
    assert.deepEqual(served.violations, []);
    report.integrity.after = true;
  } catch (error) {
    report.integrityError = String(error);
    throw error;
  }
  report.integrity.responsesChecked = served.checked;
  report.integrity.violations = served.violations;
  report.complete = true;
  try {
    report.summary = (
      workflowName === 'tree'
        ? validateTreeReport
        : workflowName === 'virtual'
          ? validateVirtualReport
          : workflowName === 'lifecycle'
            ? validateLifecycleReport
            : validateReport
    )(report, browserName);
    report.validated = true;
  } catch (error) {
    report.validationError = String(error);
    throw error;
  }
} finally {
  report.integrity.responsesChecked = served.checked;
  report.integrity.violations = served.violations;
  await new Promise(resolve => server.close(resolve));
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
}
if (!report.validated || report.summary.failed) process.exitCode = 1;
