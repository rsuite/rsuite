import { describe, expect, it } from 'vitest';
import toggleClass from '../utils/toggleClass';

describe('toggleClass', () => {
  it('Should add class when condition is true', () => {
    const el = document.createElement('div');
    toggleClass(el, 'active', true);
    expect(el.classList.contains('active')).to.equal(true);
  });

  it('Should remove class when condition is false', () => {
    const el = document.createElement('div');
    el.classList.add('active');
    toggleClass(el, 'active', false);
    expect(el.classList.contains('active')).to.equal(false);
  });

  it('Should handle an array of elements', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const els = [el1, el2] as unknown as HTMLElement;
    toggleClass(els, 'active', true);
    expect(el1.classList.contains('active')).to.equal(true);
    expect(el2.classList.contains('active')).to.equal(true);
  });

  it('Should remove class from array of elements when condition is false', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    el1.classList.add('selected');
    el2.classList.add('selected');
    const els = [el1, el2] as unknown as HTMLElement;
    toggleClass(els, 'selected', false);
    expect(el1.classList.contains('selected')).to.equal(false);
    expect(el2.classList.contains('selected')).to.equal(false);
  });

  it('Should return early when node is null/undefined', () => {
    // Should not throw
    expect(() => toggleClass(null as any, 'active', true)).not.toThrow();
  });

  it('Should handle NodeList-like objects with a length property', () => {
    const container = document.createElement('div');
    const child1 = document.createElement('span');
    const child2 = document.createElement('span');
    container.appendChild(child1);
    container.appendChild(child2);

    const nodeList = container.querySelectorAll('span') as unknown as HTMLElement;
    toggleClass(nodeList, 'highlight', true);

    expect(child1.classList.contains('highlight')).to.equal(true);
    expect(child2.classList.contains('highlight')).to.equal(true);
  });
});
