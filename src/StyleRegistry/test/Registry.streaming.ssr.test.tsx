import React, { Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { renderToPipeableStream } from 'react-dom/server.node';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Writable } from 'node:stream';
import { beforeAll, expect, it } from 'vitest';
import Box from '@/Box';
import CustomProvider from '@/CustomProvider';
import StyleRegistry from '..';
import createStyleRegistry from '@/createStyleRegistry';
import { StyleManager } from '@/internals/styled-system/style-manager';

function createGate() {
  let release!: () => void;
  const gate = {
    ready: false,
    promise: new Promise<void>(resolve => {
      release = resolve;
    }),
    resolve() {
      gate.ready = true;
      release();
    }
  };
  return gate;
}

function Wait({
  gate,
  children
}: {
  gate: ReturnType<typeof createGate>;
  children: React.ReactNode;
}) {
  if (!gate.ready) throw gate.promise;
  return children;
}

function startRequest(name: string, color: string, abandon = false) {
  const registry = createStyleRegistry();
  const gate = createGate();
  const styles: { phase: string; html: string }[] = [];
  const errors: string[] = [];
  const output: Buffer[] = [];
  let shellReady!: () => void;
  let finished!: () => void;
  const shell = new Promise<void>(resolve => {
    shellReady = resolve;
  });
  const done = new Promise<void>(resolve => {
    finished = resolve;
  });
  const writable = new Writable({
    write(chunk, _encoding, next) {
      output.push(Buffer.from(chunk));
      next();
    },
    final(next) {
      finished();
      next();
    }
  });
  const flush = (phase: string) => {
    const element = registry.getStyleElement();
    styles.push({ phase, html: element ? renderToStaticMarkup(element) : '' });
    registry.flush();
    expect(registry.getStyleElement()).toBeNull();
  };
  const late = (
    <Box data-testid={'late-' + name} c={color} p={{ xs: '7px', md: '23px' }}>
      Ready
    </Box>
  );
  const tree = (
    <StyleRegistry registry={registry}>
      <CustomProvider csp={{ nonce: 'stream-' + name }}>
        <Box data-testid={'shell-' + name} c={color} p={{ xs: '5px', md: '19px' }}>
          Shell
        </Box>
        <Suspense fallback={<span>Pending</span>}>
          {abandon ? (
            <Box c={color}>
              <Wait gate={gate}>{late}</Wait>
            </Box>
          ) : (
            <Wait gate={gate}>{late}</Wait>
          )}
        </Suspense>
      </CustomProvider>
    </StyleRegistry>
  );
  const controls = renderToPipeableStream(tree, {
    identifierPrefix: 'same-request-prefix:',
    onShellReady() {
      flush('shell');
      controls.pipe(writable);
      shellReady();
    },
    onAllReady() {
      flush('all-ready');
    },
    onError(error) {
      errors.push(String(error));
    },
    onShellError(error) {
      throw error;
    }
  });
  return {
    gate,
    styles,
    errors,
    shell,
    done,
    controls,
    html: () => Buffer.concat(output).toString()
  };
}

beforeAll(() => {
  if (process.env.VITE_RSUITE_REACT_VERSION) {
    expect(React.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
    expect(ReactDOM.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
  }
  expect(typeof document).toBe('undefined');
});

it('isolates interleaved requests and flushes resolved Suspense rules incrementally', async () => {
  const first = startRequest('first', '#123456');
  const second = startRequest('second', '#654321');
  await Promise.all([first.shell, second.shell]);
  for (const request of [first, second]) {
    expect(request.styles.map(style => style.phase)).toEqual(['shell']);
    expect(request.styles[0].html).toContain('19px');
    expect(request.styles[0].html).not.toContain('23px');
  }
  second.gate.resolve();
  await second.done;
  expect(first.styles).toHaveLength(1);
  first.gate.resolve();
  await first.done;
  for (const [request, own, other] of [
    [first, '#123456', '#654321'],
    [second, '#654321', '#123456']
  ] as const) {
    expect(request.errors).toEqual([]);
    expect(request.styles.map(style => style.phase)).toEqual(['shell', 'all-ready']);
    expect(request.styles[1].html).toContain('23px');
    expect(request.styles[1].html).not.toContain('19px');
    expect(
      request.styles.every(style => style.html.includes(own) && !style.html.includes(other))
    ).toBe(true);
    expect(request.html()).toContain('Ready');
  }
  expect(first.styles[0].html).toContain('nonce="stream-first"');
  expect(second.styles[0].html).toContain('nonce="stream-second"');
  expect(StyleManager.styleMap.size).toBe(0);
  expect(StyleManager.styleElement).toBeNull();
});

it('keeps a concurrent request intact when another render aborts after collecting rules', async () => {
  const aborted = startRequest('aborted', '#aabbcc', true);
  const survivor = startRequest('survivor', '#112233');
  await Promise.all([aborted.shell, survivor.shell]);
  aborted.controls.abort(new Error('registry-abort-control'));
  await aborted.done;
  survivor.gate.resolve();
  await survivor.done;
  expect(aborted.errors).toHaveLength(1);
  expect(aborted.errors[0]).toContain('registry-abort-control');
  expect(aborted.styles[0].html).toContain('#aabbcc');
  expect(aborted.html()).not.toContain('late-aborted');
  expect(survivor.errors).toEqual([]);
  expect(survivor.styles.every(style => !style.html.includes('#aabbcc'))).toBe(true);
  expect(survivor.html()).toContain('late-survivor');
  expect(StyleManager.styleMap.size).toBe(0);
  expect(StyleManager.styleElement).toBeNull();
});

it('deduplicates flushed inputs while retaining stable style snapshots for repeated rendering', () => {
  const registry = createStyleRegistry();
  const render = (padding: string | undefined) =>
    renderToString(
      <StyleRegistry registry={registry}>
        <Box c="#123456" p={padding}>
          Content
        </Box>
      </StyleRegistry>,
      { identifierPrefix: 'repeated:' }
    );
  const first = render('7px');
  expect(registry.getStyleElement()).not.toBeNull();
  registry.flush();
  expect(render('7px')).toBe(first);
  expect(registry.getStyleElement()).toBeNull();
  const changed = render(undefined);
  expect(changed).not.toBe(first);
  expect(registry.getStyleElement()).not.toBeNull();
  registry.flush();
  expect(render('7px')).toBe(first);
  expect(registry.getStyleElement()).toBeNull();
});
