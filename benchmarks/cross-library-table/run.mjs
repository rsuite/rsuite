import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { chromium, firefox } from 'playwright';
import { inputs, packageFingerprint, hash } from './integrity.mjs';
import { snapshot } from './runner/snapshot.mjs';
import { workflow } from './runner/workflow.mjs';
import { installedDependencies } from './dependencies.mjs';
import { validateReport } from './runner/report.mjs';
import { treeWorkflow } from './runner/tree-workflow.mjs';
import { treeSnapshot } from './runner/tree-snapshot.mjs';
import { treeSemantics, validateTreeReport } from './runner/tree-report.mjs';
import { treeOwnership } from './runner/tree-oracle.mjs';
const root = import.meta.dirname,
  args = process.argv.slice(2);
const outputIndex = args.indexOf('--output'),
  browserIndex = args.indexOf('--browser'),
  workflowIndex = args.indexOf('--workflow');
const workflowName = workflowIndex < 0 ? 'selection' : args[workflowIndex + 1];
if (!['selection', 'tree'].includes(workflowName)) throw Error('Invalid workflow');
const output = path.resolve(
  outputIndex < 0
    ? path.join(root, 'results', workflowName === 'tree' ? 'tree.json' : 'table.json')
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
if (
  !isDeepStrictEqual(inputs(root), built.sourceInputs) ||
  packageFingerprint(root) !== built.candidateFingerprint ||
  packageFingerprint(root, path.resolve(root, '../../lib')) !== built.candidateFingerprint
)
  throw Error('Stale source/config/candidate build');
if (!isDeepStrictEqual(installedDependencies(root), built.installedDependencies))
  throw Error('Stale installed dependency build');
for (const [library, build] of Object.entries(built.builds))
  for (const artifact of build.artifacts)
    if (hash(fs.readFileSync(path.join(root, 'dist', library, artifact.file))) !== artifact.sha256)
      throw Error('Stale artifact ' + library + '/' + artifact.file);
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
  workflow: workflowName,
  qualification: 'Prototype: adapters and driver require review before qualified comparison',
  scope:
    workflowName === 'tree'
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
          const capture = async () => ({
            ...(await page.evaluate(snapshot)),
            ...(workflowName === 'tree' ? await page.evaluate(treeSnapshot) : {})
          });
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
                      x: event.clientX,
                      y: event.clientY
                    }),
                  true
                );
            });
            await page.goto(
              base + '/' + library + '/' + (workflowName === 'tree' ? 'tree.html' : '')
            );
            await (workflowName === 'tree' ? treeWorkflow : workflow)(
              page,
              profile,
              async (name, observation) => {
                const state = await capture();
                row.checkpoints.push({ name, state, observation });
                assert.deepEqual(state.brokenReferences, []);
                assert.deepEqual(state.duplicateIds, []);
              }
            );
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
  report.complete = true;
  try {
    report.summary = (workflowName === 'tree' ? validateTreeReport : validateReport)(
      report,
      browserName
    );
    report.validated = true;
  } catch (error) {
    report.validationError = String(error);
    throw error;
  }
} finally {
  await new Promise(resolve => server.close(resolve));
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
}
if (!report.validated || report.summary.failed) process.exitCode = 1;
