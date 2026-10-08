import type { Page, Request, Response } from 'playwright';
import type { BrowserCommandContext } from 'vitest/node';
import type {} from '@vitest/browser/providers/playwright';

const observedPages = new WeakSet<Page>();
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

export function observeBrowserModuleLoads({ page }: BrowserCommandContext) {
  observeModuleLoads(page, new URL(page.url()).origin);
}
