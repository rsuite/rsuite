import { act } from '@testing-library/react';
import { renderHook } from '@test/testUtils';

import useControlled from '../useControlled';

describe('[utils] useControlled', () => {
  it('Should return `controlled value`', () => {
    const { result } = renderHook(() => useControlled('controlled value', undefined));
    const [value, , isControlled] = result.current;
    assert.equal(value, 'controlled value');
    assert.ok(isControlled);
  });

  it('Should return `defaultValue`', () => {
    const { result } = renderHook(() => useControlled(undefined, 'default value'));
    const [value, , isControlled] = result.current;
    assert.equal(value, 'default value');
    assert.ok(!isControlled);
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
    assert.equal(result.current[0], 'changedValue');
  });

  it('Should works when controlled value change `undefined` to `actualValue`', () => {
    // FIXME Use `renderHook` props
    // eslint-disable-next-line prefer-const
    let controlledValue: string | undefined;
    const { result, rerender } = renderHook(() => useControlled(controlledValue, undefined));
    controlledValue = 'actualValue';
    rerender();

    assert.equal(result.current[0], controlledValue);
    assert.ok(result.current[2]);
  });
});
