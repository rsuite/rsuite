import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { hash } from '../integrity.mjs';
import { verifyBuild } from './asset-report.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = path.join(root, 'dist-styles/full');
const manifestFile = path.join(directory, 'build-inputs.json');
const manifest = verifyBuild(root, directory, 'full');
verifyBuild(root, path.join(root, 'dist-styles/component'), 'component');
const output = path.join(root, 'results/asset-integrity');
fs.mkdirSync(output, { recursive: true });
const javascript = manifest.builds.rsuite.artifacts.find(item => item.file.endsWith('.js'));
assert(javascript, 'A real built JavaScript asset is required');
const controls = [
  {
    name: 'changed-asset',
    file: path.join(directory, 'rsuite', javascript.file),
    corrupt: bytes => Buffer.concat([bytes, Buffer.from('\n/* integrity fault */\n')]),
    error: /Style artifact changed: rsuite\//
  },
  {
    name: 'wrong-profile',
    file: manifestFile,
    corrupt: bytes => {
      const value = JSON.parse(bytes);
      value.styleProfile = 'component';
      return Buffer.from(JSON.stringify(value));
    },
    error: /Style build\/source\/package mismatch/
  }
];
const results = [];
try {
  for (const control of controls) {
    const original = fs.readFileSync(control.file);
    const reportFile = path.join(output, control.name + '.json');
    try {
      fs.writeFileSync(control.file, control.corrupt(original));
      const result = spawnSync(
        process.execPath,
        ['assets.mjs', '--skip-build', '--browsers', 'chromium', '--output', reportFile],
        { cwd: root, encoding: 'utf8', timeout: 30000, maxBuffer: 1024 * 1024 }
      );
      fs.writeFileSync(path.join(output, control.name + '.log'), result.stdout + result.stderr);
      assert.equal(result.error, undefined);
      assert.equal(result.status, 1);
      assert.match(result.stderr, control.error);
      const report = JSON.parse(fs.readFileSync(reportFile));
      assert.equal(report.complete, false);
      assert.deepEqual(report.cases, [], 'Corrupt builds must fail before native case setup');
      results.push({
        name: control.name,
        rejected: true,
        exit: result.status,
        originalSHA256: hash(original),
        restored: false
      });
    } finally {
      fs.writeFileSync(control.file, original);
      assert.equal(hash(fs.readFileSync(control.file)), hash(original));
    }
    verifyBuild(root, directory, 'full');
    results.at(-1).restored = true;
  }
} finally {
  fs.writeFileSync(path.join(output, 'controls.json'), JSON.stringify(results, null, 2) + '\n');
}
console.log('Asset integrity controls:', results);
