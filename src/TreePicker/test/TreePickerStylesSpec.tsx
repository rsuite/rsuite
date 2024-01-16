import React from 'react';
import { render } from '@testing-library/react';
import TreePicker from '../index';
import { getStyle, inChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import '../styles/index.less';
import { PickerHandle } from 'src/Picker';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('TreePicker styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<PickerHandle>();

    render(<TreePicker data={data} ref={instanceRef} open />);

    const pickerMenuDom = document.querySelector('.rs-picker-tree-menu') as HTMLElement;
    const treeWrapperDom = pickerMenuDom.querySelector('.rs-tree') as HTMLElement;
    const treeNodeDom = pickerMenuDom.querySelector('.rs-tree-node') as HTMLElement;
    inChrome &&
      assert.equal(
        getStyle(treeWrapperDom, 'padding'),
        '0px 12px 12px 0px',
        'Picker tree wrapper padding'
      );
    assert.equal(getStyle(treeNodeDom, 'fontSize'), '0px', 'Picker tree node font-size');
    assert.equal(getStyle(treeNodeDom, 'height'), '36px', 'Picker tree node height');
  });
});
