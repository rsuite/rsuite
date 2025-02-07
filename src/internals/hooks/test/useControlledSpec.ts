import { act, renderHook } from '@testing-library/react';

import useControlled from '../useControlled';

describe('internals/hooks/useControlled', () => {
  it('Should return `controlled value`', () => {
    const { result } = renderHook(() => useControlled('controlled value', undefined));
    const [value, , isControlled] = result.current;

    expect(value).to.equal('controlled value');
    expect(isControlled).to.equal(true);
  });

  it('Should return `defaultValue`', () => {
    const { result } = renderHook(() => useControlled(undefined, 'default value'));
    const [value, , isControlled] = result.current;

    expect(value).to.equal('default value');
    expect(isControlled).to.equal(false);
  });

  it('Should works with `setValue`', () => {
    const { result } = renderHook(() => useControlled(undefined as string | undefined, 'value'));
    const [, setValue] = result.current;
    act(() => {
      setValue('changedValue');
    });

    /**
     * const [value] = result.current
     * The value cannot be obtained by the above deconstruction method, otherwise the latest value cannot be obtained
     */
    expect(result.current[0]).to.equal('changedValue');
  });

  it('Should works when controlled value change `undefined` to `actualValue`', () => {
    // FIXME Use `renderHook` props
    // eslint-disable-next-line prefer-const
    let controlledValue: string | undefined;
    const { result, rerender } = renderHook(() => useControlled(controlledValue, undefined));
    controlledValue = 'actualValue';
    rerender();

    expect(result.current[0]).to.equal(controlledValue);
    expect(result.current[2]).to.equal(true);
  });
});
