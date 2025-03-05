import { createStyleValueSetter, createStyleGetter } from '../styleProps';

describe('styleProps utils', () => {
  describe('createStyleValueSetter', () => {
    it('Should return undefined when value or component is not provided', () => {
      const setter = createStyleValueSetter({
        prop: 'color',
        presetChecker: () => true
      });

      expect(setter(undefined, 'button')).to.be.undefined;
      expect(setter('primary', undefined)).to.be.undefined;
    });

    it('Should return global variable when useGlobalVar is true', () => {
      const setter = createStyleValueSetter({
        prop: 'color',
        useGlobalVar: true,
        presetChecker: () => true
      });

      expect(setter('primary', 'button')).to.equal('var(--rs-color-primary)');
    });

    it('Should return component-scoped variable when useGlobalVar is false', () => {
      const setter = createStyleValueSetter({
        prop: 'color',
        presetChecker: () => true
      });

      expect(setter('primary', 'button')).to.equal('var(--rs-button-color-primary)');
    });

    it('Should use valueTransformer when preset check fails', () => {
      const setter = createStyleValueSetter({
        prop: 'size',
        presetChecker: () => false,
        valueTransformer: (value: number) => `${value}px`
      });

      expect(setter(16, 'button')).to.equal('16px');
    });

    it('Should return raw value when preset check fails and no transformer provided', () => {
      const setter = createStyleValueSetter({
        prop: 'custom',
        presetChecker: () => false
      });

      expect(setter('value', 'button')).to.equal('value');
    });

    it('Should use custom prop name when provided', () => {
      const setter = createStyleValueSetter({
        prop: 'color',
        presetChecker: () => true
      });

      expect(setter('primary', 'button', 'background')).to.equal(
        'var(--rs-button-background-primary)'
      );
    });
  });

  describe('createStyleGetter', () => {
    it('Should return undefined when value or component is not provided', () => {
      const getter = createStyleGetter({
        prop: 'color',
        presetChecker: () => true
      });

      expect(getter(undefined, 'button')).to.be.undefined;
      expect(getter('primary', undefined)).to.be.undefined;
    });

    it('Should return style object with component variable', () => {
      const getter = createStyleGetter({
        prop: 'color',
        presetChecker: () => true
      });

      expect(getter('primary', 'button')).to.deep.equal({
        '--rs-button-color': 'var(--rs-button-color-primary)'
      });
    });

    it('Should use custom prop name when provided', () => {
      const getter = createStyleGetter({
        prop: 'color',
        presetChecker: () => true
      });

      expect(getter('primary', 'button', 'background')).to.deep.equal({
        '--rs-button-background': 'var(--rs-button-background-primary)'
      });
    });
  });
});
