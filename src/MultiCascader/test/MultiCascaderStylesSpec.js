import React from 'react';
import ReactDOM from 'react-dom';
import MultiCascader from '../index';
import { createTestContainer, getStyle, inChrome } from '@test/testUtils';

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
    ReactDOM.render(
      <MultiCascader
        ref={instanceRef}
        data={data}
        menuClassName="rs-multi-cascader-styles-test"
        open
      />,
      createTestContainer()
    );

    const menuItemDom = instanceRef.current.overlay;
    inChrome &&
      assert.equal(
        getStyle(menuItemDom.querySelector('.rs-checkbox-checker label'), 'padding'),
        '8px 26px 8px 38px'
      );
    assert.isNotNull(menuItemDom.querySelector('[aria-label="angle right"]'));
  });
});
