import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useClassNames from '../hooks/useClassNames';
import TableProvider from '../TableProvider';

// Helper to render the hook inside the TableProvider context
function renderWithProvider(fn: () => ReturnType<typeof useClassNames>) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TableProvider classPrefix="custom">{children}</TableProvider>
  );
  return renderHook(fn, { wrapper });
}

describe('useClassNames', () => {
  it('Should return withClassPrefix that prepends component name', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.withClassPrefix()).to.equal('rs-button');
  });

  it('Should return withClassPrefix with additional classes', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.withClassPrefix('active', 'disabled')).to.equal(
      'rs-button rs-button-active rs-button-disabled'
    );
  });

  it('Should return prefix that adds component name prefix to classes', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.prefix('icon')).to.equal('rs-button-icon');
  });

  it('Should return prefix with multiple classes', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.prefix('icon', 'small')).to.equal('rs-button-icon rs-button-small');
  });

  it('Should handle conditional object in prefix', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.prefix({ active: true, disabled: false })).to.equal('rs-button-active');
  });

  it('Should return merge that combines class names', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.merge('foo', 'bar')).to.equal('foo bar');
  });

  it('Should return rootPrefix that uses root context prefix', () => {
    const { result } = renderWithProvider(() => useClassNames('button'));
    expect(result.current.rootPrefix('btn')).to.equal('custom-btn');
  });

  it('Should return rootPrefix with multiple classes', () => {
    const { result } = renderWithProvider(() => useClassNames('button'));
    expect(result.current.rootPrefix('btn', 'large')).to.equal('custom-btn custom-large');
  });

  it('Should return rootPrefix as empty string with no args', () => {
    const { result } = renderHook(() => useClassNames('button'));
    expect(result.current.rootPrefix()).to.equal('');
  });

  it('Should use contextClassPrefix when controlled=false (default)', () => {
    const { result } = renderHook(() => useClassNames('table'));
    // default classPrefix=rs, so rs-table
    expect(result.current.withClassPrefix()).to.equal('rs-table');
  });

  it('Should use str directly when controlled=true', () => {
    const { result } = renderHook(() => useClassNames('my-component', true));
    expect(result.current.withClassPrefix()).to.equal('my-component');
  });
});
