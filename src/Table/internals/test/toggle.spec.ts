import { describe, expect, it, vi } from 'vitest';
import toggle from '../utils/toggle';

describe('toggle', () => {
  it('Should call function a when condition is true', () => {
    const a = vi.fn();
    const b = vi.fn();
    const target = document.createElement('div');

    toggle(a, b)(target)(true);

    expect(a).toHaveBeenCalledOnce();
    expect(a).toHaveBeenCalledWith(target);
    expect(b).not.toHaveBeenCalled();
  });

  it('Should call function b when condition is false', () => {
    const a = vi.fn();
    const b = vi.fn();
    const target = document.createElement('div');

    toggle(a, b)(target)(false);

    expect(b).toHaveBeenCalledOnce();
    expect(b).toHaveBeenCalledWith(target);
    expect(a).not.toHaveBeenCalled();
  });

  it('Should pass additional values to called function', () => {
    const a = vi.fn();
    const b = vi.fn();
    const target = document.createElement('div');

    toggle(a, b)(target, 'extra1', 'extra2')(true);

    expect(a).toHaveBeenCalledWith(target, 'extra1', 'extra2');
  });

  it('Should pass additional values to b when condition is false', () => {
    const a = vi.fn();
    const b = vi.fn();
    const target = document.createElement('div');

    toggle(a, b)(target, 42)(false);

    expect(b).toHaveBeenCalledWith(target, 42);
  });

  it('Should return a function from the inner call', () => {
    const a = vi.fn();
    const b = vi.fn();
    const target = document.createElement('div');

    const inner = toggle(a, b)(target);
    expect(typeof inner).to.equal('function');
  });
});
