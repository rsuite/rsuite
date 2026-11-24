const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const { SourceMapConsumer, SourceMapGenerator, SourceNode } = require('source-map-js');

const basicMap = (source = 'input.ts') => ({
  version: 3,
  sources: [source],
  sourcesContent: ['const value = 1;'],
  names: [],
  mappings: 'AAAA'
});
const indexedMap = (line, column = 0, map = basicMap()) => ({
  version: 3,
  sections: [{ offset: { line, column }, map }]
});

function exercise(operation) {
  if (operation === 'nested-sources') {
    let map = { ...basicMap(), sources: ['first.ts', 'second.ts'] };
    for (let depth = 0; depth < 40; depth++) {
      map = indexedMap(0, 0, map);
    }
    return new SourceMapConsumer(map).sources;
  }
  if (operation === 'generated-gap') {
    const generator = new SourceMapGenerator();
    generator.addMapping({
      generated: { line: 10_000_001, column: 0 },
      original: { line: 1, column: 0 },
      source: 'input.ts'
    });
    const map = generator.toJSON();
    assert.equal(map.mappings.length, 10_000_004);
    assert.equal(map.mappings.slice(-4), 'AAAA');
    return map.mappings.length;
  }
  if (operation === 'exhausted-code') {
    const consumer = new SourceMapConsumer(indexedMap(1_000_000));
    return SourceNode.fromStringWithSourceMap('x', consumer).toString();
  }
  throw new Error('Unknown source-map operation: ' + operation);
}

async function inBoundedWorker(operation) {
  const worker = new Worker(__filename, {
    workerData: operation,
    resourceLimits: { maxOldGenerationSizeMb: 64, maxYoungGenerationSizeMb: 16 }
  });
  try {
    return await new Promise((resolve, reject) => {
      let settled = false;
      let operationTimer;
      const startupTimer = setTimeout(() => finish(new Error('Worker did not start')), 10_000);
      function finish(error, result) {
        if (settled) return;
        settled = true;
        clearTimeout(startupTimer);
        clearTimeout(operationTimer);
        if (error) reject(error);
        else resolve(result);
      }
      worker.once('online', () => {
        clearTimeout(startupTimer);
        operationTimer = setTimeout(
          () => finish(new Error(operation + ' exceeded the 3-second operation budget')),
          3_000
        );
      });
      worker.once('message', result => finish(null, result));
      worker.once('error', error => finish(error));
      worker.once('exit', code =>
        finish(new Error(operation + ' exited without a result: ' + code))
      );
    });
  } finally {
    await worker.terminate();
  }
}

if (!isMainThread) {
  parentPort.postMessage(exercise(workerData));
} else {
  for (const field of ['line', 'column']) {
    for (const value of [-1, 0.5, Infinity, NaN, Number.MAX_SAFE_INTEGER + 1, null, '1']) {
      test('rejects invalid indexed section ' + field + ': ' + String(value), () => {
        const offset = { line: 0, column: 0, [field]: value };
        assert.throws(
          () => new SourceMapConsumer({ version: 3, sections: [{ offset, map: basicMap() }] }),
          /non-negative integers/
        );
      });
    }
  }

  test('rejects excessive direct and accumulated nested line offsets', () => {
    assert.throws(() => new SourceMapConsumer(indexedMap(100_000_000)), /must not exceed/);
    assert.throws(
      () => new SourceMapConsumer(indexedMap(6_000_000, 0, indexedMap(6_000_000))),
      /including offsets of nested sections/
    );
    assert.doesNotThrow(() => new SourceMapConsumer(indexedMap(10_000_000)));
  });

  test('retains normal indexed mappings and source content', () => {
    const consumer = new SourceMapConsumer({
      version: 3,
      sections: [
        { offset: { line: 0, column: 0 }, map: basicMap('first.ts') },
        { offset: { line: 1, column: 2 }, map: basicMap('second.ts') }
      ]
    });
    assert.deepEqual(consumer.originalPositionFor({ line: 1, column: 1 }), {
      source: 'first.ts',
      line: 1,
      column: 0,
      name: null
    });
    assert.deepEqual(consumer.originalPositionFor({ line: 2, column: 3 }), {
      source: 'second.ts',
      line: 1,
      column: 0,
      name: null
    });
    assert.deepEqual(consumer.sources, ['first.ts', 'second.ts']);
    assert.equal(consumer.sourceContentFor('second.ts'), 'const value = 1;');
    assert.equal(SourceNode.fromStringWithSourceMap('a\n  b', consumer).toString(), 'a\n  b');
  });

  test('roundtrips a normal generated map and its source content', () => {
    const generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(basicMap()));
    assert.deepEqual(generator.toJSON(), basicMap());
    const roundtrip = new SourceMapConsumer(generator.toJSON());
    assert.deepEqual(roundtrip.originalPositionFor({ line: 1, column: 0 }), {
      source: 'input.ts',
      line: 1,
      column: 0,
      name: null
    });
    assert.equal(roundtrip.sourceContentFor('input.ts'), 'const value = 1;');
  });

  test('reads deeply nested sources within a bounded worker', async () => {
    assert.deepEqual(await inBoundedWorker('nested-sources'), ['first.ts', 'second.ts']);
  });

  test('serializes a large generated gap within a bounded worker', async () => {
    assert.equal(await inBoundedWorker('generated-gap'), 10_000_004);
  });

  test('stops mapping padding when generated code is exhausted', async () => {
    assert.equal(await inBoundedWorker('exhausted-code'), 'x');
  });
}
