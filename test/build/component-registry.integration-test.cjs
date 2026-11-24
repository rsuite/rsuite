const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const ts = require('typescript');
const { generateComponentRegistry } = require('../../scripts/component-registry.cjs');

const repository = path.resolve(__dirname, '../..');
function fixture(t, files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-component-registry-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (name, text) => {
    const file = path.join(root, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
  };
  write(
    'src/internals/hooks/index.ts',
    'export declare function useCustom(name: string, props?: unknown): unknown; export declare function useCustomConfig(name: string, props?: unknown): unknown;'
  );
  write(
    'src/internals/hooks/useCustomConfig.ts',
    'export default function useCustomConfig(name: string, props?: unknown) { return props; }'
  );
  write(
    'src/internals/utils/index.ts',
    'export declare function createComponent(options: { name: string }): unknown;'
  );
  write('src/internals/Provider/types.ts', '// original registry\n');
  write('src/index.ts', 'export * from "./Future";');
  write(
    'src/Future/index.ts',
    'import { useCustom as defaults } from "../internals/hooks"; export interface FutureProps { enabled?: boolean; } const name = "Future"; export const Future = (props: FutureProps) => defaults(name, props);'
  );
  for (const [name, text] of Object.entries(files || {})) write(name, text);
  return { root, write, sourceRoot: path.join(root, 'src') };
}
function entries(contents) {
  const source = ts.createSourceFile('types.ts', contents, ts.ScriptTarget.Latest, true);
  const registry = source.statements.find(
    node => ts.isInterfaceDeclaration(node) && node.name.text === 'ReactSuiteComponents'
  );
  return registry.members.map(member => member.name.text);
}
function cli(project, args) {
  for (const file of ['generate-component-names.js', 'component-registry.cjs']) {
    project.write(
      'scripts/' + file,
      fs.readFileSync(path.join(repository, 'scripts', file), 'utf8')
    );
  }
  return spawnSync(
    process.execPath,
    [path.join(project.root, 'scripts/generate-component-names.js'), ...args],
    {
      cwd: os.tmpdir(),
      encoding: 'utf8',
      env: { ...process.env, NODE_PATH: path.join(repository, 'node_modules') }
    }
  );
}

test('discovers aliased hooks, namespaces, default imports and public factories', async t => {
  const project = fixture(t, {
    'src/index.ts':
      'export * from "./Future"; export * from "./Layout"; export * from "./Namespaced"; export * from "./DefaultHook"; export type { TypeOnly } from "./TypeOnly"; export type * from "./TypeOnlyStar";',
    'src/Layout/index.ts':
      'import { createComponent } from "../internals/utils"; export interface LayoutProps { title?: string; } export const Layout = createComponent({ "name": "Layout" });',
    'src/Namespaced/index.ts':
      'import * as hooks from "../internals/hooks"; export interface NamespacedProps { id?: string; } export const Namespaced = hooks.useCustomConfig("Namespaced", {});',
    'src/DefaultHook/index.ts':
      'import config from "../internals/hooks/useCustomConfig"; export interface DefaultHookProps { id?: string; } export const DefaultHook = config("DefaultHook", {});',
    'src/Private/index.ts':
      'import { createComponent } from "../internals/utils"; export interface PrivateProps {} export const Private = createComponent({ name: "Private" });',
    'src/TypeOnly/index.ts':
      'import { createComponent } from "../internals/utils"; export interface TypeOnlyProps {} export const TypeOnly = createComponent({ name: "TypeOnly" });',
    'src/TypeOnlyStar/index.ts':
      'import { createComponent } from "../internals/utils"; export interface TypeOnlyStarProps {} export const TypeOnlyStar = createComponent({ name: "TypeOnlyStar" });',
    'src/Utility/index.ts': 'export interface UtilityProps {}',
    'src/Future/test/Decoy.ts':
      'import { useCustom } from "../../internals/hooks"; useCustom("TestOnly");',
    'src/Future/stories/Decoy.ts':
      'import { useCustom } from "../../internals/hooks"; useCustom("StoryOnly");'
  });
  const result = await generateComponentRegistry(project);
  assert.deepEqual(entries(result.contents), ['DefaultHook', 'Future', 'Layout', 'Namespaced']);
  assert.equal(result.filename, path.join(project.sourceRoot, 'internals/Provider/types.ts'));
  assert.match(result.contents, /FutureProps.*\.\.\/\.\.\/Future/);
  assert.equal(fs.readFileSync(result.filename, 'utf8'), '// original registry\n');
});

test('retains compatibility names, shared props, Dialog and SafeAnchor', async t => {
  const project = fixture(t, {
    'src/Progress/index.ts': 'export interface ProgressProps { percent?: number; }',
    'src/Progress/ProgressLine.ts':
      'import { useCustom } from "../internals/hooks"; useCustom("ProgressLine", {});',
    'src/Animation/Transition.ts': 'export interface TransitionProps { in?: boolean; }',
    'src/DateRangeInput/index.ts': 'export interface DateRangeInputProps { format?: string; }',
    'src/useDialog/Dialog.ts':
      'import config from "../internals/hooks/useCustomConfig"; export interface DialogProps { title?: string; } config("Dialog", {});',
    'src/internals/SafeAnchor/index.ts':
      'import { useCustomConfig } from "../hooks"; export interface SafeAnchorProps { href?: string; } useCustomConfig("SafeAnchor", {});'
  });
  const result = await generateComponentRegistry(project);
  assert.deepEqual(entries(result.contents), [
    'DateRangeInput',
    'Dialog',
    'Future',
    'Progress',
    'ProgressLine',
    'SafeAnchor',
    'Transition'
  ]);
  assert.match(result.contents, /ProgressLine: ComponentProps<ProgressProps>/);
  assert.match(result.contents, /SafeAnchorProps.*\.\.\/SafeAnchor/);
  assert.match(result.contents, /DialogProps.*\.\.\/\.\.\/useDialog\/Dialog/);
});

test('check mode is read-only, detects a new component and succeeds after generation', t => {
  const project = fixture(t);
  const output = path.join(project.sourceRoot, 'internals/Provider/types.ts');
  let result = cli(project, ['--check']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /registry is stale/);
  assert.equal(fs.readFileSync(output, 'utf8'), '// original registry\n');
  assert.equal(cli(project, []).status, 0);
  const generated = fs.readFileSync(output, 'utf8');
  const mtime = fs.statSync(output).mtimeMs;
  assert.equal(cli(project, ['--check']).status, 0);
  assert.equal(fs.statSync(output).mtimeMs, mtime);
  assert.equal(fs.existsSync(path.join(project.sourceRoot, 'CustomProvider/types.ts')), false);
  project.write(
    'src/Next/index.ts',
    'import { useCustom } from "../internals/hooks"; export interface NextProps {} export const Next = useCustom("Next", {});'
  );
  result = cli(project, ['--check']);
  assert.equal(result.status, 1);
  assert.equal(fs.readFileSync(output, 'utf8'), generated);
  assert.equal(cli(project, []).status, 0);
  assert.equal(cli(project, ['--check']).status, 0);
  assert.deepEqual(entries(fs.readFileSync(output, 'utf8')), ['Future', 'Next']);
});

test('a missing props export or unknown option cannot overwrite the registry', t => {
  const project = fixture(t, {
    'src/Broken/index.ts':
      'import { useCustom } from "../internals/hooks"; export const Broken = useCustom("Broken", {});'
  });
  const output = path.join(project.sourceRoot, 'internals/Provider/types.ts');
  const result = cli(project, []);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cannot resolve exported BrokenProps/);
  assert.equal(fs.readFileSync(output, 'utf8'), '// original registry\n');
  assert.equal(cli(project, ['--unknown']).status, 1);
  assert.equal(fs.readFileSync(output, 'utf8'), '// original registry\n');
});
