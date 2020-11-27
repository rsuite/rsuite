import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import MultiCascader from '../index';
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

describe('MultiCascader styles', () => {
  it('Should render the correct caret', () => {
    const instanceRef = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(
        <MultiCascader
          ref={instanceRef}
          data={data}
          menuClassName="rs-multi-cascader-styles-test"
        />,
        createTestContainer()
      );
    });

    ReactTestUtils.act(() => {
      const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
      toggleDom.click();
    });

    const menuItemDom = document.body.querySelector(
      '.rs-multi-cascader-styles-test .rs-picker-cascader-menu-has-children'
    );

    if (menuItemDom) {
      if (inChrome) {
        assert.equal(
          getStyle(menuItemDom.querySelector('.rs-checkbox-checker label'), 'padding'),
          '8px 26px 8px 38px'
        );
      }
      assert.equal(
        window.getComputedStyle(
          menuItemDom.querySelector('.rs-picker-cascader-menu-caret'),
          '::before'
        ).content,
        `"${String.fromCharCode(0xea0c)}"`
      );
    }
  });
});
