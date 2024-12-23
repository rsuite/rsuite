import { renderHook } from '@testing-library/react';
import useUniqueId from '../useUniqueId';

describe('internals/hooks/useUniqueId', () => {
  it('Should generate an Id', () => {
    const { result } = renderHook(() => useUniqueId(''));

    expect(result.current).to.be.not.equal('');
  });

  it('Should generate an Id with prefix', () => {
    const { result } = renderHook(() => useUniqueId('rs-'));

    expect(result.current).to.be.contain('rs-');
  });

  it('Should use the provided Id non-generated', async () => {
    const { result } = await renderHook(() => useUniqueId('rs-', 'my-id'));

    expect(result.current).to.be.equal('my-id');
  });
});
