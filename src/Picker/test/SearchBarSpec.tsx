import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import SearchBar from '../SearchBar';
import { getDOMNode } from '@test/testUtils';
import Sinon from 'sinon';

const searchInputClassName = '.rs-picker-search-bar-input';

describe('SearchBar', () => {
  it('Should output a input', () => {
    const instance = getDOMNode(<SearchBar />);
    assert.equal((instance.querySelector(searchInputClassName) as HTMLElement).tagName, 'INPUT');
    assert.ok(instance.className.match(/\bpicker-search-bar\b/));
  });

  it('Should call `onChange` callback', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(<SearchBar onChange={onChange} />);
    ReactTestUtils.Simulate.change(instance.querySelector(searchInputClassName) as HTMLElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<SearchBar className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<SearchBar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<SearchBar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
