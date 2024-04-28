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

    const treeNode = screen.queryAllByRole('treeitem')[0];

    expect(treeNode).to.have.style('font-size', '0px');
    expect(treeNode).to.have.style('height', '36px');
  });
});
