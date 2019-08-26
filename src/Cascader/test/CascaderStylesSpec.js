import React from 'react';
import ReactDOM from 'react-dom';
import Cascader from '../index';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index';

const data = [
  {
    value: 'abcde',
    label: 'abcde',
    children: [
      {
        value: 'vv-abc',
        label: 'vv-abc'
      },
      {
        value: 'vv-abcd',
        label: 'vv-abcd'
      }
    ]
  }
];

describe('Cascader styles', () => {
  it('Should render the correct caret', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Cascader ref={instanceRef} data={data} menuClassName="rs-cascader-styles-test" />,
      createTestContainer()
    );
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    toggleDom.click();

    const menuItemDom = document.body.querySelector(
      '.rs-cascader-styles-test .rs-picker-cascader-menu-item'
    );
    const caretDom = menuItemDom.querySelector('.rs-picker-cascader-menu-caret');
    inChrome && assert.equal(getStyle(menuItemDom, 'padding'), '8px 28px 8px 12px');
    assert.equal(
      window.getComputedStyle(caretDom, '::before').content,
      `"${String.fromCharCode(0xea0c)}"`
    );
  });
});
