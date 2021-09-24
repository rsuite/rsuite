import { renderHook, act } from '@testing-library/react-hooks/dom';
import useControlled from '../useControlled';

describe('[utils] useControlled', () => {
  it('Should return `controlled value`', () => {
    const { result } = renderHook(() => useControlled('controlled value'));
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
    const { result } = renderHook(() => useControlled(undefined, 'value'));
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
    let controlledValue;
    const { result, rerender } = renderHook(() => useControlled(controlledValue));
    controlledValue = 'actualValue';
    rerender();

    assert.equal(result.current[0], controlledValue);
    assert.ok(result.current[2]);
  });
});
