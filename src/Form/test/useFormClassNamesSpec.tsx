import { renderHook } from '@testing-library/react';
import useFormClassNames from '../hooks/useFormClassNames';

describe('useFormClassNames', () => {
  it('Should return .rs-form.rs-form-vertical.rs-form-fixed-width by default', () => {
    const classes = ['rs-form', 'rs-form-vertical', 'rs-form-fixed-width'];

    const { result } = renderHook(() => useFormClassNames({}));

    for (const className of classes) {
      expect(result.current).to.contain(className);
    }
  });

  it('Should return .rs-form-horizontal when layout="horizontal"', () => {
    const { result } = renderHook(() => useFormClassNames({ layout: 'horizontal' }));

    expect(result.current).to.contain('rs-form-horizontal');
  });

  it('Should return .rs-form-inline when layout="inline"', () => {
    const { result } = renderHook(() => useFormClassNames({ layout: 'inline' }));

    expect(result.current).to.contain('rs-form-inline');
  });

  it('Should return .rs-form-fluid when fluid=true', () => {
    const { result } = renderHook(() => useFormClassNames({ fluid: true }));

    expect(result.current).to.contain('rs-form-fluid');
  });

  it('Should return .rs-form-readonly when readOnly=true', () => {
    const { result } = renderHook(() => useFormClassNames({ readOnly: true }));

    expect(result.current).to.contain('rs-form-readonly');
  });

  it('Should return .rs-form-disabled when disabled=true', () => {
    const { result } = renderHook(() => useFormClassNames({ disabled: true }));

    expect(result.current).to.contain('rs-form-disabled');
  });

  it('Should return .rs-form-plaintext when plaintext=true', () => {
    const { result } = renderHook(() => useFormClassNames({ plaintext: true }));

    expect(result.current).to.contain('rs-form-plaintext');
  });
});
