import React from 'react';
import { render, screen } from '@testing-library/react';
import Tree from '../index';
import { itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('Tree styles', () => {
  itChrome('Should render the correct styles', () => {
    render(<Tree virtualized={false} data={data} />);

    const itemLabel = screen
      .getByRole('tree')
      .querySelector('.rs-tree .rs-tree-node-label') as HTMLElement;

    expect(itemLabel).to.have.style('padding', '1px 1px 1px 16px');
  });
});
