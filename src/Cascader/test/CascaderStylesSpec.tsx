import React from 'react';
import { render } from '@testing-library/react';
import Cascader from '../index';
import { getStyle, inChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.less';

const data = mockTreeData([['abcde', 'vv-abc', 'vv-abcd']]);

describe('Cascader styles', () => {
  it('Should render the correct caret', () => {
    render(<Cascader data={data} menuClassName="rs-cascader-styles-test" open />);

    const menuItemDom = document.body.querySelector(
      '.rs-cascader-styles-test .rs-picker-cascader-menu-item'
    ) as HTMLElement;
    const caretDom = menuItemDom.querySelector('.rs-picker-cascader-menu-caret') as HTMLElement;
    inChrome && assert.equal(getStyle(menuItemDom, 'padding'), '8px 28px 8px 12px');
    assert.equal(caretDom.getAttribute('aria-label'), 'angle right');
  });
});
