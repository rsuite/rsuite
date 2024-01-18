import React from 'react';
import { render } from '@testing-library/react';
import MultiCascader from '../index';
import { getStyle, inChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.less';
import { PickerHandle } from '../../internals/Picker';

const data = mockTreeData([['abcde', ['vv-abc', 'vv-abcd']]]);

describe('MultiCascader styles', () => {
  it('Should render the correct caret', () => {
    const instanceRef = React.createRef<PickerHandle>();
    render(
      <MultiCascader
        ref={instanceRef}
        data={data}
        menuClassName="rs-multi-cascader-styles-test"
        open
      />
    );

    const menuItemDom = (instanceRef.current as PickerHandle).overlay as HTMLElement;
    inChrome &&
      assert.equal(
        getStyle(menuItemDom.querySelector('.rs-checkbox-checker label') as HTMLElement, 'padding'),
        '8px 26px 8px 38px'
      );
    assert.isNotNull(menuItemDom.querySelector('[aria-label="angle right"]'));
  });
});
