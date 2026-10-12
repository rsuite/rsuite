import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLocaleFilter } from '../createLocaleFilter';
import type { LocaleSearchMatch } from '../types';
import { matchingCases } from './matchingCases';

const text = (value: string) => value;

describe('locale matching', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each(matchingCases)('$name ($locale, $method)', async test => {
    const matches = await createLocaleFilter(test.locale, test.options)(
      [test.text],
      test.query,
      text,
      test.method
    );
    expect(matches).toEqual(test.expected ? [test.text] : []);
  });

  it('Should preserve object identity, order and duplicate occurrences', async () => {
    const first = { label: 'Café' };
    const second = { label: 'CAFÉ' };
    const source = [first, { label: 'Tea' }, second, first] as const;
    const result = await createLocaleFilter()(source, 'cafe', item => item.label);
    expect(result).toEqual([first, second, first]);
    expect(result[0]).toBe(first);
    expect(result[1]).toBe(second);
    expect(result[2]).toBe(first);
    expect(source).toHaveLength(4);
  });

  it('Should return a copied array without projecting an empty query', async () => {
    const source = [{ label: 'Café' }];
    const getText = vi.fn(() => {
      throw new Error('Unnecessary projection');
    });
    const result = await createLocaleFilter()(source, '', getText);
    expect(result).toEqual(source);
    expect(result).not.toBe(source);
    expect(result[0]).toBe(source[0]);
    expect(getText).not.toHaveBeenCalled();
  });

  it('Should snapshot locale preferences and collation options', async () => {
    const locales = ['tr-TR'];
    const options: Intl.CollatorOptions = { sensitivity: 'base' };
    const filter = createLocaleFilter(locales, options);
    locales[0] = 'en-GB';
    options.sensitivity = 'variant';
    expect(await filter(['I'], 'ı', text)).toEqual(['I']);
  });

  it('Should reject non-string text without silently coercing records', async () => {
    await expect(
      createLocaleFilter()([42], '42', value => value as unknown as string)
    ).rejects.toThrow('getText must return a string.');
  });

  it('Should reject an unknown matching mode before projecting records', async () => {
    const getText = vi.fn(text);
    await expect(
      createLocaleFilter()(['a'], 'a', getText, 'unsupported' as LocaleSearchMatch)
    ).rejects.toThrow('Unknown locale search method.');
    expect(getText).not.toHaveBeenCalled();
  });

  it.each(['contains', 'startsWith', 'endsWith'] as const)(
    'Should yield during %s comparisons and resume with the remaining records',
    async method => {
      let resume!: () => void;
      const postTask = vi.fn(
        (callback: () => void) =>
          new Promise<void>(resolve => {
            resume = () => {
              callback();
              resolve();
            };
          })
      );
      vi.stubGlobal('scheduler', { postTask });
      vi.spyOn(performance, 'now').mockReturnValue(20).mockReturnValueOnce(0);
      // Segmentation fits in one chunk; comparing this record exhausts the budget.
      const first = 'a'.repeat(96);
      const getText = vi.fn(text);
      const controller = new AbortController();
      const pending = createLocaleFilter()([first, 'z'], 'z', getText, method, {
        signal: controller.signal
      });
      expect(postTask).toHaveBeenCalledTimes(1);
      expect(postTask).toHaveBeenCalledWith(expect.any(Function), {
        priority: 'background',
        signal: controller.signal
      });
      expect(getText.mock.calls).toEqual([[first]]);
      resume();
      expect(await pending).toEqual(['z']);
      expect(getText.mock.calls).toEqual([[first], ['z']]);
    }
  );

  it.each(['contains', 'startsWith', 'endsWith'] as const)(
    'Should stop a cancelled %s search even when the scheduler still resumes it',
    async method => {
      let resume!: () => void;
      vi.stubGlobal('scheduler', {
        postTask: () => new Promise<void>(resolve => (resume = resolve))
      });
      vi.spyOn(performance, 'now').mockReturnValue(20).mockReturnValueOnce(0);
      const first = 'a'.repeat(96);
      const getText = vi.fn(text);
      const controller = new AbortController();
      const reason = new Error('Query replaced while comparing');
      const pending = createLocaleFilter()([first, 'z'], 'z', getText, method, {
        signal: controller.signal
      });
      controller.abort(reason);
      resume();
      await expect(pending).rejects.toBe(reason);
      expect(getText.mock.calls).toEqual([[first]]);
    }
  );

  it('Should propagate scheduling failures without processing more records', async () => {
    const error = new Error('Scheduler unavailable');
    vi.stubGlobal('scheduler', { postTask: vi.fn().mockRejectedValue(error) });
    vi.spyOn(performance, 'now').mockReturnValue(20).mockReturnValueOnce(0);
    const first = 'a'.repeat(96);
    const getText = vi.fn(text);
    await expect(createLocaleFilter()([first, 'z'], 'z', getText)).rejects.toBe(error);
    expect(getText.mock.calls).toEqual([[first]]);
  });

  it('Should honor an aborted signal before touching text or Intl', async () => {
    const controller = new AbortController();
    const reason = new Error('Already cancelled');
    controller.abort(reason);
    const getText = vi.fn(text);
    await expect(
      createLocaleFilter('invalid_locale')(['a'], 'a', getText, 'contains', {
        signal: controller.signal
      })
    ).rejects.toBe(reason);
    expect(getText).not.toHaveBeenCalled();
  });

  it('Should cancel long segmentation and release the fallback timer listener', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'scheduler');
    Object.defineProperty(globalThis, 'scheduler', { configurable: true, value: undefined });
    try {
      const controller = new AbortController();
      const remove = vi.spyOn(controller.signal, 'removeEventListener');
      const reason = new Error('Query replaced');
      const pending = createLocaleFilter()(['a'.repeat(250000)], 'z', text, 'contains', {
        signal: controller.signal,
        budgetMs: Number.MIN_VALUE
      });
      controller.abort(reason);
      await expect(pending).rejects.toBe(reason);
      expect(remove).toHaveBeenCalledWith('abort', expect.any(Function));
      remove.mockRestore();
    } finally {
      if (descriptor) Object.defineProperty(globalThis, 'scheduler', descriptor);
      else Reflect.deleteProperty(globalThis, 'scheduler');
    }
  });

  it('Should preserve an input snapshot while yielding between records', async () => {
    vi.stubGlobal('scheduler', undefined);
    vi.spyOn(performance, 'now').mockReturnValue(20).mockReturnValueOnce(0);
    const controller = new AbortController();
    const add = vi.spyOn(controller.signal, 'addEventListener');
    const remove = vi.spyOn(controller.signal, 'removeEventListener');
    const source = ['first', 'second'];
    const pending = createLocaleFilter()(source, '', text, 'contains', {
      signal: controller.signal
    });
    expect(add).toHaveBeenCalledWith('abort', expect.any(Function), { once: true });
    source.push('later');
    expect(await pending).toEqual(['first', 'second']);
    expect(remove).toHaveBeenCalledWith('abort', add.mock.calls[0][1]);
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
