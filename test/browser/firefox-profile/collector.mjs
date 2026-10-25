import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { once } from 'node:events';

export const markerPrefix = 'rsuite-firefox-profile:request:';

export function hasMarker(profile, name) {
  if (!profile || typeof profile !== 'object') return false;
  for (const thread of Array.isArray(profile.threads) ? profile.threads : []) {
    if (thread?.processType !== 'tab') continue;
    const markers = thread?.markers;
    if (!Array.isArray(markers?.data) || !Number.isInteger(markers.schema?.data)) continue;
    if (
      markers.data.some(
        row =>
          row?.[markers.schema.data]?.type === 'UserTiming' &&
          row?.[markers.schema.data]?.name === name
      )
    )
      return true;
  }
  return (Array.isArray(profile.processes) ? profile.processes : []).some(child =>
    hasMarker(child, name)
  );
}

export function validateTrigger(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    typeof value.id !== 'string' ||
    !/^[\w.-]{1,256}$/.test(value.id) ||
    typeof value.name !== 'string' ||
    value.name.length > 4096
  ) {
    throw new Error('Invalid native profile test identity');
  }
  return { id: value.id, name: value.name };
}

export async function waitForProfile(file, marker, timeoutMs = 5000) {
  const started = performance.now();
  let lastVersion = '';
  while (performance.now() - started < timeoutMs) {
    try {
      const stat = await fs.stat(file);
      if (stat.size > 256 * 1024 * 1024) throw new RangeError('Native profile exceeds256MiB');
      const version = `${stat.size}:${stat.mtimeMs}`;
      if (version !== lastVersion) {
        lastVersion = version;
        const raw = await fs.readFile(file);
        try {
          const profile = JSON.parse(raw);
          // Firefox first writes a parent-only profile, then replaces it with
          // the aggregated profile. Require the requesting content frame.
          if (hasMarker(profile, marker)) return { raw, profile };
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error;
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  throw new Error('Native profile capture timed out without the requesting test frame');
}

export async function createCollector({ browserProcess, directory, timeoutMs = 5000 }) {
  if (!Number.isSafeInteger(browserProcess?.pid) || browserProcess.pid <= 0) {
    throw new Error('An owned launchServer process handle is required');
  }
  const route = '/capture/' + crypto.randomBytes(24).toString('hex');
  const state = { status: 'not-requested' };
  let capture;
  async function save(trigger) {
    state.status = 'capturing';
    state.test = trigger;
    const started = performance.now();
    try {
      if (browserProcess.exitCode !== null || browserProcess.signalCode !== null) {
        throw new Error('The owned Firefox process has exited');
      }
      if (!browserProcess.kill('SIGUSR2')) throw new Error('Firefox profiler stop signal failed');
      const file = path.join(directory, `profile_0_${browserProcess.pid}.json`);
      const { raw, profile } = await waitForProfile(file, markerPrefix + trigger.id, timeoutMs);
      Object.assign(state, {
        status: 'captured',
        file: path.basename(file),
        bytes: raw.length,
        sha256: crypto.createHash('sha256').update(raw).digest('hex'),
        signalToCompleteMs: performance.now() - started,
        configuration: profile.meta?.configuration
      });
      return { ok: true, capturedTestId: trigger.id, file: state.file };
    } catch (error) {
      state.status = 'error';
      state.error = String(error.stack || error);
      throw error;
    }
  }
  const server = http.createServer(async (request, response) => {
    response.setHeader('content-type', 'application/json');
    try {
      if (request.method !== 'POST' || request.url !== route) {
        response.statusCode = 404;
        response.end(JSON.stringify({ ok: false, error: 'Unknown collector request' }));
        return;
      }
      let body = '';
      for await (const chunk of request) {
        body += chunk.toString();
        if (body.length > 16384) throw new Error('Native profile request is too large');
      }
      const trigger = validateTrigger(JSON.parse(body));
      // Stop once, before the first failed test frame can be destroyed. Later
      // failures retain their ordinary logs and receive the first capture ID.
      capture ||= save(trigger);
      response.end(JSON.stringify(await capture));
    } catch (error) {
      state.requestError ||= String(error.stack || error);
      response.statusCode = 500;
      response.end(
        JSON.stringify({ ok: false, error: 'Native profile capture failed; see summary.json' })
      );
    }
  });
  server.requestTimeout = 6000;
  server.headersTimeout = 6000;
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return {
    url: `http://127.0.0.1:${server.address().port}${route}`,
    state,
    async close() {
      await capture?.catch(() => {});
      const closed = new Promise(resolve => server.close(resolve));
      server.closeAllConnections();
      await closed;
    }
  };
}
