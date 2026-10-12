import { describe, expect, it, vi } from 'vitest';
import { createLocaleFilter } from '../createLocaleFilter';
import { matchingCases } from './matchingCases';

const text = (value: string) => value;

describe('locale matching', () => {
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
    const source = ['first', 'second'];
    const pending = createLocaleFilter()(source, '', text, 'contains', {
      budgetMs: Number.MIN_VALUE
    });
    source.push('later');
    expect(await pending).toEqual(['first', 'second']);
  });
});
