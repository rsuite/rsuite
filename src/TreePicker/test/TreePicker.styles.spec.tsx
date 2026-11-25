import React from 'react';
import TreePicker from '../index';
import { getHeight } from 'dom-lib';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/cases';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.scss';

const data = mockTreeData(['Node1', 'Node2']);

describe('TreePicker styles', () => {
  testPickerSize(TreePicker, { data: [] });

  it('Should render the correct styles', () => {
    render(<TreePicker data={data} open />);

    const treeNode = screen.queryAllByRole('treeitem')[0];

    // Get the computed height and check it's approximately 30px (allow small rounding differences)
    const computedHeight = getHeight(treeNode);
    expect(computedHeight).to.be.closeTo(30, 0.5);
  });
});
