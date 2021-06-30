import React from 'react';
import ReactDOM from 'react-dom';
import tinycolor from 'tinycolor2';
import AutoComplete from '../index';
import { createTestContainer, getStyle, toRGB, getDefaultPalette, inChrome } from '@test/testUtils';

import '../styles/index.less';

const { H100 } = getDefaultPalette();

describe('AutoComplete styles', () => {
  it('Input should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<AutoComplete ref={instanceRef} />, createTestContainer());
    const dom = instanceRef.current.root.querySelector('input');
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'AutoComplete background-color');
    // @description Can't get border-radius value in other browser except chrome
    inChrome &&
      assert.equal(getStyle(dom, 'border'), `1px solid ${toRGB('#e5e5ea')}`, 'AutoComplete border');
    assert.equal(getStyle(dom, 'color'), toRGB('#575757'), 'AutoComplete font-color');
    inChrome && assert.equal(getStyle(dom, 'borderRadius'), '6px', 'AutoComplete border-radius');
  });

  it('Should the correct styles when set `open` and `defaultValue`', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <AutoComplete ref={instanceRef} data={['a', 'b', 'ab']} open defaultValue="a" />,
      createTestContainer()
    );
    const dom = instanceRef.current.root.querySelector('input');
    const focusItemDom = document.querySelector('.rs-auto-complete-item-focus');
    const unFocusItemDom = document.querySelector(
      '.rs-auto-complete-item:not(.rs-auto-complete-item-focus)'
    );
    assert.equal(
      getStyle(focusItemDom, 'backgroundColor'),
      tinycolor(H100).setAlpha(0.5).toRgbString(),
      'AutoComplete focus item background-color'
    );
    assert.equal(getStyle(dom, 'color'), toRGB('#575757'), 'AutoComplete  focus item font-color');
    assert.equal(
      getStyle(unFocusItemDom, 'backgroundColor'),
      toRGB('#0000'),
      'AutoComplete unFocus item background-color'
    );
  });

  it('Disabled should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<AutoComplete ref={instanceRef} disabled />, createTestContainer());
    const dom = instanceRef.current.root.querySelector('input');
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#f7f7fa'),
      'Disabled autoComplete background-color'
    );
    assert.equal(getStyle(dom, 'color'), toRGB('#c5c6c7'), 'Disabled autoComplete color');
  });
});
