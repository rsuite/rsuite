import React from 'react';
import { render, screen } from '@testing-library/react';
import TreePicker from '../index';
import { itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import '../styles/index.less';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('TreePicker styles', () => {
  itChrome('Should render the correct styles', () => {
    render(<TreePicker data={data} open />);

    const tree = screen.getByRole('tree');
    const treeNode = screen.queryAllByRole('treeitem')[0];

    expect(tree).to.have.style('padding', '0px 12px 0px 0px');
    expect(treeNode).to.have.style('font-size', '0px');
    expect(treeNode).to.have.style('height', '34px');
  });
});
