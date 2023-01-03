import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import InputAutosize from '../InputAutosize';
import InputSearch from '../InputSearch';
import Sinon from 'sinon';

describe('InputPicker - InputSearch', () => {
  it('Should render a div with `rs-picker-search` class', () => {
    const instance = getDOMNode(<InputSearch />);
    assert.equal(instance.nodeName, 'DIV');
    assert.equal(instance.className, 'rs-picker-search');
  });

  it('Should render a input', () => {
    const instance = getDOMNode(<InputSearch />);
    assert.ok(instance.querySelector('.rs-picker-search-input'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputSearch className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<InputSearch style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a InputAutosize', () => {
    const instance = getDOMNode(<InputSearch as={InputAutosize} />);

    expect(instance.querySelector('.rs-picker-search-input')).to.exist;
    expect(instance.querySelector('.rs-picker-search-input input')).to.exist;
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(<InputSearch onChange={onChange} />);
    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLInputElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputSearch classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
