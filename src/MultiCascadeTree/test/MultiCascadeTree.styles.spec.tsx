import React from 'react';
import MultiCascadeTree from '../MultiCascadeTree';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import '../styles/index.scss';

const data = mockTreeData([['1', ['2', '2-1']]]);

describe('MultiCascadeTree styles', () => {
  it('Should render the correct caret', () => {
    render(<MultiCascadeTree data={data} />);

    const tree = screen.getByRole('tree');

    expect(tree.querySelector('.rs-checkbox-checker label')).to.have.style('padding', '8px 12px');
    expect(tree.querySelector('[aria-label="arrow right line"]')).to.exist;
  });
});
