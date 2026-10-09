import type { Page, Request, Response } from 'playwright';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser/providers/playwright';
import { observeBrowserLifecycle } from './browserLifecycleDiagnostics';

const observedPages = new WeakSet<Page>();
const requestHeaders = [
  'accept',
  'cache-control',
  'if-none-match',
  'if-modified-since',
  'if-range',
  'range',
  'pragma',
  'sec-fetch-dest'
];
const responseHeaders = [
  'content-type',
  'content-length',
  'content-encoding',
  'cache-control',
  'etag'
];

interface ModuleResponse {
  status: number;
  headers: Record<string, string>;
}

export interface ModuleLoadDiagnostic {
  event: 'response' | 'requestfailed';
  url: string;
  response: ModuleResponse | null;
  lastSuccessfulResponse: ModuleResponse | null;
  error?: string;
}

/** Observe module failures without intercepting requests or changing the browser cache. */
export function observeModuleLoads(
  page: Page,
  origin: string,
  report: (diagnostic: ModuleLoadDiagnostic) => void = diagnostic =>
    console.error('[Browser module error]', JSON.stringify(diagnostic))
) {
  if (observedPages.has(page)) return;
  observedPages.add(page);

  const responses = new WeakMap<Request, ModuleResponse>();
  const successfulResponses = new Map<string, ModuleResponse>();
  const isModule = (request: Request) =>
    request.resourceType() === 'script' && new URL(request.url()).origin === origin;
  const describe = (response: Response): ModuleResponse => ({
    status: response.status(),
    headers: Object.fromEntries(
      responseHeaders
        .filter(name => response.headers()[name] !== undefined)
        .map(name => [name, response.headers()[name]])
    )
  });
  const publish = (event: ModuleLoadDiagnostic['event'], request: Request) => {
    report({
      event,
      url: request.url(),
      response: responses.get(request) || null,
      lastSuccessfulResponse: successfulResponses.get(request.url()) || null,
      ...(event === 'requestfailed' ? { error: request.failure()?.errorText } : {})
    });
  };

  page.on('response', response => {
    const request = response.request();
    if (!isModule(request)) return;
    responses.set(request, describe(response));
    const contentType = response.headers()['content-type'] || '';
    if (
      response.status() >= 400 ||
      (response.status() === 200 && !/(?:java|ecma)script/i.test(contentType))
    ) {
      publish('response', request);
    }
  });
  page.on('requestfinished', request => {
    if (!isModule(request)) return;
    const response = responses.get(request);
    // A 304 may omit content headers; retain the last complete representation.
    if (response?.status === 200 && /(?:java|ecma)script/i.test(response.headers['content-type'])) {
      successfulResponses.set(request.url(), response);
    }
  });
  page.on('requestfailed', request => {
    if (isModule(request)) publish('requestfailed', request);
  });
}

/** Read the server's headers: Firefox may omit cache validators from Playwright events. */
export function createModuleRequestObserver() {
  interface ServerRequest {
    time: number;
    method: string | undefined;
    headers: Record<string, string | string[]>;
    status: number | null;
    finished: boolean;
  }
  const recentRequests = new Map<string, ServerRequest[]>();
  return {
    middleware(request: IncomingMessage, response: ServerResponse, next: () => void) {
      if (request.headers['sec-fetch-dest'] !== 'script' || !request.url) return next();
      const url = request.url;
      const record: ServerRequest = {
        time: Date.now(),
        method: request.method,
        headers: Object.fromEntries(
          requestHeaders
            .filter(name => request.headers[name] !== undefined)
            .map(name => [name, request.headers[name]!])
        ),
        status: null,
        finished: false
      };
      const history = [...(recentRequests.get(url) || []).slice(-1), record];
      recentRequests.delete(url);
      recentRequests.set(url, history);
      // Bound the observer's memory across long browser suites.
      if (recentRequests.size > 1024) recentRequests.delete(recentRequests.keys().next().value!);
      response.once('finish', () => {
        record.status = response.statusCode;
        record.finished = true;
      });
      response.once('close', () => {
        record.status = response.statusCode;
      });
      next();
    },
    getRecentRequests(url: string) {
      const { pathname, search } = new URL(url);
      return recentRequests.get(pathname + search) || [];
    }
  };
}

export function createBrowserModuleDiagnostics() {
  const observer = createModuleRequestObserver();
  const plugin: Plugin<ReturnType<typeof createModuleRequestObserver>> = {
    name: 'rsuite-browser-module-diagnostics',
    api: observer,
    configureServer(server) {
      server.middlewares.use(observer.middleware);
    }
  };
  return {
    plugin,
    observeBrowserModuleLoads({ page, project }: BrowserCommandContext) {
      // Vitest resolves the browser server separately from its command configuration.
      const serverPlugin = project.browser?.vite.config.plugins.find(
        candidate => candidate.name === plugin.name
      ) as typeof plugin | undefined;
      if (!serverPlugin?.api) throw new Error('Browser module diagnostics plugin is missing');
      const serverObserver = serverPlugin.api;
      const origin = new URL(page.url()).origin;
      const snapshot = observeBrowserLifecycle(page, origin);
      observeModuleLoads(page, origin, diagnostic => {
        console.error(
          '[Browser module error]',
          JSON.stringify({
            ...diagnostic,
            browser: snapshot(),
            serverRequests: serverObserver.getRecentRequests(diagnostic.url)
          })
        );
      });
    }
  };
}
