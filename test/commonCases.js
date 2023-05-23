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
  customClassName = 'custom-class',
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

export function testStandardProps(element, options) {
  describe('Standard props', () => {
    testTestIdProp(element, options?.renderOptions);
    if (options?.customClassName !== false) {
      testClassNameProp(
        element,
        options?.customClassName,
        options?.renderOptions,
        options?.getRootElement
      );
    }
    testClassPrefixProp(element, options?.renderOptions, options?.getRootElement);
    testStyleProp(element, options?.renderOptions, options?.getRootElement);
  });
}
