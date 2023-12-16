import { renderHook } from '@test/utils';
import useUniqueId from '../useUniqueId';

describe('[utils] useUniqueId', () => {
  it('Should generate an Id', () => {
    const { result } = renderHook(() => useUniqueId(''));

    expect(result.current).to.be.not.equal('');
  });

  it('Should generate an Id with prefix', () => {
    const { result } = renderHook(() => useUniqueId('rs-'));

    expect(result.current).to.be.contain('rs-');
  });

  it('Should use the provided Id non-generated', () => {
    const { result } = renderHook(() => useUniqueId('rs-', 'my-id'));

    expect(result.current).to.be.equal('my-id');
  });
});
