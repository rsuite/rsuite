import React from 'react';
import Tree from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import '../styles/index.scss';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('Tree styles', () => {
  it('Should render the correct styles', () => {
    render(<Tree virtualized={false} data={data} />);

    const itemLabel = screen.getByRole('tree').querySelector('.rs-tree-node-label');

    expect(itemLabel).to.have.style('padding', '4px');
  });
});
