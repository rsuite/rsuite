import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import InputAutosize from '../InputAutosize';
import InputSearch from '../InputSearch';

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
    const instance = getDOMNode(<InputSearch as={InputAutosize} />, false);
    assert.ok(instance.querySelector('.rs-picker-search-input'));
    assert.ok(instance.querySelector('.rs-picker-search-input input'));
    assert.equal(instance.querySelector('.rs-picker-search-input input').style.width, '1px');
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputSearch onChange={doneOp} />);
    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputSearch classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
