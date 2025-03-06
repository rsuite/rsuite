import { placementPolyfill, kebabPlace } from '../placement';

describe('placementPolyfill', () => {
  it('Should convert Left/Right to Start/End in LTR mode', () => {
    expect(placementPolyfill('bottomLeft')).to.equal('bottomStart');
    expect(placementPolyfill('bottomRight')).to.equal('bottomEnd');
    expect(placementPolyfill('topLeft')).to.equal('topStart');
    expect(placementPolyfill('topRight')).to.equal('topEnd');
  });

  it('Should handle RTL mode correctly', () => {
    expect(placementPolyfill('bottomLeft', true)).to.equal('bottomStart');
    expect(placementPolyfill('bottomRight', true)).to.equal('bottomEnd');
    expect(placementPolyfill('topLeft', true)).to.equal('topStart');
    expect(placementPolyfill('topRight', true)).to.equal('topEnd');
    expect(placementPolyfill('leftStart', true)).to.equal('rightStart');
    expect(placementPolyfill('rightEnd', true)).to.equal('leftEnd');
  });

  it('Should handle cardinal directions in RTL mode', () => {
    expect(placementPolyfill('left', true)).to.equal('right');
    expect(placementPolyfill('right', true)).to.equal('left');
  });

  it('Should return original value for non-string input', () => {
    const obj = { placement: 'left' };
    expect(placementPolyfill(obj)).to.equal(obj);
    expect(placementPolyfill(null)).to.equal(null);
    expect(placementPolyfill(undefined)).to.equal(undefined);
  });
});

describe('kebabPlace', () => {
  it('Should convert camelCase to kebab-case in LTR mode', () => {
    expect(kebabPlace('bottomStart')).to.equal('bottom-start');
    expect(kebabPlace('topEnd')).to.equal('top-end');
    expect(kebabPlace('leftStart')).to.equal('left-start');
    expect(kebabPlace('rightEnd')).to.equal('right-end');
  });

  it('Should convert Left/Right to Start/End in kebab-case', () => {
    expect(kebabPlace('bottomLeft')).to.equal('bottom-start');
    expect(kebabPlace('topRight')).to.equal('top-end');
    expect(kebabPlace('leftTop')).to.equal('left-start');
    expect(kebabPlace('rightBottom')).to.equal('right-end');
  });

  it('Should handle RTL mode correctly', () => {
    expect(kebabPlace('bottomLeft', true)).to.equal('bottom-start');
    expect(kebabPlace('topRight', true)).to.equal('top-end');
    expect(kebabPlace('leftTop', true)).to.equal('right-start');
    expect(kebabPlace('rightBottom', true)).to.equal('left-end');
  });

  it('Should return original value for non-string input', () => {
    const obj = { placement: 'bottomLeft' };
    expect(kebabPlace(obj)).to.equal(obj);
    expect(kebabPlace(null)).to.equal(null);
    expect(kebabPlace(undefined)).to.equal(undefined);
  });
});
