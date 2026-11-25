import fs from 'node:fs';
import path from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { inputs, packageFingerprint, candidateDependencies, hash } from '../integrity.mjs';

export function graphAssets(manifest, entry = 'index.html', dynamic = false) {
  const visited = new Set();
  const files = new Set();
  function visit(key) {
    if (visited.has(key)) return;
    const chunk = manifest[key];
    if (!chunk?.file) throw new Error('Missing manifest dependency: ' + key);
    visited.add(key);
    files.add(chunk.file);
    for (const css of chunk.css || []) files.add(css);
    for (const asset of chunk.assets || []) files.add(asset);
    for (const child of chunk.imports || []) visit(child);
    if (dynamic) for (const child of chunk.dynamicImports || []) visit(child);
  }
  visit(entry);
  return [...files].sort();
}

export function assetTotals(files, artifacts) {
  const map = new Map(artifacts.map(value => [value.file, value]));
  const groups = { javascript: [], css: [], other: [] };
  for (const file of [...new Set(files)].sort()) {
    const artifact = map.get(file);
    if (!artifact) throw new Error('Unaccounted asset: ' + file);
    const type = file.endsWith('.js') ? 'javascript' : file.endsWith('.css') ? 'css' : 'other';
    groups[type].push(artifact);
  }
  const result = {};
  for (const [type, values] of Object.entries(groups)) {
    result[type] = {
      files: values,
      bytes: values.reduce((sum, value) => sum + value.bytes, 0),
      gzipBytes: values.reduce((sum, value) => sum + value.gzipBytes, 0)
    };
  }
  result.javascriptAndCSS = {
    bytes: result.javascript.bytes + result.css.bytes,
    gzipBytes: result.javascript.gzipBytes + result.css.gzipBytes
  };
  return result;
}

export function includedPackages(moduleReport, files) {
  const selected = new Set(files);
  const packages = new Map();
  for (const chunk of moduleReport.chunks) {
    if (!selected.has(chunk.file)) continue;
    for (const module of chunk.modules) {
      if (!Number.isSafeInteger(module.renderedCharacters) || module.renderedCharacters < 0) {
        throw new Error('Invalid Rollup module contribution');
      }
      const identity = module.package || { name: '<virtual>', version: null };
      const key = identity.name + '@' + identity.version;
      const total = packages.get(key) || { ...identity, modules: 0, renderedCharacters: 0 };
      total.modules++;
      total.renderedCharacters += module.renderedCharacters;
      packages.set(key, total);
    }
  }
  return [...packages.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function verifyBuild(root, directory, profile) {
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'build-inputs.json')));
  if (
    manifest.styleProfile !== profile ||
    !manifest.separateStyleOutput ||
    !isDeepStrictEqual(manifest.sourceInputs, inputs(root)) ||
    !isDeepStrictEqual(manifest.candidateDependencies, candidateDependencies(root)) ||
    manifest.candidateFingerprint !== packageFingerprint(root) ||
    manifest.candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib'))
  ) {
    throw new Error('Style build/source/package mismatch: rebuild before accounting');
  }
  for (const [library, build] of Object.entries(manifest.builds)) {
    for (const artifact of build.artifacts) {
      if (hash(fs.readFileSync(path.join(directory, library, artifact.file))) !== artifact.sha256) {
        throw new Error('Style artifact changed: ' + library + '/' + artifact.file);
      }
    }
  }
  return manifest;
}
