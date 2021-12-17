import React from 'react';
import { renderHook } from '@testing-library/react-hooks/dom';
import useUniqueId from '../useUniqueId';

describe('[utils] useUniqueId', () => {
  it('should be defined', () => {
    expect(useUniqueId).to.be.exist;
  });

  it('should return a empty string at first than a unique id when mounted', () => {
    const callbackSpy = sinon.spy();

    const useEffect = React.useEffect;
    React.useEffect = callbackSpy;

    const hook1 = renderHook(() => useUniqueId());
    expect(hook1.result.current).to.be.empty;
    assert.equal(callbackSpy.callCount, 1);

    React.useEffect = useEffect;

    const hook2 = renderHook(() => useUniqueId());
    expect(hook2.result.current).to.not.be.empty;
  });

  it('should return different unique ids', () => {
    const hook1 = renderHook(() => useUniqueId());
    const hook2 = renderHook(() => useUniqueId());
    expect(hook1.result.current).to.not.be.equal(hook2.result.current);
  });
});
