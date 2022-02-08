import React from 'react';
import { render } from '@testing-library/react';

export function testTestIdProp(element) {
  it('Should accept data-testid prop', () => {
    const { getByTestId } = render(React.cloneElement(element, { 'data-testid': 'element' }));

    expect(getByTestId('element')).to.exist;
  });
}

export function testClassNameProp(element, customClassName = 'custom-class') {
  it('Should accept custom className', () => {
    const { getByTestId } = render(
      React.cloneElement(element, { 'data-testid': 'element', className: customClassName })
    );

    expect(getByTestId('element')).to.have.class(customClassName);
  });
}

export function testClassPrefixProp(element) {
  it('Should accept custom className prefix', () => {
    const customClassPrefix = 'custom-prefix';
    const { getByTestId } = render(
      React.cloneElement(element, { 'data-testid': 'element', classPrefix: customClassPrefix })
    );
    expect(getByTestId('element')).to.have.class(new RegExp('^rs-' + customClassPrefix));
  });
}

export function testStyleProp(element) {
  it('Should accept custom style', () => {
    const fontSize = '12px';
    const { getByTestId } = render(
      React.cloneElement(element, { 'data-testid': 'element', style: { fontSize } })
    );

    expect(getByTestId('element')).to.have.style('font-size', fontSize);
  });
}

export function testStandardProps(element, options) {
  describe('Standard props', () => {
    testTestIdProp(element);
    if (options?.customClassName !== false) {
      testClassNameProp(element, options?.customClassName);
    }
    testClassPrefixProp(element);
    testStyleProp(element);
  });
}
