import React from 'react';
import { render } from '@testing-library/react';
import { SizeEnum, Colours, Size, Color } from '@/internals/types';

interface TestStylePropsOptions {
  renderOptions?: any;
  sizes?: Size[];
  colors?: Color[];
  spacing?: Size[];
  getRootElement?: (view: any) => HTMLElement;
  props?: Partial<any>;
}

const getComponentName = (Component: React.ComponentType<any>) => {
  return Component.displayName?.toLowerCase() || 'component';
};

/**
 * Test if a component properly handles size prop
 */
export function testSizeStyle(
  Component: React.ComponentType<any>,
  options: TestStylePropsOptions = {}
) {
  const {
    sizes = Object.values(SizeEnum) as Size[],
    getRootElement = view => view.container.firstChild,
    props = {}
  } = options;

  const component = getComponentName(Component);

  describe('Size styles', () => {
    sizes.forEach(size => {
      it(`Should render ${size} size`, () => {
        const view = render(<Component {...props} size={size} />, options.renderOptions);
        const rootElement = getRootElement(view);

        expect(rootElement).to.have.attr(
          'style',
          `--rs-${component}-size: var(--rs-${component}-size-${size});`
        );
      });
    });

    it('Should render custom size', () => {
      const customSize = '100px';
      const view = render(<Component {...props} size={customSize} />, options.renderOptions);
      const rootElement = getRootElement(view);

      expect(rootElement).to.have.attr('style', `--rs-${component}-size: ${customSize};`);
    });
  });
}

/**
 * Test if a component properly handles color prop
 */
export function testColorStyle(
  Component: React.ComponentType<any>,
  options: TestStylePropsOptions = {}
) {
  const {
    colors = Object.values(Colours) as Color[],
    getRootElement = view => view.container.firstChild,
    props = {}
  } = options;

  const component = getComponentName(Component);

  describe('Color styles', () => {
    colors.forEach(color => {
      it(`Should render ${color} color`, () => {
        const view = render(<Component {...props} color={color} />, options.renderOptions);
        const rootElement = getRootElement(view);

        expect(rootElement).to.have.attr(
          'style',
          `--rs-${component}-color: var(--rs-color-${color});`
        );
      });
    });

    it('Should render custom color', () => {
      const customColor = '#FF0000';
      const view = render(<Component {...props} color={customColor} />, options.renderOptions);
      const rootElement = getRootElement(view);

      expect(rootElement).to.have.attr('style', `--rs-${component}-color: ${customColor};`);
    });
  });
}

/**
 * Test if a component properly handles spacing prop
 */
export function testSpacingStyle(
  Component: React.ComponentType<any>,
  options: TestStylePropsOptions = {}
) {
  const {
    spacing = Object.values(SizeEnum) as Size[],
    getRootElement = view => view.container.firstChild,
    props = {}
  } = options;

  const component = getComponentName(Component);

  describe('Spacing styles', () => {
    spacing.forEach(space => {
      it(`Should render ${space} spacing`, () => {
        const view = render(<Component {...props} spacing={space} />, options.renderOptions);
        const rootElement = getRootElement(view);

        expect(rootElement).to.have.attr(
          'style',
          `--rs-${component}-spacing: var(--rs-${component}-spacing-${space});`
        );
      });
    });

    it('Should render custom spacing', () => {
      const customSpacing = '20px';
      const view = render(<Component {...props} spacing={customSpacing} />, options.renderOptions);
      const rootElement = getRootElement(view);

      expect(rootElement).to.have.attr('style', `--rs-${component}-spacing: ${customSpacing};`);
    });
  });
}

/**
 * Test all style props for a component
 */
export function testStyleProps(
  Component: React.ComponentType<any>,
  options: TestStylePropsOptions = {}
) {
  describe('Style props', () => {
    testSizeStyle(Component, options);
    testColorStyle(Component, options);
    testSpacingStyle(Component, options);
  });
}
