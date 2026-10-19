import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseArgs, isDeepStrictEqual } from 'node:util';
import { spawnSync } from 'node:child_process';
import { chromium, firefox } from 'playwright';
import { inputs, packageFingerprint, hash } from './integrity.mjs';
import { serve } from './runner/server.mjs';
import { runWorkload } from './runner/workloads.mjs';
import { summarize } from './runner/summary.mjs';
import { captureFailureArtifacts } from './runner/diagnostics.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    browser: { type: 'string', default: 'chromium' },
    libraries: { type: 'string', default: 'rsuite,antd,chakra,heroui' },
    sizes: { type: 'string', default: '1000,10000,50000' },
    modes: { type: 'string', default: 'virtualized' },
    warmups: { type: 'string', default: '5' },
    iterations: { type: 'string', default: '30' },
    seed: { type: 'string', default: '20261019' },
    output: { type: 'string', default: 'results/' + Date.now() + '.json' },
    'skip-build': { type: 'boolean', default: false }
  }
});
const libraries = values.libraries.split(',');
const modes = values.modes.split(',');
const sizes = values.sizes.split(',').map(Number);
const warmups = Number(values.warmups),
  iterations = Number(values.iterations);
const originalSeed = Number(values.seed);
let seed = originalSeed >>> 0;
if (
  !['chromium', 'firefox'].includes(values.browser) ||
  libraries.some(x => !['rsuite', 'antd', 'chakra', 'heroui'].includes(x)) ||
  new Set(libraries).size !== libraries.length ||
  modes.some(x => !['standard', 'virtualized'].includes(x)) ||
  new Set(modes).size !== modes.length ||
  sizes.some(x => !Number.isSafeInteger(x) || x < 100 || x > 100000) ||
  new Set(sizes).size !== sizes.length ||
  !Number.isSafeInteger(originalSeed) ||
  originalSeed < 1 ||
  originalSeed > 0xffffffff ||
  !Number.isSafeInteger(warmups) ||
  warmups < 0 ||
  !Number.isSafeInteger(iterations) ||
  iterations < 1
) {
  throw new Error('Invalid benchmark options');
}
if (!values['skip-build']) {
  const build = spawnSync(process.execPath, ['build.mjs'], { cwd: root, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/build-inputs.json')));
if (
  !isDeepStrictEqual(manifest.sourceInputs, inputs(root)) ||
  manifest.candidateFingerprint !== packageFingerprint(root) ||
  manifest.candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib'))
) {
  throw new Error('Build/source/package mismatch: rebuild before measuring');
}
for (const library of libraries)
  for (const artifact of manifest.builds[library].artifacts) {
    if (
      hash(fs.readFileSync(path.join(root, 'dist', library, artifact.file))) !== artifact.sha256
    ) {
      throw new Error('Built artifact changed: ' + library + '/' + artifact.file);
    }
  }
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    const next = (seed >>> 0) % (index + 1);
    [result[index], result[next]] = [result[next], result[index]];
  }
  return result;
}
const report = {
  generatedAt: new Date().toISOString(),
  config: values,
  manifest,
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    os: os.release(),
    cpu: os.cpus()[0]?.model,
    cpuCount: os.cpus().length,
    totalMemory: os.totalmem()
  },
  order: [],
  cases: [],
  complete: false
};
const output = path.resolve(root, values.output);
fs.mkdirSync(path.dirname(output), { recursive: true });
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
const server = await serve(path.join(root, 'dist'));
const browser = await { chromium, firefox }[values.browser].launch();
report.environment.browserVersion = browser.version();
let failed = false;
try {
  for (const size of sizes)
    for (const mode of modes)
      for (const library of shuffle(libraries)) {
        const id = { library, size, mode };
        report.order.push(id);
        const context = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          deviceScaleFactor: 1,
          reducedMotion: 'reduce',
          locale: 'en-US'
        });
        const page = await context.newPage();
        page.setDefaultTimeout(12000);
        try {
          const result = await runWorkload(
            page,
            server.url + '/' + library + '/?size=' + size + '&mode=' + mode,
            { size, warmups, iterations }
          );
          report.cases.push({
            ...id,
            status: 'passed',
            ...result,
            summary: summarize(result.samples)
          });
          console.log('PASS', library, mode, size);
        } catch (error) {
          failed = true;
          const screenshot = path.join(
            path.dirname(output),
            path.basename(output, '.json') + '-' + library + '-' + mode + '-' + size + '.png'
          );
          const failure = {
            ...id,
            status: 'failed',
            error: String(error),
            diagnostic: null,
            diagnosticStatus: 'pending',
            screenshot
          };
          report.cases.push(failure);
          save();
          await captureFailureArtifacts(page, failure);
          save();
          console.log('FAIL', library, mode, size, String(error));
        } finally {
          await context.close();
          save();
        }
      }
  report.complete = true;
} finally {
  save();
  await browser.close();
  await server.close();
}
if (failed) process.exitCode = 1;
console.log('Report:', output);
