import { renderHook } from '@testing-library/react-hooks/dom';
import useUniqueId from '../useUniqueId';

describe('[utils] useUniqueId(prefix, idProp?)', () => {
  it('Should return a string with given prefix', () => {
    const { result } = renderHook(() => useUniqueId('menuitem-'));

    expect(result.current).to.match(/^menuitem-/);
  });

  it('Should return distinct strings from different calls', () => {
    const { result: result1 } = renderHook(() => useUniqueId('menuitem-'));
    const { result: result2 } = renderHook(() => useUniqueId('menuitem-'));

    expect(result1.current).not.to.equal(result2.current);
  });

  it('Should return `idProp` if present', () => {
    const idProp = 'custom-menuitem-id';

    const { result } = renderHook(() => useUniqueId('menuitem-', idProp));

    expect(result.current).to.equal(idProp);
  });

  // Server-side rendering
  it('Should be consistent between server and client');
});
