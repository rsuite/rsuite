import type { LocaleSearchMatch } from './types';

type FilterOptions = { signal?: AbortSignal; budgetMs?: number };
type TaskScheduler = {
  postTask: (
    callback: () => void,
    options: { priority: 'background'; signal?: AbortSignal }
  ) => Promise<void>;
};

function abortReason(signal: AbortSignal) {
  if (signal.reason !== undefined) return signal.reason;
  return Object.assign(new Error('Search aborted'), { name: 'AbortError' });
}

function yieldTask(signal?: AbortSignal) {
  const scheduler = (globalThis as typeof globalThis & { scheduler?: TaskScheduler }).scheduler;
  if (typeof scheduler?.postTask === 'function')
    return scheduler.postTask(() => {}, { priority: 'background', signal });
  return new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      reject(abortReason(signal!));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, 0);
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) abort();
  });
}

export function createLocaleFilter(
  locale: string | readonly string[] = 'en-GB',
  options: Intl.CollatorOptions = {}
) {
  const locales = typeof locale === 'string' ? locale : [...locale];
  const collatorOptions: Intl.CollatorOptions = {
    usage: 'search',
    sensitivity: 'base',
    ignorePunctuation: false,
    ...options
  };
  let resources: { compare: Intl.Collator['compare']; segmenter: Intl.Segmenter } | undefined;
  const initialize = () => {
    if (resources) return resources;
    if (
      typeof globalThis.Intl?.Collator !== 'function' ||
      typeof globalThis.Intl?.Segmenter !== 'function'
    ) {
      throw new TypeError(
        'Locale search requires Intl.Collator and Intl.Segmenter. Load a polyfill before retrying.'
      );
    }
    const collator = new Intl.Collator(locales, collatorOptions);
    const segmenter = new Intl.Segmenter(locales, { granularity: 'grapheme' });
    resources = { compare: collator.compare, segmenter };
    return resources;
  };

  return async function filter<T>(
    items: readonly T[],
    query: string,
    getText: (item: T) => string,
    method: LocaleSearchMatch = 'contains',
    { signal, budgetMs = 8 }: FilterOptions = {}
  ): Promise<T[]> {
    const checkAbort = () => {
      if (signal?.aborted) throw abortReason(signal);
    };
    checkAbort();
    if (!['contains', 'startsWith', 'endsWith'].includes(method)) {
      throw new RangeError('Unknown locale search method.');
    }
    if (!Number.isFinite(budgetMs) || budgetMs <= 0) {
      throw new RangeError('The search time budget must be finite and positive.');
    }
    const source = items.slice();
    const { compare, segmenter } = initialize();
    const needle = query.normalize('NFC');
    const empty = compare(needle, '') === 0;
    const matches: T[] = [];
    let chunkStart = performance.now();
    let operations = 0;
    const checkpoint = () => {
      checkAbort();
      if (performance.now() - chunkStart < budgetMs) return;
      return yieldTask(signal).then(() => {
        checkAbort();
        chunkStart = performance.now();
      });
    };

    for (const item of source) {
      checkAbort();
      let found = empty;
      if (!empty) {
        const text = getText(item);
        if (typeof text !== 'string') throw new TypeError('getText must return a string.');
        const value = text.normalize('NFC');
        const boundaries: number[] = [];
        for (const entry of segmenter.segment(value)) {
          boundaries.push(entry.index);
          if (++operations === 128) {
            operations = 0;
            const pause = checkpoint();
            if (pause) await pause;
          }
        }
        boundaries.push(value.length);
        if (method === 'endsWith') {
          for (let start = boundaries.length - 2; start >= 0 && !found; start--) {
            found = compare(value.slice(boundaries[start]), needle) === 0;
            if (++operations === 128) {
              operations = 0;
              const pause = checkpoint();
              if (pause) await pause;
            }
          }
        } else {
          const last =
            method === 'startsWith' ? Math.min(1, boundaries.length - 1) : boundaries.length - 1;
          for (let start = 0; start < last && !found; start++) {
            for (let end = start + 1; end < boundaries.length; end++) {
              if (compare(value.slice(boundaries[start], boundaries[end]), needle) === 0) {
                found = true;
                break;
              }
              if (++operations === 128) {
                operations = 0;
                const pause = checkpoint();
                if (pause) await pause;
              }
            }
          }
        }
      }
      if (found) matches.push(item);
      const pause = checkpoint();
      if (pause) await pause;
    }
    checkAbort();
    return matches;
  };
}
