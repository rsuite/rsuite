import React from 'react';
import { render, screen } from '@testing-library/react';
import Cascader from '../index';
import { itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.less';

const data = mockTreeData([['node1', 'node-1-1', 'node-1-2']]);

describe('Cascader styles', () => {
  itChrome('Should render the correct caret', () => {
    render(<Cascader data={data} open />);

    const treeitem = screen.getByRole('treeitem').children[0];
    const caret = treeitem.querySelector('.rs-cascade-tree-caret') as HTMLElement;

    expect(treeitem).to.have.style('padding', '8px 28px 8px 12px');
    expect(caret).to.have.attribute('aria-label', 'angle right');
  });
});
