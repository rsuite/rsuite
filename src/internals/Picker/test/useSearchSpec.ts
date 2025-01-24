import sinon from 'sinon';
import useSearch from '../hooks/useSearch';
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
    const searchBy = sinon.spy((_keyword, _label, item: string) => item === 'other');

    const { result } = renderHook(() => useSearch(data, { labelKey: '', searchBy }));

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
    });

    expect(searchBy).to.have.been.calledWith('wanted', 'wanted', 'wanted');
    expect(result.current.filteredData).to.deep.equal(['other']);
  });

  it('Should call opts.callback when keyword is updated', () => {
    const callback = sinon.spy();

    const { result } = renderHook(() => useSearch(data, { labelKey: '', callback }));

    act(() => {
      result.current.handleSearch('wanted', void 0 as any);
    });

    expect(callback).to.have.been.calledWith('wanted', ['wanted'], void 0);
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
});
