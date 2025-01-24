import React from 'react';
import { render } from '@testing-library/react';

export function testTestIdProp(element, renderOptions) {
  it('Should accept data-testid prop', () => {
    const { getByTestId } = render(
      React.cloneElement(element, { 'data-testid': 'element' }),
      renderOptions
    );

    expect(getByTestId('element')).to.exist;
  });
}

export function testClassNameProp(
  element,
  customClassName,
  renderOptions,
  getRootElement = view => view.container.firstChild
) {
  it('Should accept custom className', () => {
    const view = render(
      React.cloneElement(element, { 'data-testid': 'element', className: customClassName }),
      renderOptions
    );

    expect(getRootElement(view)).to.have.class(customClassName);
  });
}

export function testClassPrefixProp(
  element,
  renderOptions,
  getRootElement = view => view.container.firstChild
) {
  it('Should accept custom className prefix', () => {
    const customClassPrefix = 'custom-prefix';
    const view = render(
      React.cloneElement(element, { 'data-testid': 'element', classPrefix: customClassPrefix }),
      renderOptions
    );
    expect(getRootElement(view)).to.have.class(new RegExp('^rs-' + customClassPrefix));
  });
}

export function testStyleProp(
  element,
  renderOptions,
  getRootElement = view => view.container.firstChild
) {
  it('Should accept custom style', () => {
    const fontSize = '12px';
    const view = render(
      React.cloneElement(element, { 'data-testid': 'element', style: { fontSize } }),
      renderOptions
    );

    expect(getRootElement(view)).to.have.style('font-size', fontSize);
  });
}

export function testSizeProp(
  element,
  sizes: string[] = [],
  renderOptions,
  getUIElement = view => view.container.firstChild
) {
  sizes.forEach(size => {
    it(`Should have a ${size} size`, () => {
      const view = render(
        React.cloneElement(element, { 'data-testid': 'element', size }),
        renderOptions
      );

      expect(getUIElement(view)).to.have.class(new RegExp('^rs-[a-z-]+-' + size));
    });
  });
}

export function testColorProp(
  element,
  colors: string[] = [],
  renderOptions,
  getUIElement = view => view.container.firstChild
) {
  colors.forEach(color => {
    it(`Should be ${color} color`, () => {
      const view = render(
        React.cloneElement(element, { 'data-testid': 'element', color }),
        renderOptions
      );

      expect(getUIElement(view)).to.have.class(new RegExp('^rs-[a-z-]+-' + color));
    });
  });
}

interface TestStandardPropsOptions {
  renderOptions?: any;
  customClassName?: string | boolean;
  sizes?: string[];
  colors?: string[];
  getRootElement?: (view: any) => HTMLElement;
  getUIElement?: (view: any) => HTMLElement;
}

export function testStandardProps(element, options: TestStandardPropsOptions = {}) {
  const { displayName } = element.type;
  const { renderOptions, customClassName, sizes, colors, getRootElement, getUIElement } = options;

  describe(`${displayName} - Standard props`, () => {
    it('Should have a display name', () => {
      expect(displayName).to.exist;
    });

    testTestIdProp(element, renderOptions);
    if (customClassName !== false) {
      testClassNameProp(
        element,
        typeof customClassName === 'string' ? customClassName : 'custom-class',
        renderOptions,
        getRootElement
      );
    }
    testClassPrefixProp(element, renderOptions, getRootElement);
    testStyleProp(element, renderOptions, getRootElement);

    if (sizes) {
      testSizeProp(element, sizes, renderOptions, getUIElement);
    }

    if (colors) {
      testColorProp(element, colors, renderOptions, getUIElement);
    }
  });
}
