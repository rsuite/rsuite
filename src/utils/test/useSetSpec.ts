import { act } from '@testing-library/react';
import { renderHook } from '@test/testUtils';

import { useSet } from '../useSet';

describe('[utils] useSet', () => {
  it('Should function like ES6 Set', () => {
    const { result } = renderHook(() => useSet());
    expect(result.current.has(1)).to.be.false;

    act(() => {
      result.current.add(1);
    });
    expect(result.current.has(1)).to.be.true;

    act(() => {
      result.current.delete(1);
    });
    expect(result.current.has(1)).to.be.false;
  });
});
