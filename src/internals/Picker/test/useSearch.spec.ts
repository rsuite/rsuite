import React from 'react';
import useSearch from '../hooks/useSearch';
import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

describe('useSearch(data, opts)', () => {
  const data = ['wanted', 'other'];

  it('Should set empty string as default search keyword', () => {
    const { result } = renderHook(() => useSearch(data, { labelKey: '' }));

    expect(result.current.searchKeyword).to.equal('');
  });

  it('Should return data as is initially', () => {
    const { result } = renderHook(() => useSearch(data, { labelKey: '' }));

    expect(result.current.filteredData).to.deep.equal(data);
  });

  it('Should update search keyword to new value specified by handleSearch', () => {
    const { result } = renderHook(() => useSearch(data, { labelKey: '' }));

    act(() => {
      result.current.handleSearch('test', void 0 as any);
    });

    expect(result.current.searchKeyword).to.equal('test');
  });

  it('Should return filtered data when search keyword is updated', () => {
    const { result } = renderHook(() => useSearch(data, { labelKey: '' }));

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
    });

    expect(result.current.filteredData).to.deep.equal(['wanted']);
  });

  it('Should filter data based on labelKey when data items are objects', () => {
    const { result } = renderHook(() =>
      useSearch(
        [
          { label: 'wanted', value: 'other' },
          { label: 'other', value: 'wanted' }
        ],
        { labelKey: 'label' }
      )
    );

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
    });

    expect(result.current.filteredData).to.deep.equal([{ label: 'wanted', value: 'other' }]);
  });

  it('Should filter data based on opts.searchBy function when specified', () => {
    const searchBy = vi.fn((_keyword, _label, item: string) => item === 'other');

    const { result } = renderHook(() => useSearch(data, { labelKey: '', searchBy }));

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
    });

    expect(searchBy).toHaveBeenCalledWith('wanted', 'wanted', 'wanted');
    expect(result.current.filteredData).to.deep.equal(['other']);
  });

  it('Should call opts.callback when keyword is updated', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useSearch(data, { labelKey: '', callback }));

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
    });

    expect(callback).toHaveBeenCalledWith('wanted', ['wanted'], void 0);
  });

  it('Should reset search keyword to empty string when calling resetSearch', () => {
    const { result } = renderHook(() => useSearch(data, { labelKey: '' }));

    act(() => {
      result.current.handleSearch('test', void 0 as any);
    });

    act(() => {
      result.current.resetSearch();
    });

    expect(result.current.searchKeyword).to.equal('');
  });

  it('Should normalize the default keyword once for each filtering pass', () => {
    const keyword = 'Wa Nt';
    const data = Array.from({ length: 1000 }, (_, index) => `Prefix wa nt ${index}`);
    const lowerCase = String.prototype.toLocaleLowerCase;
    let keywordNormalizations = 0;
    const spy = vi.spyOn(String.prototype, 'toLocaleLowerCase').mockImplementation(function (
      this: string
    ) {
      if (String(this) === keyword) keywordNormalizations++;
      return lowerCase.call(this);
    });

    try {
      const callback = vi.fn();
      const { result } = renderHook(() => useSearch(data, { labelKey: '', callback }));

      act(() => result.current.handleSearch(keyword, void 0 as any));

      expect(callback).toHaveBeenCalledExactlyOnceWith(keyword, data, void 0);
      expect(result.current.filteredData).to.deep.equal(data);
      expect(keywordNormalizations).to.equal(2);
    } finally {
      spy.mockRestore();
    }
  });

  it('Should retain spaces around a nonempty keyword and accept whitespace-only searches', () => {
    const data = ['wanted', ' wanted ', 'unwanted'];
    const { result } = renderHook(() => useSearch(data, { labelKey: '' }));

    act(() => result.current.handleSearch(' WANTED ', void 0 as any));
    expect(result.current.filteredData).to.deep.equal([' wanted ']);
    expect(result.current.checkShouldDisplay('wanted', 'WANTED')).to.be.true;

    act(() => result.current.handleSearch('\u00a0\t ', void 0 as any));
    expect(result.current.filteredData).to.deep.equal(data);
  });

  it('Should match numbers and nested React labels while keeping unsupported labels hidden', () => {
    const data = [
      { label: 42 },
      { label: React.createElement('span', null, 'WANT', React.createElement('b', null, 'ED')) },
      { label: ['wanted'] },
      { label: null }
    ];
    const { result } = renderHook(() => useSearch(data, { labelKey: 'label' }));

    act(() => result.current.handleSearch('wanted', void 0 as any));
    expect(result.current.filteredData).to.deep.equal([data[1]]);

    act(() => result.current.handleSearch('42', void 0 as any));
    expect(result.current.filteredData).to.deep.equal([data[0]]);

    act(() => result.current.resetSearch());
    expect(result.current.filteredData).to.deep.equal(data);
  });

  it('Should keep custom searchBy calls and callback synchronous before filtering for render', () => {
    const searchBy = vi.fn((keyword: string, label: string) => label.includes(keyword));
    let callbackCompleted = false;
    const callback = vi.fn((keyword: string, filtered: string[]) => {
      expect(keyword).to.equal('wanted');
      expect(filtered).to.deep.equal(['wanted']);
      expect(searchBy.mock.calls).to.deep.equal([
        ['wanted', 'wanted', 'wanted'],
        ['wanted', 'other', 'other']
      ]);
      callbackCompleted = true;
    });
    const { result } = renderHook(() => useSearch(data, { labelKey: '', searchBy, callback }));
    searchBy.mockClear();

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
      expect(callbackCompleted).to.be.true;
    });

    expect(searchBy.mock.calls).to.deep.equal([
      ['wanted', 'wanted', 'wanted'],
      ['wanted', 'other', 'other'],
      ['wanted', 'wanted', 'wanted'],
      ['wanted', 'other', 'other']
    ]);
  });

  it('Should filter the latest data after a synchronous callback changes it', () => {
    const data = [{ label: 'wanted' }, { label: 'other' }];
    const callback = vi.fn((_keyword: string, filtered: typeof data) => {
      filtered.length = 0;
      data[1].label = 'wanted too';
    });
    const { result } = renderHook(() => useSearch(data, { labelKey: 'label', callback }));

    act(() => result.current.handleSearch('wanted', void 0 as any));

    expect(result.current.filteredData).to.deep.equal(data);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should refilter when data, labelKey or searchBy changes and reset with the current predicate', () => {
    const data = [
      { label: 'wanted', title: 'other' },
      { label: 'other', title: 'wanted' }
    ];
    const { result, rerender } = renderHook(props => useSearch(props.data, props), {
      initialProps: { data, labelKey: 'label', searchBy: undefined as any }
    });
    act(() => result.current.handleSearch('wanted', void 0 as any));
    expect(result.current.filteredData).to.deep.equal([data[0]]);

    rerender({ data, labelKey: 'title', searchBy: undefined });
    expect(result.current.filteredData).to.deep.equal([data[1]]);

    const replacement = [{ label: 'new', title: 'wanted replacement' }];
    rerender({ data: replacement, labelKey: 'title', searchBy: undefined });
    expect(result.current.filteredData).to.deep.equal(replacement);

    const searchBy = vi.fn((keyword: string) => keyword === '');
    rerender({ data: replacement, labelKey: 'title', searchBy });
    expect(result.current.filteredData).to.deep.equal([]);
    act(() => result.current.resetSearch());
    expect(result.current.filteredData).to.deep.equal(replacement);
    expect(searchBy).toHaveBeenCalledWith('', 'wanted replacement', replacement[0]);
  });
});
