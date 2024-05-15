import React from 'react';
import { render, screen } from '@testing-library/react';
import Tree from '../index';
import { itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import '../styles/index.less';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('Tree styles', () => {
  itChrome('Should render the correct styles', () => {
    render(<Tree virtualized={false} data={data} />);

    const itemLabel = screen.getByRole('tree').querySelector('.rs-tree-node-label');

    expect(itemLabel).to.have.style('padding', '6px');
  });
});
