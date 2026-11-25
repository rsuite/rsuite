import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { spawnSync } from 'node:child_process';
import { chromium, firefox } from 'playwright';
import { graphAssets, assetTotals, includedPackages, verifyBuild } from './runner/asset-report.mjs';
import { styleBuild, styleProfiles } from './runner/style-profiles.mjs';
import { requestLedger, observeStyles } from './runner/style-observation.mjs';
import { compareStyles, verifyColorFault } from './runner/style-comparison.mjs';
import { serve } from './runner/server.mjs';
import { runWorkload } from './runner/workloads.mjs';
import { captureFailureArtifacts } from './runner/diagnostics.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    browsers: { type: 'string', default: 'chromium,firefox' },
    profiles: { type: 'string', default: 'full,component' },
    libraries: { type: 'string', default: 'rsuite,antd,chakra,heroui' },
    modes: { type: 'string', default: 'standard,virtualized' },
    size: { type: 'string', default: '1000' },
    output: { type: 'string', default: 'results/styles-' + Date.now() + '.json' },
    'skip-build': { type: 'boolean', default: false }
  }
});
const browsers = values.browsers.split(',');
const profiles = values.profiles.split(',');
const libraries = values.libraries.split(',');
const modes = values.modes.split(',');
const size = Number(values.size);
for (const [actual, allowed] of [
  [browsers, ['chromium', 'firefox']],
  [profiles, styleProfiles],
  [libraries, ['rsuite', 'antd', 'chakra', 'heroui']],
  [modes, ['standard', 'virtualized']]
]) {
  if (
    !actual.length ||
    new Set(actual).size !== actual.length ||
    actual.some(value => !allowed.includes(value))
  ) {
    throw new Error('Invalid style accounting configuration');
  }
}
if (!Number.isSafeInteger(size) || size < 100 || size > 100000)
  throw new Error('Invalid dataset size');
const report = {
  generatedAt: new Date().toISOString(),
  config: values,
  complete: false,
  cases: [],
  builds: {},
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    cpu: os.cpus()[0]?.model
  },
  scope:
    'Production picker fixture including React, ReactDOM, providers, instrumentation and library dependencies. Correctness-only native runs, not repeated performance evidence or overall library ranking.',
  accounting:
    'Unique JS/CSS assets, separately gzipSync-compressed with Node default options; shared files counted once. Initial static imports and all reachable imports are distinct. No claim of negotiated wire transfer or per-package gzip allocation.',
  cssInJavaScript:
    'CSSOM serialized inline/constructed styles are separate observations; their source is already included in JavaScript and is not added to network payload twice.',
  componentProfile:
    'Published component CSS where supported; automatic CSS-in-JS providers unchanged. HeroUI full default theme, utilities, variants and animation dependency retained. Not a mathematical minimum CSS claim.',
  styleComparison:
    'Representative component properties, actual label/input/SVG colors and visible border/outline colors at five checkpoints. Nonpainting currentColor differences remain in raw observations. Inherited font rasterization is recorded separately: full CSS may include a document reset absent from component CSS. No pixel equivalence claim.',
  pixelParityAssessed: false
};
const output = path.resolve(root, values.output);
fs.mkdirSync(path.dirname(output), { recursive: true });
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
save();
let failed = false;
for (const profile of profiles) {
  if (!values['skip-build']) {
    const result = spawnSync(
      process.execPath,
      ['build.mjs', '--style-profile', profile, '--style-output'],
      { cwd: root, stdio: 'inherit' }
    );
    if (result.status !== 0) {
      report.buildError = { profile, exit: result.status, signal: result.signal };
      save();
      process.exit(result.status || 1);
    }
  }
  const directory = styleBuild(root, profile, true).directory;
  const manifest = verifyBuild(root, directory, profile);
  const budgets = {};
  for (const library of libraries) {
    const build = manifest.builds[library];
    const vite = JSON.parse(fs.readFileSync(path.join(directory, library, '.vite/manifest.json')));
    const modules = JSON.parse(
      fs.readFileSync(path.join(directory, library, 'module-report.json'))
    );
    const initial = graphAssets(vite);
    const reachable = graphAssets(vite, 'index.html', true);
    budgets[library] = {
      styles: build.styles,
      initial: assetTotals(initial, build.artifacts),
      reachable: assetTotals(reachable, build.artifacts),
      includedPackages: includedPackages(modules, reachable),
      moduleAttributionScope: modules.scope
    };
    for (const peer of ['react', 'react-dom']) {
      if (
        !budgets[library].includedPackages.some(
          pkg => pkg.name === peer && pkg.renderedCharacters > 0
        )
      ) {
        throw new Error('Required shared runtime not accounted for: ' + peer);
      }
    }
  }
  report.builds[profile] = { manifest, budgets };
  save();
}
const server = await serve(path.join(root, 'dist-styles'));
try {
  for (const name of browsers) {
    const browser = await { chromium, firefox }[name].launch();
    try {
      for (const profile of profiles)
        for (const library of libraries)
          for (const mode of modes) {
            const context = await browser.newContext({
              viewport: { width: 1280, height: 800 },
              deviceScaleFactor: 1,
              reducedMotion: 'reduce',
              locale: 'en-US'
            });
            const page = await context.newPage();
            page.setDefaultTimeout(12000);
            const url = server.url + '/' + profile + '/' + library + '/';
            const ledger = requestLedger(page, url);
            const entry = {
              browser: name,
              browserVersion: browser.version(),
              profile,
              library,
              mode,
              size,
              status: 'running',
              checkpoints: {}
            };
            report.cases.push(entry);
            save();
            try {
              entry.workload = await runWorkload(page, url + '?size=' + size + '&mode=' + mode, {
                size,
                warmups: 0,
                iterations: 1,
                async onCheckpoint(state) {
                  entry.checkpoints[state] = await observeStyles(page);
                  if (state === 'closed') entry.coldRequests = ledger.snapshot();
                  if (state === 'open')
                    entry.colorFaultControl = await verifyColorFault(
                      page,
                      entry.checkpoints[state]
                    );
                }
              });
              await page.waitForLoadState('networkidle');
              entry.workflowRequests = ledger.snapshot();
              if (
                entry.workflowRequests.failed.length ||
                entry.workflowRequests.unaccounted.length
              ) {
                throw new Error('Failed or unaccounted JavaScript/CSS requests');
              }
              const build = report.builds[profile].manifest.builds[library];
              entry.observedCold = assetTotals(entry.coldRequests.files, build.artifacts);
              entry.observedWorkflow = assetTotals(entry.workflowRequests.files, build.artifacts);
              const initial = report.builds[profile].budgets[library].initial;
              for (const file of [...initial.javascript.files, ...initial.css.files]) {
                if (!entry.coldRequests.files.includes(file.file))
                  throw new Error('Initial asset not observed: ' + file.file);
              }
              if (
                !['closed', 'open', 'empty', 'keyboard', 'selected'].every(
                  state => entry.checkpoints[state]
                )
              ) {
                throw new Error('Missing visual/style checkpoint');
              }
              entry.status = 'passed';
              console.log('PASS', name, profile, library, mode);
            } catch (error) {
              failed = true;
              entry.status = 'failed';
              entry.error = String(error.stack || error);
              entry.screenshot = path.join(
                path.dirname(output),
                path.basename(output, '.json') +
                  '-' +
                  name +
                  '-' +
                  profile +
                  '-' +
                  library +
                  '-' +
                  mode +
                  '.png'
              );
              save();
              await captureFailureArtifacts(page, entry);
              console.error('FAIL', name, profile, library, mode, String(error));
            } finally {
              ledger.close();
              await context.close();
              save();
            }
          }
    } finally {
      await browser.close();
    }
  }
  if (profiles.includes('full') && profiles.includes('component')) {
    for (const entry of report.cases.filter(
      entry => entry.profile === 'component' && entry.status === 'passed'
    )) {
      const baseline = report.cases.find(
        other =>
          other.profile === 'full' &&
          other.browser === entry.browser &&
          other.library === entry.library &&
          other.mode === entry.mode &&
          other.status === 'passed'
      );
      entry.styleDifferences = [];
      entry.rawStyleDifferences = [];
      entry.rasterizationDifferences = [];
      if (!baseline) entry.styleDifferences.push({ error: 'Missing passed full-style baseline' });
      else
        for (const state of Object.keys(entry.checkpoints)) {
          const comparison = compareStyles(baseline.checkpoints[state], entry.checkpoints[state]);
          if (!comparison.rawPropertiesMatch) entry.rawStyleDifferences.push({ state });
          if (!comparison.rasterizationMatch) entry.rasterizationDifferences.push({ state });
          if (!comparison.componentPropertiesMatch) {
            entry.styleDifferences.push({
              state,
              full: baseline.checkpoints[state].styles,
              component: entry.checkpoints[state].styles
            });
          }
        }
      entry.matchedStyleCheckpoints = entry.styleDifferences.length === 0;
      if (!entry.matchedStyleCheckpoints) {
        failed = true;
        entry.status = 'failed';
        entry.error =
          'Full/component representative component properties differ; inspect retained values';
      }
    }
  }
  report.styleParityAssessed = profiles.includes('full') && profiles.includes('component');
  for (const profile of profiles)
    verifyBuild(root, styleBuild(root, profile, true).directory, profile);
  report.complete = true;
} finally {
  await server.close();
  save();
}
if (failed) process.exitCode = 1;
console.log('Style report:', output);
