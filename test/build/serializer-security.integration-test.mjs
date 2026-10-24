import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';

// Exercise the serializer resolved by the actual webpack minimizer, including overrides.
const fromProject = createRequire(import.meta.url);
const fromMinimizer = createRequire(fromProject.resolve('terser-webpack-plugin'));
const serializerPath = fromMinimizer.resolve('serialize-javascript');
const serialize = fromMinimizer('serialize-javascript');

function assertNoInjectedStatement(value) {
  const sandbox = { serializationProbe: 0 };
  try {
    const output = serialize(value);
    vm.runInNewContext(output, sandbox, { timeout: 1000 });
  } catch (error) {
    // Rejecting a forged built-in is also safe; the injected assignment must never run.
    assert.match(error.name, /^(?:TypeError|SyntaxError)$/);
  }
  assert.equal(sandbox.serializationProbe, 0);
}

test('minimizer serialization cannot inject a statement through RegExp flags', () => {
  const regexp = Object.create(RegExp.prototype);
  Object.defineProperties(regexp, {
    source: { value: 'pattern' },
    flags: { value: 'g");globalThis.serializationProbe=1;//' }
  });
  assertNoInjectedStatement(regexp);
});

test('minimizer serialization cannot inject a statement through a Date', () => {
  const date = new Date('2026-01-01T00:00:00.000Z');
  date.toISOString = () => '2026-01-01T00:00:00.000Z");globalThis.serializationProbe=1;//';
  assertNoInjectedStatement(date);
});

test('a forged function ending in a bare script closer cannot escape its surrounding output', () => {
  function callback() {}
  callback.toString = () => 'function callback(){ return 1 }//</script';
  const output = serialize({ nested: { callback }, tail: 'next value' }, { space: 2 });
  assert.doesNotMatch(output, /<\/script(?=[\t\n\f\r />]|$)/i);
});

test('ordinary minimizer option values and function syntax retain their behavior', () => {
  const output = serialize({
    compress: { passes: 2, pure_funcs: ['debug'] },
    format: { comments: /license/i },
    callback: value => value + 1,
    date: new Date('2026-01-01T00:00:00.000Z'),
    map: new Map([['entry', 42]]),
    set: new Set([3, 4]),
    bigint: 42n,
    missing: undefined,
    html: '</script><div>plain string</div>'
  });
  const value = vm.runInNewContext('(' + output + ')', {}, { timeout: 1000 });
  assert.equal(value.compress.passes, 2);
  assert.equal(value.format.comments.test('License'), true);
  assert.equal(value.callback(2), 3);
  assert.equal(value.date.toISOString(), '2026-01-01T00:00:00.000Z');
  assert.equal(value.map.get('entry'), 42);
  assert.equal(value.set.has(4), true);
  assert.equal(value.bigint, 42n);
  assert.equal(value.missing, undefined);
  assert.equal(value.html, '</script><div>plain string</div>');
  assert.doesNotMatch(output, /<\/script/i);
});

test('a large array-like object cannot hang minimizer serialization', () => {
  const script = `
    const serialize = require(${JSON.stringify(serializerPath)});
    const value = Object.create(Array.prototype);
    value.length = 2147483647;
    value[0] = 'first';
    const output = serialize(value);
    if (!output.includes('2147483647')) throw new Error('Array-like length was lost');
    process.stdout.write('serialized');
  `;
  const child = spawnSync(process.execPath, ['-e', script], {
    timeout: 5000,
    maxBuffer: 64 * 1024,
    encoding: 'utf8'
  });
  assert.ifError(child.error);
  assert.equal(child.status, 0, child.stderr);
  assert.equal(child.stdout, 'serialized');
});
